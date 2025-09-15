import React from 'react';
import { Cell, CellValue, Constraint, GameState, Puzzle } from '../types/game';
import { DailyPuzzleData } from './dailyPuzzle';

export const HINT_PENALTY_SECONDS = 15;

export const createEmptyGrid = (size: number): Cell[][] => {
  return Array(size).fill(null).map((_, row) =>
    Array(size).fill(null).map((_, col) => ({
      value: null,
      isFixed: false,
      row,
      col
    }))
  );
};

export const validateGrid = (grid: Cell[][], constraints: Constraint[]): { violations: Set<string>; messages: React.ReactNode[] } => {
  const violations = new Set<string>();
  const messages: React.ReactNode[] = [];
  const size = grid.length;
  

  // Check no more than 2 consecutive same symbols
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size - 2; col++) {
      const cell1 = grid[row][col];
      const cell2 = grid[row][col + 1];
      const cell3 = grid[row][col + 2];
      
      if (cell1.value && cell2.value && cell3.value &&
          cell1.value === cell2.value && cell2.value === cell3.value) {
        const symbol = cell1.value === 'goal' ? 
          `3 consecutive 🥅 in row ${row + 1}` :
          `3 consecutive 🏒 in row ${row + 1}`;
        messages.push(symbol);
        violations.add(`${row},${col}`);
        violations.add(`${row},${col + 1}`);
        violations.add(`${row},${col + 2}`);
      }
    }
  }

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size - 2; row++) {
      const cell1 = grid[row][col];
      const cell2 = grid[row + 1][col];
      const cell3 = grid[row + 2][col];
      
      if (cell1.value && cell2.value && cell3.value &&
          cell1.value === cell2.value && cell2.value === cell3.value) {
        const symbol = cell1.value === 'goal' ? 
          `3 consecutive 🥅 in column ${col + 1}` :
          `3 consecutive 🏒 in column ${col + 1}`;
        messages.push(symbol);
        violations.add(`${row},${col}`);
        violations.add(`${row + 1},${col}`);
        violations.add(`${row + 2},${col}`);
      }
    }
  }

  // Check equal number of suns and moons in each row and column
  for (let row = 0; row < size; row++) {
    const rowCells = grid[row].filter(cell => cell.value !== null);
    const goals = rowCells.filter(cell => cell.value === 'goal').length;
    const sticks = rowCells.filter(cell => cell.value === 'stick').length;
    
    if (rowCells.length === size && goals !== sticks) {
      const goalCount = goals;
      const stickCount = sticks;
      if (goalCount > stickCount) {
        messages.push(`${goalCount} 🥅 in row ${row + 1} (should be ${size/2})`);
      } else {
        messages.push(`${stickCount} 🏒 in row ${row + 1} (should be ${size/2})`);
      }
      for (let col = 0; col < size; col++) {
        violations.add(`${row},${col}`);
      }
    }
  }

  for (let col = 0; col < size; col++) {
    const colCells = grid.map(row => row[col]).filter(cell => cell.value !== null);
    const goals = colCells.filter(cell => cell.value === 'goal').length;
    const sticks = colCells.filter(cell => cell.value === 'stick').length;
    
    if (colCells.length === size && goals !== sticks) {
      const goalCount = goals;
      const stickCount = sticks;
      if (goalCount > stickCount) {
        messages.push(`${goalCount} 🥅 in column ${col + 1} (should be ${size/2})`);
      } else {
        messages.push(`${stickCount} 🏒 in column ${col + 1} (should be ${size/2})`);
      }
      for (let row = 0; row < size; row++) {
        violations.add(`${row},${col}`);
      }
    }
  }

  // Check constraint violations
  constraints.forEach(constraint => {
    const [r1, c1] = constraint.cell1;
    const [r2, c2] = constraint.cell2;
    const cell1 = grid[r1][c1];
    const cell2 = grid[r2][c2];
    
    if (cell1.value && cell2.value) {
      if (constraint.type === 'equal' && cell1.value !== cell2.value) {
        messages.push(`Cells with = should be the same`);
        violations.add(`${r1},${c1}`);
        violations.add(`${r2},${c2}`);
      } else if (constraint.type === 'different' && cell1.value === cell2.value) {
        messages.push(`Cells with × should be different`);
        violations.add(`${r1},${c1}`);
        violations.add(`${r2},${c2}`);
      }
    }
  });

  return { violations, messages };
};

