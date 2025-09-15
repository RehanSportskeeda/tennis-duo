import React, { useState } from 'react';
import { HelpCircle, Share2, Archive, Trophy, LogIn } from 'lucide-react';
import { DailyPuzzleData } from '../utils/dailyPuzzle';
import { GameState, GameStats } from '../types/game';
import GameGrid from './GameGrid';
import GameControls from './GameControls';
import GameStatus from './GameStatus';
import ArchivePopup from './ArchivePopup';
import RulesModal from './RulesModal';
import { trackCTAClick, trackRuleView } from '../utils/analytics';
import RacketIcon from './RacketSvgIcon';

interface GameTabProps {
  dailyPuzzleData: DailyPuzzleData | null;
  gameState: GameState;
  gameStats: GameStats;
  violations: Set<string>;
  violationMessages: React.ReactNode[];
  isComplete: boolean;
  showWinAnimation: boolean;
  canUndo: boolean;
  onCellClick: (row: number, col: number) => void;
  onHint: () => void;
  onReset: () => void;
  undoMove: () => void;
  onPlayArchive: (date: string) => void;
  availablePuzzles: { date: string; difficulty: string }[];
  isLoggedIn: boolean;
  userId?: string;
  currentPuzzleDate: string;
  onShowLogin: () => void;
  showBottomResults: boolean;
  onCloseBottomResults: () => void;
}

