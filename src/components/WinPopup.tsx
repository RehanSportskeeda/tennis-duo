import React from 'react';
import { Shield, MousePointer, Clock, Lightbulb, X, Share2 } from 'lucide-react';
import { GameStats } from '../types/game';
import { trackShare } from '../utils/analytics';
import { HINT_PENALTY_SECONDS } from '../utils/gameLogic';

interface WinPopupProps {
  gameStats: GameStats;
  onClose: () => void;
  onPlayAgain: () => void;
}

const WinPopup: React.FC<WinPopupProps> = ({ gameStats, onClose, onPlayAgain }) => {
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };
  
  const getTimeTaken = () => {
    if (!gameStats?.endTime) return '0s';
    
    // Calculate total time including penalties
    const baseTime = gameStats.baseTime || (gameStats.endTime - gameStats.startTime);
    const penaltyTime = (gameStats.hintsUsed || 0) * HINT_PENALTY_SECONDS * 1000;
    const totalTime = baseTime + penaltyTime;
    
    return formatTime(totalTime);
  };
  
  const getTimeBreakdown = () => {
    if (!gameStats?.baseTime) {
      return null;
    }
    
    const baseTimeFormatted = formatTime(gameStats.baseTime);
    
    if (gameStats.hintsUsed > 0) {
      return `${baseTimeFormatted} + ${gameStats.hintsUsed}×${HINT_PENALTY_SECONDS}s`;
    }
    
    return null;
  };

  const handleShare = async () => {
    const timeTaken = getTimeTaken();
    const shareText = `🎾 Just solved today's Tennis Duo in ${timeTaken}! 🎾

⚡ ${gameStats.moves} moves
💡 ${gameStats.hintsUsed} hints used

Can you beat my time? Play now:`;
    const gameUrl = window.location.href;
    
    console.log('Attempting to share:', { shareText, gameUrl });
    
    const gameStatsForTracking = {
      moves: gameStats.moves,
      hintsUsed: gameStats.hintsUsed,
      timeTaken: gameStats.endTime ? gameStats.endTime - gameStats.startTime : 0
    };
    
    if (navigator.share) {
      console.log('Using native share API');
      try {
        await navigator.share({
          title: 'Tennis Duo',
          text: shareText,
          url: gameUrl,
        });
        console.log('Share successful');
        trackShare(gameStatsForTracking, 'native');
      } catch (error) {
        console.log('Native share cancelled or failed:', error);
        // Fallback to clipboard
        await fallbackToClipboard(shareText, gameUrl, gameStatsForTracking);
      }
    } else {
      console.log('Native share not available, using clipboard fallback');
      await fallbackToClipboard(shareText, gameUrl, gameStatsForTracking);
    }
  };
  
  const fallbackToClipboard = async (shareText: string, gameUrl: string, gameStatsForTracking: any) => {
    try {
      const fullText = `${shareText}\n${gameUrl}`;
      await navigator.clipboard.writeText(fullText);
      alert('Game results copied to clipboard! 📋');
      console.log('Clipboard copy successful');
      trackShare(gameStatsForTracking, 'clipboard');
    } catch (error) {
      console.error('Clipboard failed:', error);
      // Final fallback: show the text in an alert
      const fullText = `${shareText}\n${gameUrl}`;
      alert(`Share this:\n\n${fullText}`);
      trackShare(gameStatsForTracking, 'fallback');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-black p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white">Congratulations!</h2>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <p className="text-gray-100 text-lg font-medium">Puzzle Solved Perfectly!</p>
          </div>
          
        </div>
        
        {/* Stats */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Your Performance</h3>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-gray-700">Moves</span>
              <span className="text-2xl font-bold text-blue-600">{gameStats.moves}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium text-gray-700">Hints Used</span>
              <span className="text-2xl font-bold text-yellow-600">{gameStats.hintsUsed}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-600" />
                <div>
                  <span className="font-medium text-gray-700">Time</span>
                  {gameStats.hintsUsed > 0 && (
                    <div className="text-xs text-gray-400 mt-1">
                      +15s per hint
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{getTimeTaken()}</div>
                {getTimeBreakdown() && (
                  <div className="text-xs text-gray-500 mt-1">
                    {getTimeBreakdown()}
                  </div>
                )}
              </div>
            </div>
          </div>

          
          <div className="mt-6 text-center">
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button
                onClick={onPlayAgain}
                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
              >
                Play&nbsp;Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinPopup;