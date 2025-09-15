import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { User } from 'firebase/auth';
import { useAuth } from './hooks/useAuth';
import { useGameState } from './hooks/useGameState';
import { useLeaderboard } from './hooks/useLeaderboard';
import { fetchDailyPuzzle, fetchAllAvailablePuzzles, fetchPuzzleByDate } from './utils/dailyPuzzle';
import { 
  trackGameStart, 
  trackGameEnd, 
  trackCellClick, 
  trackHint, 
  trackReset, 
  trackPuzzleLoad,
  trackTabSwitch,
  trackScoreSubmission
} from './utils/analytics';
import PFSNHeader from './components/PFSNHeader';
import TopBar from './components/TopBar';
import GameTab from './components/GameTab';
import PFSNFooter from './components/PFSNFooter';
import SEOHead from './components/SEOHead';
import { RaptiveOutstreamAd, RaptiveSidebarAd, RaptiveFooterAd } from './components/RaptiveAds';

// Lazy load heavy components
const LeaderboardTab = lazy(() => import('./components/LeaderboardTab').then(module => ({ default: module.LeaderboardTab })));
const DashboardTab = lazy(() => import('./components/DashboardTab'));
const CompletionScreen = lazy(() => import('./components/CompletionScreen'));
const AuthModal = lazy(() => import('./components/AuthModal'));

