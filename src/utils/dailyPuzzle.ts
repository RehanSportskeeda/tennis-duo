export interface DailyPuzzleData {
  date: string;
  size: number;
  preFilledCells: Array<{
    row: number;
    col: number;
    value: 'goal' | 'stick';
  }>;
  constraints: Array<{
    type: 'equal' | 'different';
    cell1: [number, number];
    cell2: [number, number];
  }>;
  solution: ('goal' | 'stick')[][];
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQXrwTxkBTG8ymHlqL4BH2ivHdMt6GqQA4RIOa0osYW6zK93AUnPRKT9GKKKOvCybIXfwhsPR2pY7nz/pub?gid=580450764&single=true&output=csv';

export const fetchDailyPuzzle = async (): Promise<DailyPuzzleData | null> => {
  try {
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    
    // Parse CSV
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    
    // Find today's puzzle
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Parse CSV line (handling quoted JSON)
      const values = parseCSVLine(line);
      
      const csvDate = values[0].trim();
      
      if (csvDate === today) {
        try {
          let preFilledCells, constraints, solution;
          
          try {
            // Fix single quotes to double quotes for valid JSON
            const preFilledCellsJson = values[2].replace(/'/g, '"');
            preFilledCells = JSON.parse(preFilledCellsJson);
          } catch (error) {
          }
          
          try {
            // Fix single quotes to double quotes for valid JSON
            const constraintsJson = values[3].replace(/'/g, '"');
            constraints = JSON.parse(constraintsJson);
          } catch (error) {
            throw new Error(`Invalid constraints JSON: ${error.message}`);
          }
          
          try {
            // Fix single quotes to double quotes for valid JSON
            const solutionJson = values[4].replace(/'/g, '"');
            solution = JSON.parse(solutionJson);
          } catch (error) {
            throw new Error(`Invalid solution JSON: ${error.message}`);
          }
          // Validate that pre-filled cells match the solution
          let hasValidationErrors = false;
          preFilledCells.forEach(cell => {
            const solutionValue = solution[cell.row][cell.col];
            if (cell.value !== solutionValue) {
              hasValidationErrors = true;
            }
          });
          if (hasValidationErrors) {
            return null;
          }
          
          // Validate size is a valid positive integer
          const size = parseInt(values[1]);
          if (isNaN(size) || size <= 0 || size > 20) {
            return null;
          }
          
          return {
          date: values[0],
          size,
          preFilledCells,
          constraints,
          solution,
          difficulty: values[5] || 'Easy'
        };
        } catch (parseError) {
          return null;
        }
      }
    }
    
    return null; // No puzzle found for today
  } catch (error) {
    return null;
  }
};

export const fetchAllAvailablePuzzles = async (): Promise<{ date: string; difficulty: string }[]> => {
  try {
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    
    // Parse CSV
    const lines = csvText.split('\n');
    const puzzles: { date: string; difficulty: string }[] = [];
    
    // Skip header row and process all puzzle rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      try {
        const values = parseCSVLine(line);
        const date = values[0].trim();
        const difficulty = values[5] || 'Easy';
        
        if (date) {
          puzzles.push({ date, difficulty });
        }
      } catch (error) {
        continue;
      }
    }
    
    // Sort by date (newest first)
    puzzles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Filter to only show previous days (not today or future dates)
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const filteredPuzzles = puzzles.filter(puzzle => puzzle.date < today);
    
    return filteredPuzzles;
  } catch (error) {
    return [];
  }
};

export const fetchPuzzleByDate = async (targetDate: string): Promise<DailyPuzzleData | null> => {
  try {
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    
    // Parse CSV
    const lines = csvText.split('\n');
    
    // Find puzzle for the target date
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = parseCSVLine(line);
      const csvDate = values[0].trim();
      
      if (csvDate === targetDate) {
        try {
          // Parse the puzzle data (same logic as fetchDailyPuzzle)
          const preFilledCellsJson = values[2].replace(/'/g, '"');
          const preFilledCells = JSON.parse(preFilledCellsJson);
          
          const constraintsJson = values[3].replace(/'/g, '"');
          const constraints = JSON.parse(constraintsJson);
          
          const solutionJson = values[4].replace(/'/g, '"');
          const solution = JSON.parse(solutionJson);
          
          // Validate that pre-filled cells match the solution
          let hasValidationErrors = false;
          preFilledCells.forEach(cell => {
            const solutionValue = solution[cell.row][cell.col];
            if (cell.value !== solutionValue) {
              hasValidationErrors = true;
            }
          });
          
          if (hasValidationErrors) {
            return null;
          }
          
          // Validate size is a valid positive integer
          const size = parseInt(values[1]);
          if (isNaN(size) || size <= 0 || size > 20) {
            return null;
          }
          return {
            date: values[0],
            size,
            preFilledCells,
            constraints,
            solution,
            difficulty: values[5] || 'Easy'
          };
        } catch (parseError) {
          return null;
        }
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
};
// Helper function to parse CSV line with quoted JSON
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add last field
  result.push(current);
  
  return result;
};