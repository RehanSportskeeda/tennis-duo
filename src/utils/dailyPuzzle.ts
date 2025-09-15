export interface DailyPuzzleData {
  date: string;
  size: number;
  preFilledCells: Array<{
    row: number;
    col: number;
    value: 'ball' | 'racket';
  }>;
  constraints: Array<{
    type: 'equal' | 'different';
    cell1: [number, number];
    cell2: [number, number];
  }>;
  solution: ('ball' | 'racket')[][];
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQXrwTxkBTG8ymHlqL4BH2ivHdMt6GqQA4RIOa0osYW6zK93AUnPRKT9GKKKOvCybIXfwhsPR2pY7nz/pub?gid=580450764&single=true&output=csv';

export const fetchDailyPuzzle = async (): Promise<DailyPuzzleData | null> => {
  try {
    console.log('🔍 FETCH DEBUG - Starting fetchDailyPuzzle with URL:', SHEET_URL);
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    console.log('🔍 FETCH DEBUG - Raw CSV text length:', csvText.length);
    console.log('🔍 FETCH DEBUG - First 500 chars of CSV:', csvText.substring(0, 500));
    
    // Parse CSV
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    console.log('🔍 FETCH DEBUG - CSV headers:', headers);
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    console.log('🔍 FETCH DEBUG - Today\'s date:', today);
    
    // Find today's puzzle
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Parse CSV line (handling quoted JSON)
      let values;
      try {
        values = parseCSVLine(line);
        console.log('🔍 FETCH DEBUG - Parsed values for line', i, ':', values);
      } catch (parseError) {
        console.log('🔍 FETCH DEBUG - Error parsing CSV line', i, ':', parseError);
        continue;
      }
      
      const csvDate = values[0].trim();
      console.log('🔍 FETCH DEBUG - Comparing csvDate:', csvDate, 'with today:', today);
      
      if (csvDate === today) {
        console.log('🔍 FETCH DEBUG - Found matching date! Processing puzzle data...');
        try {
          let preFilledCells, constraints, solution;
          
          try {
            // Fix single quotes to double quotes for valid JSON
            const preFilledCellsJson = values[2].replace(/'/g, '"');
            console.log('🔍 FETCH DEBUG - PreFilledCells JSON:', preFilledCellsJson);
            const parsedPreFilledCells = JSON.parse(preFilledCellsJson);
            preFilledCells = parsedPreFilledCells;
            console.log('🔍 FETCH DEBUG - Parsed preFilledCells:', preFilledCells);
          } catch (error) {
            console.log('🔍 FETCH DEBUG - Error parsing preFilledCells:', error);
            throw new Error(`Invalid preFilledCells JSON: ${error.message}`);
          }
          
          try {
            // Fix single quotes to double quotes for valid JSON
            const constraintsJson = values[3].replace(/'/g, '"');
            console.log('🔍 FETCH DEBUG - Constraints JSON:', constraintsJson);
            constraints = JSON.parse(constraintsJson);
            console.log('🔍 FETCH DEBUG - Parsed constraints:', constraints);
          } catch (error) {
            console.log('🔍 FETCH DEBUG - Error parsing constraints:', error);
            throw new Error(`Invalid constraints JSON: ${error.message}`);
          }
          
          try {
            // Fix single quotes to double quotes for valid JSON
            const solutionJson = values[4].replace(/'/g, '"');
            console.log('🔍 FETCH DEBUG - Solution JSON:', solutionJson);
            solution = JSON.parse(solutionJson);
            console.log('🔍 FETCH DEBUG - Parsed solution (first row):', solution[0]);
          } catch (error) {
            console.log('🔍 FETCH DEBUG - Error parsing solution:', error);
            throw new Error(`Invalid solution JSON: ${error.message}`);
          }
          
          // Validate that pre-filled cells match the solution
          let hasValidationErrors = false;
          preFilledCells.forEach(cell => {
            const solutionValue = solution[cell.row][cell.col];
            console.log('🔍 FETCH DEBUG - Validating cell:', cell, 'against solution value:', solutionValue);
            if (cell.value !== solutionValue) {
              console.log('🔍 FETCH DEBUG - Validation error: cell value', cell.value, 'does not match solution', solutionValue);
              hasValidationErrors = true;
            }
          });
          console.log('🔍 FETCH DEBUG - hasValidationErrors:', hasValidationErrors);
          if (hasValidationErrors) {
            console.log('🔍 FETCH DEBUG - Returning null due to validation errors');
            return null;
          }
          
          // Validate size is a valid positive integer
          const size = parseInt(values[1]);
          console.log('🔍 FETCH DEBUG - Parsed size:', size);
          if (isNaN(size) || size <= 0 || size > 20) {
            console.log('🔍 FETCH DEBUG - Invalid size, returning null');
            return null;
          }
          
          const puzzleData = {
          date: values[0],
          size,
          preFilledCells,
          constraints,
          solution,
          difficulty: values[5] || 'Easy'
        };
          console.log('🔍 FETCH DEBUG - Final puzzle data:', puzzleData);
          return puzzleData;
        } catch (parseError) {
          console.error('❌ PREFILL DEBUG - Parse error for today:', parseError);
          return null;
        }
      }
    }
    
    console.log('❌ PREFILL DEBUG - No puzzle found for today:', today);
    return null; // No puzzle found for today
  } catch (error) {
    console.error('❌ PREFILL DEBUG - Fetch error:', error);
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
    console.log('🔍 FETCH DEBUG - Starting fetchPuzzleByDate for date:', targetDate);
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    console.log('🔍 FETCH DEBUG - Raw CSV text length for archive:', csvText.length);
    
    // Parse CSV
    const lines = csvText.split('\n');
    
    // Find puzzle for the target date
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      let values;
      try {
        values = parseCSVLine(line);
      } catch (parseError) {
        console.log('🔍 FETCH DEBUG - Error parsing CSV line in fetchPuzzleByDate:', parseError);
        continue;
      }
      
      const csvDate = values[0].trim();
      console.log('🔍 FETCH DEBUG - Archive: Comparing csvDate:', csvDate, 'with targetDate:', targetDate);
      
      if (csvDate === targetDate) {
        console.log('🔍 FETCH DEBUG - Found matching archive date! Processing puzzle data...');
        try {
          // Parse the puzzle data (same logic as fetchDailyPuzzle)
          const preFilledCellsJson = values[2].replace(/'/g, '"');
          console.log('🔍 FETCH DEBUG - Archive preFilledCells JSON:', preFilledCellsJson);
          const preFilledCells = JSON.parse(preFilledCellsJson);
          console.log('🔍 FETCH DEBUG - Archive parsed preFilledCells:', preFilledCells);
          
          const solutionJson = values[4].replace(/'/g, '"');
          console.log('🔍 FETCH DEBUG - Archive solution JSON:', solutionJson);
          const solution = JSON.parse(solutionJson);
          console.log('🔍 FETCH DEBUG - Archive parsed solution (first row):', solution[0]);
          
          // Validate that pre-filled cells match the solution
          let hasValidationErrors = false;
          preFilledCells.forEach(cell => {
            const solutionValue = solution[cell.row][cell.col];
            console.log('🔍 FETCH DEBUG - Archive validating cell:', cell, 'against solution value:', solutionValue);
            if (cell.value !== solutionValue) {
              console.log('🔍 FETCH DEBUG - Archive validation error: cell value', cell.value, 'does not match solution', solutionValue);
              hasValidationErrors = true;
            }
          });
          
          console.log('🔍 FETCH DEBUG - Archive hasValidationErrors:', hasValidationErrors);
          if (hasValidationErrors) {
            console.log('🔍 FETCH DEBUG - Archive returning null due to validation errors');
            return null;
          }
          
          // Validate size is a valid positive integer
          const size = parseInt(values[1]);
          console.log('🔍 FETCH DEBUG - Archive parsed size:', size);
          if (isNaN(size) || size <= 0 || size > 20) {
            console.log('🔍 FETCH DEBUG - Archive invalid size, returning null');
            return null;
          }
          
          const constraintsJson = values[3].replace(/'/g, '"');
          console.log('🔍 FETCH DEBUG - Archive constraints JSON:', constraintsJson);
          const constraints = JSON.parse(constraintsJson);
          console.log('🔍 FETCH DEBUG - Archive parsed constraints:', constraints);
          
          const archivePuzzleData = {
            date: values[0],
            size,
            preFilledCells,
            constraints,
            solution,
            difficulty: values[5] || 'Easy'
          };
          console.log('🔍 FETCH DEBUG - Archive final puzzle data:', archivePuzzleData);
          
          return archivePuzzleData;
        } catch (parseError) {
          console.log('🔍 FETCH DEBUG - Archive parse error:', parseError);
          return null;
        }
      }
    }
    
    console.log('🔍 FETCH DEBUG - No archive puzzle found for date:', targetDate);
    return null;
  } catch (error) {
    console.log('🔍 FETCH DEBUG - Archive fetch error:', error);
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