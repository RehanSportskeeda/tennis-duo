import React from 'react';

export type CellValue = 'goal' | 'stick' | null;
export type ConstraintType = 'equal' | 'different';

export interface Cell {
  value: CellValue;
  isFixed: boolean;
  row: number;
  col: number;
}

export interface Constraint {
  type: ConstraintType;
  cell1: [number, number];
  cell2: [number, number];
}

export interface GameState {
  grid: Cell[][];
  constraints: Constraint[];
  size: number;
  isComplete: boolean;
  violations: Set<string>;
  violationMessages: React.ReactNode[];
}

export interface Puzzle {
  grid: Cell[][];
  constraints: Constraint[];
  solution: CellValue[][];
}

export interface GameStats {
  moves: number;
  hintsUsed: number;
  startTime: number;
  endTime?: number;
  baseTime?: number;
  penaltyTime?: number;
  totalTime?: number;
  scoreSubmitted?: boolean;
}