const GameTab: React.FC<GameTabProps> = ({
  dailyPuzzleData,
  gameState,
  gameStats,
  violations,
  violationMessages,
  isComplete,
  showWinAnimation,
  canUndo,
  onCellClick,
  onHint,
  onReset,
  undoMove,
  onPlayArchive,
  availablePuzzles,
  isLoggedIn,
  userId,
  currentPuzzleDate,
  onShowLogin,
  showBottomResults,
  onCloseBottomResults,
}) => {
  const [showArchive, setShowArchive] = useState(false);
  const [showRules, setShowRules] = useState(false);


  // Guest user view
  if (!isLoggedIn) {
    return (
      <>
        <div className="container mx-auto px-2 py-8">
          <div className="space-y-6 max-w-xl mx-auto">
        <div className="space-y-6 max-w-xl lg:max-w-sm mx-auto">
          {/* Game Grid */}
          {dailyPuzzleData && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Current Puzzle Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {currentPuzzleDate === new Date().toLocaleDateString('en-CA') 
                        ? "Today's Puzzle" 
                        : `Archive: ${new Date(currentPuzzleDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}`
                      }
                    </h3>
                    <p className="text-gray-600">
                      Fill the grid with 🎾 and <RacketIcon className="inline-block w-5 h-5 align-middle" />
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      trackRuleView();
                      setShowRules(true);
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Rules
                  </button>
                </div>
              </div>

              <GameGrid
                grid={gameState.grid}
                constraints={gameState.constraints}
                violations={violations}
                onCellClick={onCellClick}
                showWinAnimation={showWinAnimation}
              />
              
              <div className="mt-6">
                <GameControls
                  onUndo={undoMove}
                  onHint={onHint}
                  onNewGame={onReset}
                  canUndo={canUndo}
                  isGameComplete={isComplete}
                />
              </div>
            </div>
          )}

          {/* Game Status */}
          <GameStatus
            violations={violations}
            violationMessages={violationMessages}
            isComplete={isComplete}
            gameStats={gameStats}
          />

          {/* Bottom Results Section for Guest Users */}
          {showBottomResults && gameStats && (
            <div className="bg-white rounded-xl shadow-lg p-6" data-bottom-results>
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">🎉 Puzzle Completed!</h3>
                <p className="text-gray-600">Great job solving the challenge!</p>
              </div>
              
              {/* Stats Rows */}
              <div className="space-y-3 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Moves</span>
                    <span className="text-2xl font-bold text-blue-600">{gameStats.moves}</span>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Hints Used</span>
                    <span className="text-2xl font-bold text-yellow-600">{gameStats.hintsUsed}</span>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="font-medium text-gray-700">Time</span>
                      {gameStats.hintsUsed > 0 && (
                        <div className="text-xs text-gray-400 mt-1">+15s per hint</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {gameStats.totalTime ? 
                          (() => {
                            const seconds = Math.floor(gameStats.totalTime / 1000);
                            const minutes = Math.floor(seconds / 60);
                            const remainingSeconds = seconds % 60;
                            return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                          })() : '0s'
                        }
                      </div>
                      {gameStats.hintsUsed > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {(() => {
                            const baseTime = gameStats.totalTime - (gameStats.hintsUsed * 15 * 1000);
                            const seconds = Math.floor(baseTime / 1000);
                            const minutes = Math.floor(seconds / 60);
                            const remainingSeconds = seconds % 60;
                            const baseTimeFormatted = minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                            return `${baseTimeFormatted} + ${gameStats.hintsUsed}×15s`;
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons for Guest Users */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={async () => {
                    trackCTAClick('share', 'game_bottom_results_guest', false);
                    const timeTaken = gameStats.totalTime ? 
                      (() => {
                        const seconds = Math.floor(gameStats.totalTime / 1000);
                        const minutes = Math.floor(seconds / 60);
                        const remainingSeconds = seconds % 60;
                        return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                      })() : '0s';
                    
                    const shareText = `🎾 Just solved today's Tennis Duo in ${timeTaken}! 🎾

⚡ ${gameStats.moves} moves
💡 ${gameStats.hintsUsed} hints used

Can you beat my time? Play now:`;
                    const gameUrl = window.location.href;
                    
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: 'Tennis Duo',
                          text: shareText,
                          url: gameUrl,
                        });
                      } catch (error) {
                        // Fallback to clipboard
                        try {
                          const fullText = `${shareText}\n${gameUrl}`;
                          await navigator.clipboard.writeText(fullText);
                          alert('Game results copied to clipboard! 📋');
                        } catch (clipboardError) {
                          const fullText = `${shareText}\n${gameUrl}`;
                          alert(`Share this:\n\n${fullText}`);
                        }
                      }
                    } else {
                      try {
                        const fullText = `${shareText}\n${gameUrl}`;
                        await navigator.clipboard.writeText(fullText);
                        alert('Game results copied to clipboard! 📋');
                      } catch (error) {
                        const fullText = `${shareText}\n${gameUrl}`;
                        alert(`Share this:\n\n${fullText}`);
                      }
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                
                <button
                  onClick={() => {
                    trackCTAClick('archive', 'game_bottom_results_guest', false);
                    setShowArchive(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <Archive className="w-4 h-4" />
                  Play Archive
                </button>
                
                <button
                  onClick={() => {
                    trackCTAClick('login', 'game_bottom_results_guest', false);
                    onShowLogin();
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login to See your Rank
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
        </div>

        {/* Rules Modal for guest users */}
        <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />

        {/* Archive Popup for guest users */}
        {showArchive && (
          <ArchivePopup
            onClose={() => setShowArchive(false)}
            onSelectDate={(date) => {
              onPlayArchive(date);
              setShowArchive(false);
            }}
            availablePuzzles={availablePuzzles}
            userId={userId}
          />
        )}
      </>
    );
  }

  // Logged in user view
  return (
    <>
      <div className="container mx-auto px-2 py-8">
        {/* Game Content */}
        <div className="space-y-6 max-w-xl lg:max-w-sm mx-auto">
          {/* Game Grid */}
          {dailyPuzzleData && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Current Puzzle Info - moved inside grid container */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {currentPuzzleDate === new Date().toLocaleDateString('en-CA') 
                        ? "Today's Puzzle" 
                        : `Archive: ${new Date(currentPuzzleDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}`
                      }
                    </h3>
                    <p className="text-gray-600">
                      Fill the grid with 🎾 and <RacketIcon className="inline-block w-5 h-5 align-middle" />
                    </p>
                  </div>
                    <button
                      onClick={() => {
                        trackRuleView();
                        setShowRules(true);
                      }}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Rules
                    </button>
                </div>
              </div>

              <GameGrid
                grid={gameState.grid}
                constraints={gameState.constraints}
                violations={violations}
                onCellClick={onCellClick}
                showWinAnimation={showWinAnimation}
              />
              
              <div className="mt-6">
                <GameControls
                  onUndo={undoMove}
                  onHint={onHint}
                  onNewGame={onReset}
                  canUndo={canUndo}
                  isGameComplete={isComplete}
                />
              </div>
            </div>
          )}

          {/* Game Status */}
          <GameStatus
            violations={violations}
            violationMessages={violationMessages}
            isComplete={isComplete}
            gameStats={gameStats}
          />

          {/* Bottom Results Section */}
          {showBottomResults && gameStats && isLoggedIn && (
            <div className="bg-white rounded-xl shadow-lg p-6" data-bottom-results>
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">🎉 Puzzle Completed!</h3>
                <p className="text-gray-600">Great job solving today's challenge!</p>
              </div>
              
              {/* Stats Grid */}
              <div className="space-y-3 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Moves</span>
                    <span className="text-2xl font-bold text-blue-600">{gameStats.moves}</span>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Hints Used</span>
                    <span className="text-2xl font-bold text-yellow-600">{gameStats.hintsUsed}</span>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="font-medium text-gray-700">Time</span>
                      {gameStats.hintsUsed > 0 && (
                        <div className="text-xs text-gray-400 mt-1">+15s per hint</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {gameStats.totalTime ? 
                          (() => {
                            const seconds = Math.floor(gameStats.totalTime / 1000);
                            const minutes = Math.floor(seconds / 60);
                            const remainingSeconds = seconds % 60;
                            return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                          })() : '0s'
                        }
                      </div>
                      {gameStats.hintsUsed > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {(() => {
                            const baseTime = gameStats.totalTime - (gameStats.hintsUsed * 15 * 1000);
                            const seconds = Math.floor(baseTime / 1000);
                            const minutes = Math.floor(seconds / 60);
                            const remainingSeconds = seconds % 60;
                            const baseTimeFormatted = minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                            return `${baseTimeFormatted} + ${gameStats.hintsUsed}×15s`;
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={async () => {
                    trackCTAClick('share', 'game_bottom_results_logged_in', true);
                    const timeTaken = gameStats.totalTime ? 
                      (() => {
                        const seconds = Math.floor(gameStats.totalTime / 1000);
                        const minutes = Math.floor(seconds / 60);
                        const remainingSeconds = seconds % 60;
                        return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                      })() : '0s';
                    
                    const shareText = `🎾 Just solved today's Tennis Duo in ${timeTaken}! 🎾

⚡ ${gameStats.moves} moves
💡 ${gameStats.hintsUsed} hints used

Can you beat my time? Play now:`;
                    const gameUrl = window.location.href;
                    
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: 'Tennis Duo',
                          text: shareText,
                          url: gameUrl,
                        });
                      } catch (error) {
                        // Fallback to clipboard
                        try {
                          const fullText = `${shareText}\n${gameUrl}`;
                          await navigator.clipboard.writeText(fullText);
                          alert('Game results copied to clipboard! 📋');
                        } catch (clipboardError) {
                          const fullText = `${shareText}\n${gameUrl}`;
                          alert(`Share this:\n\n${fullText}`);
                        }
                      }
                    } else {
                      try {
                        const fullText = `${shareText}\n${gameUrl}`;
                        await navigator.clipboard.writeText(fullText);
                        alert('Game results copied to clipboard! 📋');
                      } catch (error) {
                        const fullText = `${shareText}\n${gameUrl}`;
                        alert(`Share this:\n\n${fullText}`);
                      }
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                
                <button
                  onClick={() => {
                    trackCTAClick('archive', 'game_bottom_results_logged_in', true);
                    setShowArchive(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <Archive className="w-4 h-4" />
                  Play Archive
                </button>
                
                <button
                  onClick={() => {
                    trackCTAClick('leaderboard', 'game_bottom_results_logged_in', true);
                    // Switch to leaderboard tab
                    window.dispatchEvent(new CustomEvent('switchToLeaderboard'));
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  View Leaderboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Rules Modal for logged-in users */}
        <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />

        {/* Archive Popup for logged-in users */}
        {showArchive && (
          <ArchivePopup
            onClose={() => setShowArchive(false)}
            onSelectDate={(date) => {
              onPlayArchive(date);
              setShowArchive(false);
            }}
            availablePuzzles={availablePuzzles}
            userId={userId}
          />
        )}
    </>
  );
};

export default GameTab;