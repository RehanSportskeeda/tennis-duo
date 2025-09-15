import React from 'react';
import { CheckCircle, AlertCircle, Trophy, MousePointer, Clock, Lightbulb } from 'lucide-react';

interface GameStatusProps {
  violations: Set<string>;
  violationMessages: React.ReactNode[];
  isComplete: boolean;
  gameStats?: GameStats;
  showWinAnimation?: boolean;
  onDismissWin?: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ 
  violations, 
  violationMessages, 
  isComplete, 
  gameStats,
  showWinAnimation = false,
  onDismissWin
}) => {
  // Don't show anything when game is complete - popup handles this now
  if (isComplete) return null;
  
  if (violations.size > 0) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
        {violationMessages.length > 0 && (
          <ul className="text-sm text-red-700 space-y-1">
            {violationMessages.map((message, index) => (
              <li key={index} className="flex items-start gap-1">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span>{message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-blue-100 border border-blue-300 rounded-lg">
      <span className="text-blue-800 font-semibold">
        Keep going! Fill the grid following the rules.
      </span>
    </div>
  );
};

export default GameStatus;