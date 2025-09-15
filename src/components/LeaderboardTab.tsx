import React, { useEffect } from 'react';
import { Trophy, Clock, Target, Lightbulb, LogIn } from 'lucide-react';
import { LeaderboardEntry } from './LeaderboardModal';
import { trackLeaderboardView, trackLeaderboardRankView, trackCTAClick } from '../utils/analytics';

interface LeaderboardTabProps {
  currentLeaderboard: LeaderboardEntry[];
  currentPuzzleDate?: string;
  loading?: boolean;
  error: string | null;
  userId?: string;
  isLoggedIn?: boolean;
  onShowLogin?: () => void;
  onFetchLeaderboard?: (date: string) => void;
  onGetUserRank?: (userId: string, puzzleDate: string) => Promise<{ rank: number; userEntry: LeaderboardEntry } | null>;
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({
  currentLeaderboard,
  currentPuzzleDate,
  loading = false,
  error,
  userId,
  isLoggedIn = false,
  onShowLogin,
  onFetchLeaderboard,
  onGetUserRank
}) => {
  const [userRankInfo, setUserRankInfo] = React.useState<{ rank: number; userEntry: LeaderboardEntry } | null>(null);
  const [userRankLoading, setUserRankLoading] = React.useState(false);

  // Fetch leaderboard when tab is active
  React.useEffect(() => {
    if (currentPuzzleDate && onFetchLeaderboard) {
      trackLeaderboardView(currentPuzzleDate, isLoggedIn);
      onFetchLeaderboard(currentPuzzleDate);
    }
  }, [currentPuzzleDate, onFetchLeaderboard]);

  // Fetch user rank when we have user data
  React.useEffect(() => {
    const fetchUserRank = async () => {
      if (userId && currentPuzzleDate && onGetUserRank) {
        setUserRankLoading(true);
        try {
          const rankInfo = await onGetUserRank(userId, currentPuzzleDate);
          setUserRankInfo(rankInfo);
          if (rankInfo) {
            trackLeaderboardRankView(rankInfo.rank, currentLeaderboard.length);
          }
          setUserRankInfo(null);
        } finally {
          setUserRankLoading(false);
        }
      }
    };
    
    fetchUserRank();
  }, [userId, currentPuzzleDate, onGetUserRank]);

  const formatTime = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const getTimeBreakdown = (entry: LeaderboardEntry): string | null => {
    if (entry.hintsUsed === 0) return null;
    
    const baseTime = entry.totalTime - (entry.hintsUsed * 15 * 1000);
    const baseTimeFormatted = formatTime(baseTime);
    return `${baseTimeFormatted} + ${entry.hintsUsed}×15s`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
    }
  };

  // Check if user is in top 20
  const userInTop20 = userId && currentLeaderboard.some(entry => entry.userId === userId);
  const showUserRank = userRankInfo && !userInTop20 && userRankInfo.rank > 20;

  // Show login prompt for guest users
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {currentPuzzleDate ? 
                    `${new Date(currentPuzzleDate).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                     month: 'short'
                    })} Leaderboard` :
                    `${new Date().toLocaleDateString('en-US', { 
                      day: 'numeric', 
                     month: 'short'
                    })} Leaderboard`
                  }
                </h2>
              </div>
            </div>
          </div>

          {/* Login Prompt */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Sign in to view the leaderboard
              </h3>
              <p className="text-gray-600 mb-6">
                Create an account to see how you rank against other players and track your progress over time.
              </p>
              <button
                onClick={onShowLogin}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mx-auto"
                onClick={() => {
                  trackCTAClick('login', 'leaderboard_guest_prompt', false);
                  onShowLogin();
                }}
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full px-2 md:px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {currentPuzzleDate ? 
                  `${new Date(currentPuzzleDate).toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'short'
                  })} Leaderboard` :
                  `${new Date().toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'short'
                  })} Leaderboard`
                }
              </h2>
            </div>
            
            <p className="text-gray-600 text-sm">
              Rankings may change as more players join
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-3 md:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-gray-600">Loading leaderboard...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : currentLeaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No scores yet today!</p>
              <p className="text-gray-500">Be the first to complete today's puzzle.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Top 20 Header */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Top 20 Players</h3>
              </div>
              
              {/* Leaderboard entries */}
              {currentLeaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-3 md:p-4 rounded-lg border overflow-hidden ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300 shadow-lg'
                      : ''
                  } ${
                    userId === entry.userId
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
                    {getRankIcon(index + 1)}
                    <div>
                      <div className={`flex items-center gap-1 md:gap-2 flex-wrap ${index === 0 ? 'items-center' : ''}`}>
                        <span className={`font-semibold ${
                          index === 0 
                            ? 'text-yellow-800 text-base md:text-lg font-bold' 
                            : 'text-gray-800 text-sm md:text-base'
                        } truncate max-w-[120px] md:max-w-none`}>
                          {entry.displayName || 'Anonymous'}
                        </span>
                        {index === 0 && (
                          <span className="text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-bold">
                            WINNER
                          </span>
                        )}
                        {userId === entry.userId && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-medium">
                            You
                          </span>
                        )}
                      </div>
                      
                      {/* Stats */}
                      <div className="hidden md:flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          <span>{entry.moves} moves</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          <span>{entry.hintsUsed} hints</span>
                        </div>
                      </div>
                      
                      {/* Mobile compact stats */}
                      <div className="md:hidden text-xs text-gray-600 mt-1">
                        {entry.moves} moves • {entry.hintsUsed} hints
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <div className={`flex items-center gap-2 ${
                      index === 0 
                        ? 'text-yellow-700 text-lg md:text-xl font-bold' 
                        : 'text-green-600 text-base md:text-lg font-bold'
                    }`}>
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      {formatTime(entry.totalTime)}
                    </div>
                    {getTimeBreakdown(entry) && (
                      <div className="text-xs text-gray-500 mt-1">
                        {getTimeBreakdown(entry)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* User's rank if not in top 20 */}
              {showUserRank && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-700">Your Rank</h3>
                  </div>
                  
                  {userRankLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                      <span className="ml-2 text-gray-600">Loading your rank...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 md:p-4 rounded-lg border bg-yellow-50 border-yellow-200 overflow-hidden">
                      <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
                        <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">
                          {userRankInfo.rank}
                        </span>
                        <div>
                          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                            <span className="font-semibold text-gray-800 text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                              {userRankInfo.userEntry.displayName || 'Anonymous'}
                            </span>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-medium">
                              You
                            </span>
                          </div>
                          
                          <div className="hidden md:flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              <span>{userRankInfo.userEntry.moves} moves</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Lightbulb className="w-3 h-3" />
                              <span>{userRankInfo.userEntry.hintsUsed} hints</span>
                            </div>
                          </div>
                          
                          {/* Mobile compact stats */}
                          <div className="md:hidden text-xs text-gray-600 mt-1">
                            {userRankInfo.userEntry.moves} moves • {userRankInfo.userEntry.hintsUsed} hints
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-2 text-green-600 text-base md:text-lg font-bold">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          {formatTime(userRankInfo.userEntry.totalTime)}
                        </div>
                        {getTimeBreakdown(userRankInfo.userEntry) && (
                          <div className="text-xs text-gray-500 mt-1">
                            {getTimeBreakdown(userRankInfo.userEntry)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};