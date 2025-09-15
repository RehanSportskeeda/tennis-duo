import React from 'react';
import { Cell, CellValue, ConstraintType } from '../types/game';

interface GameGridProps {
  grid: Cell[][];
  constraints: Array<{
    type: ConstraintType;
    cell1: [number, number];
    cell2: [number, number];
  }>;
  violations: Set<string>;
  onCellClick: (row: number, col: number) => void;
  showWinAnimation?: boolean;
}

const GameGrid: React.FC<GameGridProps> = ({ 
  grid, 
  constraints, 
  violations, 
  onCellClick,
  showWinAnimation = false
}) => {
  const size = grid.length;
  
  const getCellKey = (row: number, col: number) => `${row},${col}`;
  
  const isViolated = (row: number, col: number) => {
    return violations.has(getCellKey(row, col));
  };

  const renderCellContent = (cell: Cell) => {
    if (cell.value === 'goal') {
      return <span className="text-2xl sm:text-3xl">🥅</span>;
    } else if (cell.value === 'stick') {
      return <span className="text-2xl sm:text-3xl">🏒</span>;
    }
    return null;
  };

  const getConstraintSymbol = (row: number, col: number, direction: 'right' | 'bottom') => {
    const constraint = constraints.find(c => {
      const [r1, c1] = c.cell1;
      const [r2, c2] = c.cell2;
      
      if (direction === 'right') {
        return (r1 === row && c1 === col && r2 === row && c2 === col + 1) ||
               (r1 === row && c1 === col + 1 && r2 === row && c2 === col);
      } else {
        return (r1 === row && c1 === col && r2 === row + 1 && c2 === col) ||
               (r1 === row + 1 && c1 === col && r2 === row && c2 === col);
      }
    });
    
    if (!constraint) return null;
    
    return (
      <div className={`absolute z-10 ${
        direction === 'right' 
          ? '-right-3 top-1/2 transform -translate-y-1/2' 
          : '-bottom-3 left-1/2 transform -translate-x-1/2'
      } w-6 h-6 flex items-center justify-center text-sm font-bold bg-white rounded-full border-2 border-gray-200 shadow-sm ${
        constraint.type === 'equal' ? 'text-green-600' : 'text-red-600'
      }`}>
        {constraint.type === 'equal' ? '=' : '×'}
      </div>
    );
  };

  return (
    <div className="relative">
      <div 
        className="grid gap-1 w-full max-w-lg mx-auto"
        style={{ 
          gridTemplateColumns: `repeat(${size}, 1fr)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={getCellKey(rowIndex, colIndex)} className="relative">
              <button
                onClick={() => onCellClick(rowIndex, colIndex)}
                disabled={cell.isFixed}
                className={`
                  w-full aspect-square border-2 rounded-lg flex items-center justify-center
                  min-w-0 min-h-0
                  transition-all duration-200 transform hover:scale-105
                  ${showWinAnimation ? 'animate-flip' : ''}
                  ${cell.isFixed 
                    ? 'bg-gray-200 border-gray-300 cursor-not-allowed' 
                    : 'bg-white border-gray-300 hover:border-gray-400 cursor-pointer hover:shadow-md'
                  }
                  ${isViolated(rowIndex, colIndex) 
                    ? 'border-red-500 bg-red-50' 
                    : ''
                  }
                `}
                style={{
                  animationDelay: showWinAnimation ? `${Math.floor(rowIndex / 2) * 300}ms` : '0ms'
                }}
              >
                {renderCellContent(cell)}
              </button>
              
              {/* Right constraint */}
              {colIndex < size - 1 && getConstraintSymbol(rowIndex, colIndex, 'right')}
              
              {/* Bottom constraint */}
              {rowIndex < size - 1 && getConstraintSymbol(rowIndex, colIndex, 'bottom')}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;