function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'game' | 'leaderboard' | 'dashboard'>('game');
  const [dailyPuzzleData, setDailyPuzzleData] = useState(null);
  const [puzzleLoading, setPuzzleLoading] = useState(true);
  const [currentPuzzleDate, setCurrentPuzzleDate] = useState('');
  const [puzzleLoadErrorMessage, setPuzzleLoadErrorMessage] = useState('');
  const [availablePuzzles, setAvailablePuzzles] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [showBottomResults, setShowBottomResults] = useState(false);
  const [completionModalDismissed, setCompletionModalDismissed] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const submissionInProgress = useRef(false);
  const [previousTab, setPreviousTab] = useState<'game' | 'leaderboard' | 'dashboard'>('game');

  const {
    currentLeaderboard,
    currentPuzzleDate: leaderboardDate,
    loading: leaderboardLoading,
    error: leaderboardError,
    submitScore,
    getUserRank: getUserRankAsync,
    fetchLeaderboardForDate
  } = useLeaderboard();

  // Fetch today's puzzle
  useEffect(() => {
    const loadDailyPuzzle = async () => {
      try {
        setPuzzleLoading(true);
        setPuzzleLoadErrorMessage('');
        const puzzle = await fetchDailyPuzzle();
        if (puzzle) {
          setDailyPuzzleData(puzzle);
          setCurrentPuzzleDate(puzzle.date);
          trackPuzzleLoad(true, 'daily');
          trackGameStart('daily', puzzle.difficulty);
        } else {
          setPuzzleLoadErrorMessage('No valid puzzle found for today. The puzzle data may be malformed or missing.');
          trackPuzzleLoad(false, 'daily', 'No puzzle found for today');
        }
      } catch (error) {
        console.error('Failed to load daily puzzle:', error);
        setPuzzleLoadErrorMessage(`Failed to load today's puzzle: ${error.message}`);
        trackPuzzleLoad(false, 'daily', error.message);
      } finally {
        setPuzzleLoading(false);
      }
    };
    
    loadDailyPuzzle();
  }, []);

  // Load available puzzles for archive
  useEffect(() => {
    const loadAvailablePuzzles = async () => {
      try {
        const puzzles = await fetchAllAvailablePuzzles();
        setAvailablePuzzles(puzzles);
      } catch (error) {
        console.error('Failed to load available puzzles:', error);
      }
    };
    
    loadAvailablePuzzles();
  }, []);
  
  const {
    gameState,
    gameStats,
    violations,
    violationMessages,
    isComplete,
    showWinAnimation,
    canUndo,
    undoMove,
    useHint,
    resetGame,
    makeMove
  } = useGameState(dailyPuzzleData);

  // Debug canUndo prop
  React.useEffect(() => {
    console.log('🎮 APP - canUndo from hook:', canUndo);
  }
  )
  // Handle showing completion screen with delay after animation
  useEffect(() => {
    if (isComplete && !showCompletionScreen && !completionModalDismissed) {
      // Wait for flip animation to complete before showing completion screen
      const timer = setTimeout(() => {
        setShowCompletionScreen(true);
      }, 1500); // 1.5 seconds to allow animation to finish
      
      return () => clearTimeout(timer);
    }
  }, [isComplete, showCompletionScreen, completionModalDismissed]);

  // Reset completion states when game is no longer complete
  useEffect(() => {
  }, [isComplete]);

  // Handle game completion
  useEffect(() => {
    if (isComplete && gameStats && !scoreSubmitted && user && gameStats.endTime && !submissionInProgress.current) {
      
      setScoreSubmitted(true);
      
      const finalStats = {
        ...gameStats,
        endTime: gameStats.endTime || Date.now(),
        baseTime: gameStats.baseTime || (Date.now() - gameStats.startTime),
      };

      // Track game completion
      trackGameEnd({
        moves: finalStats.moves,
        hintsUsed: finalStats.hintsUsed,
        timeTaken: finalStats.totalTime,
        completed: true
      });

      // Submit score
      const displayName = user.displayName || user.email?.split('@')[0] || 'Anonymous';
      
      // Submit score to leaderboard
      submitScore(user.uid, displayName, finalStats, currentPuzzleDate).then(() => {
        trackScoreSubmission(true, finalStats, currentPuzzleDate);
      }).catch((error) => {
        trackScoreSubmission(false, finalStats, currentPuzzleDate);
      });
    }
  }, [isComplete, scoreSubmitted, user?.uid, gameStats?.endTime, currentPuzzleDate]);

  // Reset score submission flag when starting a new game
  useEffect(() => {
    if (!isComplete) {
      setScoreSubmitted(false);
      submissionInProgress.current = false;
      setShowCompletionScreen(false);
      setShowBottomResults(false);
      setCompletionModalDismissed(false);
    }
  }, [isComplete]);

  const handleCellClick = (row: number, col: number) => {
    if (gameState.grid[row]?.[col]?.isFixed || isComplete) return;
    
    const currentValue = gameState.grid[row][col].value;
    const nextValue = currentValue === null ? 'helmet' : currentValue === 'helmet' ? 'football' : null;
    
    trackCellClick(row, col, nextValue, gameStats.moves + 1);
    makeMove(row, col);
  };

  const handleHint = () => {
    trackHint(gameStats.hintsUsed + 1);
    useHint();
  };

  const handleReset = () => {
    trackReset(gameStats.moves, gameStats.hintsUsed);
    setShowBottomResults(false);
    setCompletionModalDismissed(false);
    resetGame();
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionScreen(false);
    setCompletionModalDismissed(true);
    setShowBottomResults(true);
    
    // Scroll to show the bottom results section after a brief delay
    setTimeout(() => {
      // Try to find the bottom results section first
      const bottomResults = document.querySelector('[data-bottom-results]');
      if (bottomResults) {
        bottomResults.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      } else {
        // Fallback: scroll to bottom of page
        window.scrollTo({ 
          top: document.body.scrollHeight, 
          behavior: 'smooth' 
        });
      }
    }, 100);
  };

  const handleShowLeaderboard = () => {
    trackTabSwitch(activeTab, 'leaderboard');
    setActiveTab('leaderboard');
    // Scroll to top when switching to leaderboard
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (newTab: 'game' | 'leaderboard' | 'dashboard') => {
    trackTabSwitch(activeTab, newTab);
    setPreviousTab(activeTab);
    setActiveTab(newTab);
    
    // Scroll to top when switching tabs
    if (newTab !== 'game') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlayArchive = async (date: string) => {
    try {
      setPuzzleLoading(true);
      setPuzzleLoadErrorMessage('');
      const puzzle = await fetchPuzzleByDate(date);
      if (puzzle) {
        setDailyPuzzleData(puzzle);
        setCurrentPuzzleDate(puzzle.date);
        trackGameStart('daily', puzzle.difficulty);
        // Switch back to game tab when loading archive puzzle
        setActiveTab('game');
      } else {
        setPuzzleLoadErrorMessage(`No valid puzzle found for ${date}. The puzzle data may be malformed or missing.`);
      }
    } catch (error) {
      setPuzzleLoadErrorMessage(`Failed to load puzzle for ${date}: ${error.message}`);
    } finally {
      setPuzzleLoading(false);
    }
  };

  // Listen for leaderboard switch event from bottom results
  useEffect(() => {
    const handleSwitchToLeaderboard = () => {
      setActiveTab('leaderboard');
    };
    
    window.addEventListener('switchToLeaderboard', handleSwitchToLeaderboard);
    return () => window.removeEventListener('switchToLeaderboard', handleSwitchToLeaderboard);
  }, []);

  if (authLoading || puzzleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!dailyPuzzleData && activeTab === 'game') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TopBar
          user={user}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onShowLogin={() => setShowAuthModal(true)}
          onLogout={logout}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Puzzle Available</h2>
            <p className="text-gray-600 mb-6">
              {puzzleLoadErrorMessage || "There's no puzzle available for today. Please check back later!"}
            </p>
          </div>
        </div>

        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* SEO Meta Tags */}
      <SEOHead />
      {/* PFSN Header */}
      <PFSNHeader currentPage="NHL" />

      {/* Game Navigation Bar */}
      <TopBar
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onShowLogin={() => setShowAuthModal(true)}
        onLogout={logout}
      />

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-2">
        <div className="flex flex-col lg:flex-row gap-0 justify-center items-start">
          {/* Main Content Area */}
          <div className="flex-1 max-w-2xl">
            {/* Tab Content */}
            {activeTab === 'game' && (
        <GameTab
          dailyPuzzleData={dailyPuzzleData}
          gameState={gameState}
          gameStats={gameStats}
          violations={violations}
          violationMessages={violationMessages}
          isComplete={isComplete}
          showWinAnimation={showWinAnimation}
          onCellClick={handleCellClick}
          onHint={handleHint}
          onReset={handleReset}
          canUndo={canUndo}
          undoMove={undoMove}
          onPlayArchive={handlePlayArchive}
          availablePuzzles={availablePuzzles}
          isLoggedIn={!!user}
          userId={user?.uid}
          currentPuzzleDate={currentPuzzleDate}
          onShowLogin={() => setShowAuthModal(true)}
          showBottomResults={showBottomResults}
          onCloseBottomResults={() => setShowBottomResults(false)}
        />
            )}
            
            {activeTab === 'leaderboard' && (
        <Suspense fallback={<div className="flex items-center justify-center p-8"><div className="loading-skeleton">Loading...</div></div>}>
          <LeaderboardTab
            currentLeaderboard={currentLeaderboard}
            currentPuzzleDate={currentPuzzleDate || dailyPuzzleData?.date}
            loading={leaderboardLoading}
            error={leaderboardError}
            userId={user?.uid}
            isLoggedIn={!!user}
            onShowLogin={() => setShowAuthModal(true)}
            onFetchLeaderboard={fetchLeaderboardForDate}
            onGetUserRank={getUserRankAsync}
          />
        </Suspense>
            )}
            
            {activeTab === 'dashboard' && (
        <Suspense fallback={<div className="flex items-center justify-center p-8"><div className="loading-skeleton">Loading...</div></div>}>
          <DashboardTab
            isLoggedIn={!!user}
            userId={user?.uid}
            onShowLogin={() => setShowAuthModal(true)}
            onPlayArchive={handlePlayArchive}
            availablePuzzles={availablePuzzles}
          />
        </Suspense>
            )}
          </div>
          
          {/* Sidebar Ad - Desktop Only */}
          <div className="hidden lg:block lg:w-[300px] lg:ml-4">
            <div className="sticky top-4">
              <RaptiveSidebarAd />
            </div>
          </div>
        </div>
      </div>

      {/* Completion Screen Overlay */}
      {showCompletionScreen && activeTab === 'game' && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"><div className="loading-skeleton">Loading...</div></div>}>
          <CompletionScreen
            gameStats={gameStats}
            onPlayArchive={handlePlayArchive}
            availablePuzzles={availablePuzzles}
            isLoggedIn={!!user}
            onShowLogin={() => setShowAuthModal(true)}
            onShowLeaderboard={handleShowLeaderboard}
            userId={user?.uid}
            onClose={handleCloseCompletionModal}
          />
        </Suspense>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"><div className="loading-skeleton">Loading...</div></div>}>
          <AuthModal onClose={() => setShowAuthModal(false)} />
        </Suspense>
      )}

      {/* Sticky Outstream Video Player - Bottom Left */}
      <RaptiveOutstreamAd />

      {/* Footer Ad */}
      <RaptiveFooterAd />
      
      {/* Footer */}
      <PFSNFooter currentPage="NBA" />
    </div>
  );
}

export default App;