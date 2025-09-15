import React from 'react';
import { Undo, Lightbulb, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onUndo: () => void;
  onHint: () => void;
  onNewGame: () => void;
  canUndo: boolean;
  isGameComplete: boolean;
  difficulty?: number;
  onDifficultyChange?: (size: number) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  onUndo,
  onHint,
  onNewGame,
  canUndo,
  isGameComplete,
  difficulty,
  onDifficultyChange
}) => {
  // Debug logging to see if canUndo prop is updating
  React.useEffect(() => {
    console.log('🎮 GAME CONTROLS - canUndo prop updated:', canUndo);
  }, [canUndo]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-center">
        <button
          onClick={onUndo}
          disabled={!canUndo || isGameComplete}
          className={`
            flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium transition-all text-sm
            ${!canUndo || isGameComplete
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
        >
          <Undo className="w-4 h-4" />
          Undo
        </button>
        
        <button
          onClick={onHint}
          disabled={isGameComplete}
          className={`
            flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium transition-all text-sm
            ${!isGameComplete
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <Lightbulb className="w-4 h-4" />
          Fill Next
        </button>
        
        <button
          onClick={onNewGame}
          className="flex items-center gap-2 px-2 py-1.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameControls;