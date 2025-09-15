import React, { useState, useEffect, useCallback } from 'react';
import { Cell, CellValue, Constraint, GameState, GameStats } from '../types/game';
import { validateGrid, isGameCompleteAndValid, getNextValue, getHint, HINT_PENALTY_SECONDS } from '../utils/gameLogic';
import { DailyPuzzleData } from '../utils/dailyPuzzle';

interface GameStateSnapshot {
  grid: Cell[][];
  moves: number;
}

export const useGameState = (dailyPuzzleData: DailyPuzzleData | null) => {
  const [gameState, setGameState] = useState<GameState>({
    grid: [],
    constraints: [],
    size: 6,
    isComplete: false,
    violations: new Set(),
    violationMessages: []
  });

  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    hintsUsed: 0,
    startTime: Date.now(),
    endTime: undefined,
    baseTime: undefined,
    penaltyTime: undefined,
    totalTime: undefined,
    scoreSubmitted: false
  });

  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [solution, setSolution] = useState<CellValue[][]>([]);
  const [history, setHistory] = useState<GameStateSnapshot[]>([]);

  const initializeGame = useCallback(() => {
    if (!dailyPuzzleData) return;

    const grid: Cell[][] = Array(dailyPuzzleData.size).fill(null).map((_, row) =>
      Array(dailyPuzzleData.size).fill(null).map((_, col) => ({
        value: null,
        isFixed: false,
        row,
        col
      }))
    );

    // Set pre-filled cells
    dailyPuzzleData.preFilledCells.forEach(({ row, col, value }) => {
      grid[row][col].value = value;
      grid[row][col].isFixed = true;
    });

    const { violations, messages } = validateGrid(grid, dailyPuzzleData.constraints);

    setGameState({
      grid,
      constraints: dailyPuzzleData.constraints,
      size: dailyPuzzleData.size,
      isComplete: false,
      violations,
      violationMessages: messages
    });

    setSolution(dailyPuzzleData.solution);
    setHistory([]);

    setGameStats({
      moves: 0,
      hintsUsed: 0,
      startTime: Date.now(),
      endTime: undefined,
      baseTime: undefined,
      penaltyTime: undefined,
      totalTime: undefined,
      scoreSubmitted: false
    });
  }, [dailyPuzzleData]);

  const makeMove = useCallback((row: number, col: number) => {
    if (gameState.grid[row]?.[col]?.isFixed || gameState.isComplete) return;

    // Save current state to history before making the move
    setHistory(prev => [...prev, {
      grid: gameState.grid.map(row => row.map(cell => ({ ...cell }))),
      moves: gameStats.moves
    }]);
    
    setGameState(prev => {
      const newGrid = prev.grid.map((gridRow, r) =>
        gridRow.map((cell, c) => {
          if (r === row && c === col) {
            return { ...cell, value: getNextValue(cell.value) };
          }
          return cell;
        })
      );

      const { violations, messages } = validateGrid(newGrid, prev.constraints);
      const complete = isGameCompleteAndValid(newGrid, prev.constraints);

      return {
        ...prev,
        grid: newGrid,
        violations,
        violationMessages: messages,
        isComplete: complete
      };
    });

    setGameStats(prev => ({ ...prev, moves: prev.moves + 1 }));
  }, [gameState.grid, gameState.constraints, gameState.isComplete, gameStats.moves]);

  const useHint = useCallback(() => {
    if (gameState.isComplete) return;

    const hint = getHint(gameState.grid, solution);
    if (!hint) return;

    const [hintRow, hintCol] = hint;
    const hintValue = solution[hintRow][hintCol];

    // Save current state to history before applying hint
    setHistory(prev => [...prev, {
      grid: gameState.grid.map(row => row.map(cell => ({ ...cell }))),
      moves: gameStats.moves
    }]);
    
    setGameState(prev => {
      const newGrid = prev.grid.map((row, r) =>
        row.map((cell, c) => {
          if (r === hintRow && c === hintCol) {
            return { ...cell, value: hintValue };
          }
          return cell;
        })
      );

      const { violations, messages } = validateGrid(newGrid, prev.constraints);
      const complete = isGameCompleteAndValid(newGrid, prev.constraints);

      return {
        ...prev,
        grid: newGrid,
        violations,
        violationMessages: messages,
        isComplete: complete
      };
    });

    setGameStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
  }, [gameState.grid, gameState.isComplete, solution, gameStats.moves]);

  const undoMove = useCallback(() => {
    if (history.length === 0) return;

    const lastState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));

    const { violations, messages } = validateGrid(lastState.grid, gameState.constraints);
    const complete = isGameCompleteAndValid(lastState.grid, gameState.constraints);

    setGameState(prev => ({
      ...prev,
      grid: lastState.grid,
      violations,
      violationMessages: messages,
      isComplete: complete
    }));

    setGameStats(prev => ({ ...prev, moves: lastState.moves }));
  }, [history, gameState.constraints]);

  // Update game completion stats when game becomes complete
  useEffect(() => {
    if (gameState.isComplete && gameStats.endTime === undefined) {
      // Trigger win animation first
      setShowWinAnimation(true);
      
      const endTime = Date.now();
      const baseTime = endTime - gameStats.startTime;
      const penaltyTime = gameStats.hintsUsed * HINT_PENALTY_SECONDS * 1000;
      const totalTime = baseTime + penaltyTime;
      
      setGameStats(prev => ({
        ...prev,
        endTime,
        baseTime,
        penaltyTime,
        totalTime
      }));
      
      // Reset animation after it completes (800ms duration)
      setTimeout(() => {
        setShowWinAnimation(false);
      }, 1200);
    }
  }, [gameState.isComplete, gameStats.startTime, gameStats.hintsUsed, gameStats.endTime]);

  const resetGame = useCallback(() => {
    setShowWinAnimation(false);
    initializeGame();
  }, [initializeGame]);

  // Initialize game when puzzle data is available
  useEffect(() => {
    if (dailyPuzzleData) {
      setShowWinAnimation(false);
      initializeGame();
      setHistory([]);
    }
  }, [dailyPuzzleData, initializeGame]);

  const canUndo = history.length > 0;

  return {
    gameState,
    gameStats,
    violations: gameState.violations,
    violationMessages: gameState.violationMessages,
    isComplete: gameState.isComplete,
    showWinAnimation,
    canUndo,
    makeMove,
    undoMove,
    useHint,
    resetGame,
    initializeGame
  };
}