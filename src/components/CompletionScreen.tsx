import React, { useState } from 'react';
import { Shield, Clock, Share2, RotateCcw, Archive, LogIn, Trophy, X } from 'lucide-react';
import { GameStats } from '../types/game';
import { trackShare, trackCompletionScreenView, trackCompletionScreenAction, trackCTAClick } from '../utils/analytics';
import ArchivePopup from './ArchivePopup';
import { HINT_PENALTY_SECONDS } from '../utils/gameLogic';
import TennisBallSvgIcon from './TennisBallSvgIcon';

interface CompletionScreenProps {
  gameStats: GameStats;
  onPlayArchive: (date: string) => void;
  availablePuzzles: {date: string; difficulty: string}[];
  isLoggedIn: boolean;
  onShowLogin: () => void;
  onShowLeaderboard: () => void;
  userId?: string;
  onClose: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ gameStats, onPlayArchive, availablePuzzles, isLoggedIn, onShowLogin, onShowLeaderboard, userId, onClose }) => {
  const [showArchivePopup, setShowArchivePopup] = useState(false);

  // Lock/unlock body scroll when modal is open
  React.useEffect(() => {
    // Track completion screen view
    if (gameStats) {
      trackCompletionScreenView({
        moves: gameStats.moves,
        hintsUsed: gameStats.hintsUsed,
        totalTime: gameStats.totalTime || 0
      });
    }
    
    document.body.style.overflow = 'hidden';

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
    };
  }, [isLoggedIn]);

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
    if (!gameStats?.totalTime) return '0s';
    
    return formatTime(gameStats.totalTime);
  };
  
  const getTimeBreakdown = () => {
    if (!gameStats?.baseTime || gameStats.hintsUsed === 0) {
      return null;
    }
    
    const baseTimeFormatted = formatTime(gameStats.baseTime);
    return `${baseTimeFormatted} + ${gameStats.hintsUsed}×${HINT_PENALTY_SECONDS}s`;
  };

  const handleShare = async () => {
    trackCompletionScreenAction('share');
    const timeTaken = getTimeTaken();
    const shareText = `🏒 Just solved today's NHL Duo in ${timeTaken}! 🏒

⚡ ${gameStats.moves} moves
💡 ${gameStats.hintsUsed} hints used

Can you beat my time? Play now:`;
    const gameUrl = window.location.href;
    
    const gameStatsForTracking = {
      moves: gameStats.moves,
      hintsUsed: gameStats.hintsUsed,
      timeTaken: gameStats.endTime ? gameStats.endTime - gameStats.startTime : 0
    };
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NHL Duo',
          text: shareText,
          url: gameUrl,
        });
        trackShare(gameStatsForTracking, 'native');
      } catch (error) {
        // Fallback to clipboard
        await fallbackToClipboard(shareText, gameUrl, gameStatsForTracking);
      }
    } else {
      await fallbackToClipboard(shareText, gameUrl, gameStatsForTracking);
    }
  };
  
  const fallbackToClipboard = async (shareText: string, gameUrl: string, gameStatsForTracking: any) => {
    try {
      const fullText = `${shareText}\n${gameUrl}`;
      await navigator.clipboard.writeText(fullText);
      alert('Game results copied to clipboard! 📋');
      trackShare(gameStatsForTracking, 'clipboard');
    } catch (error) {
      // Final fallback: show the text in an alert
      const fullText = `${shareText}\n${gameUrl}`;
      alert(`Share this:\n\n${fullText}`);
      trackShare(gameStatsForTracking, 'fallback');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full mx-auto p-6 space-y-6 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-black rounded-xl p-6 text-center -mx-6 -mt-6 mb-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center gap-3 mb-2">
            <TennisBallSvgIcon className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Game Completed!</h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-100 text-lg font-medium">Puzzle Solved!</p>
          </div>
        </div>
        
        {/* Stats */}
        <div>
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
              <div>
                <span className="font-medium text-gray-700">Time</span>
                {gameStats.hintsUsed > 0 && (
                  <div className="text-xs text-gray-400 mt-1">
                    +15s per hint
                  </div>
                )}
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
        </div>
        
        <div className="mt-6 text-center">
          <div className="space-y-3">
            {/* Login/Leaderboard Button */}
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  trackCompletionScreenAction('login');
                  trackCTAClick('login', 'completion_screen', false);
                  onShowLogin();
                }}
                className="w-5/6 mx-auto px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Login to See Your Rank
              </button>
            ) : (
              <button
                onClick={() => {
                  trackCompletionScreenAction('leaderboard');
                  trackCTAClick('leaderboard', 'completion_screen', true);
                  onShowLeaderboard();
                }}
                className="w-5/6 mx-auto px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                View Leaderboard
              </button>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button
                onClick={() => {
                  trackCompletionScreenAction('archive');
                  trackCTAClick('archive', 'completion_screen', isLoggedIn);
                  setShowArchivePopup(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap flex items-center gap-2"
              >
                <Archive className="w-5 h-5" />
                Play&nbsp;Archive
              </button>
            </div>
          </div>
        </div>

        {/* Archive Popup */}
        {showArchivePopup && (
          <ArchivePopup
            onClose={() => setShowArchivePopup(false)}
            onSelectDate={(date) => {
              onPlayArchive(date);
              setShowArchivePopup(false);
            }}
            availablePuzzles={availablePuzzles}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
};

export default CompletionScreen;