export const isGameComplete = (grid: Cell[][]): boolean => {
  const size = grid.length;
  
  // Check if all cells are filled
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!grid[row][col].value) return false;
    }
  }
  
  return true;
};

export const isGameCompleteAndValid = (grid: Cell[][], constraints: Constraint[]): boolean => {
  const size = grid.length;
  
  // Check if all cells are filled
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!grid[row][col].value) return false;
    }
  }
  
  // Check if there are any violations
  const { violations } = validateGrid(grid, constraints);
  
  // Game is complete only if grid is full AND has no violations
  return violations.size === 0;
};

export const getProgress = (grid: Cell[][]): number => {
  const size = grid.length;
  const totalCells = size * size;
  const filledCells = grid.flat().filter(cell => cell.value !== null).length;
  
  return (filledCells / totalCells) * 100;
};

export const getNextValue = (current: CellValue): CellValue => {
  if (current === null) return 'goal';
  if (current === 'goal') return 'stick';
  return null;
};

export const generatePuzzle = (size: number): Puzzle => {
  const grid = createEmptyGrid(size);
  const constraints: Constraint[] = [];
  const solution: CellValue[][] = [];
  
  // Generate a simple valid solution first
  for (let row = 0; row < size; row++) {
    solution[row] = [];
    for (let col = 0; col < size; col++) {
      // Alternate pattern with some randomization
      const isEven = (row + col) % 2 === 0;
      solution[row][col] = Math.random() > 0.5
        ? (isEven ? 'goal' : 'stick')
        : (isEven ? 'stick' : 'goal');
    }
  }
  
  // Add some pre-filled cells (about 30% of the grid)
  const cellsToFill = Math.floor(size * size * 0.3);
  const positions = [];
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      positions.push([row, col]);
    }
  }
  
  // Shuffle and select random positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  for (let i = 0; i < cellsToFill; i++) {
    const [row, col] = positions[i];
    grid[row][col].value = solution[row][col];
    grid[row][col].isFixed = true;
  }
  
  // Add some random constraints
  const numConstraints = Math.floor(size * size * 0.1);
  for (let i = 0; i < numConstraints; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    
    const directions = [];
    if (col < size - 1) directions.push([row, col + 1]);
    if (row < size - 1) directions.push([row + 1, col]);
    
    if (directions.length > 0) {
      const target = directions[Math.floor(Math.random() * directions.length)];
      const type = Math.random() > 0.5 ? 'equal' : 'different';
      
      constraints.push({
        type,
        cell1: [row, col],
        cell2: target as [number, number]
      });
    }
  }
  
  return { grid, constraints, solution };
};

export const getHint = (grid: Cell[][], solution: CellValue[][]): [number, number] | null => {
  const size = grid.length;
  const emptyCells = [];
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!grid[row][col].value && !grid[row][col].isFixed) {
        emptyCells.push([row, col]);
      }
    }
  }
  
  if (emptyCells.length === 0) return null;
  
  // Return a random empty cell
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex] as [number, number];
};

export const createGameFromDailyPuzzle = (dailyPuzzle: DailyPuzzleData): Puzzle => {
  const grid = createEmptyGrid(dailyPuzzle.size);
  
  // Set pre-filled cells
  dailyPuzzle.preFilledCells.forEach(({ row, col, value }) => {
    grid[row][col].value = value;
    grid[row][col].isFixed = true;
  });
  
  return {
    grid,
    constraints: dailyPuzzle.constraints,
    solution: dailyPuzzle.solution
  };
};