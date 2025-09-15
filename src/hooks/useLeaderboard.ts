import { useState, useCallback } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  where,
  Timestamp
} from 'firebase/firestore';
import { nhlDb } from '../config/firebase';
import { GameStats } from '../types/game';

interface LeaderboardEntry {
  id: string;
  userId: string;
  displayName: string;
  puzzleDate: string;
  moves: number;
  hintsUsed: number;
  totalTime: number;
  completedAt: Date;
  score: number; // Calculated score for ranking
}

interface UserStats {
  totalGames: number;
  totalMoves: number;
  totalHints: number;
  totalTimeSpent: number;
  unassistedGamesCount: number;
  bestUnassistedTime: number | null;
  bestTime: number;
  bestRank: number;
  averageMoves: number;
  averageHints: number;
  averageTime: number;
  gamesThisWeek: number;
  currentStreak: number;
  bestUnassistedTimeDate?: string;
  bestTimeDate?: string;
  bestRankDate?: string;
  completedDates?: string[];
}

export const useLeaderboard = () => {
  const [currentLeaderboard, setCurrentLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateScore = (moves: number, totalTime: number, hintsUsed: number): number => {
    // For time-based ranking, we use negative total time so lower time = higher score
    // This allows us to use orderBy('score', 'desc') to get fastest times first
    return -totalTime;
  };

  const fetchLeaderboardForDate = useCallback(async (date: string) => {
    // Validate date parameter
    if (!date || typeof date !== 'string' || date.trim() === '') {
      setError('Invalid puzzle date');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      setError(null);
      
      // Get ALL entries for this date from the new collection structure
      const allEntriesQuery = query(
        collection(nhlDb, 'nhl-duo'),
        where('puzzleDate', '==', date)
      );
      
      const allEntriesSnapshot = await getDocs(allEntriesQuery);
      
      const entries: LeaderboardEntry[] = [];
      
      allEntriesSnapshot.forEach((doc) => {
        try {
          const data = doc.data();
          const entry = {
            id: doc.id,
            ...data,
            completedAt: data.completedAt?.toDate() || new Date()
          } as LeaderboardEntry;
          
          entries.push(entry);
        } catch (docError) {
        }
      });
      
      // Sort by fastest time
      entries.sort((a, b) => a.totalTime - b.totalTime);
      
      // Get top 20 entries
      const top20 = entries.slice(0, 20);
      
      setCurrentLeaderboard(top20);
      setCurrentDate(date);
      
    } catch (error: any) {
      if (error.code !== 'unavailable' && error.code !== 'permission-denied') {
        setError('Failed to load leaderboard');
      }
      setCurrentLeaderboard([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitScore = async (
    userId: string,
    displayName: string,
    gameStats: GameStats,
    puzzleDate: string
  ) => {
    try {
      setError(null);
      
      // Check if user already has a score for this puzzle date
      const existingScoreQuery = query(
        collection(nhlDb, 'nhl-duo'),
        where('userId', '==', userId),
        where('puzzleDate', '==', puzzleDate),
        limit(1)
      );
      
      const existingScoreSnapshot = await getDocs(existingScoreQuery);
      
      if (!existingScoreSnapshot.empty) {
        return; // User already has a score, don't add another one
      }
      
      const leaderboardEntry = {
        userId,
        displayName,
        puzzleDate,
        moves: gameStats.moves,
        hintsUsed: gameStats.hintsUsed,
        totalTime: gameStats.totalTime,
        score: calculateScore(gameStats.moves, gameStats.totalTime, gameStats.hintsUsed),
        completedAt: Timestamp.now(),
      };
      
      const docRef = await addDoc(collection(nhlDb, 'nhl-duo'), leaderboardEntry);
      
    } catch (error: any) {
      // Handle specific Firebase errors gracefully
      if (error.code === 'permission-denied') {
        setError('Please sign in to submit your score to the leaderboard');
      } else if (error.code === 'unavailable') {
        // Don't show error to user, just log it
      } else {
        setError('Failed to submit score. Please try again.');
      }
      
      // Don't throw error to prevent breaking the game flow
    }
  };

  const getUserRank = async (userId: string, puzzleDate: string): Promise<{ rank: number; userEntry: LeaderboardEntry } | null> => {
    try {
      // Get ALL entries for this date to calculate accurate rank
      const allEntriesQuery = query(
        collection(nhlDb, 'nhl-duo'),
        where('puzzleDate', '==', puzzleDate)
      );
      
      const querySnapshot = await getDocs(allEntriesQuery);
      const allEntries: LeaderboardEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        try {
          const data = doc.data();
          const entry = {
            id: doc.id,
            ...data,
            completedAt: data.completedAt?.toDate() || new Date()
          } as LeaderboardEntry;
          
          allEntries.push(entry);
        } catch (docError) {
        }
      });
      
      // Sort by fastest time
      allEntries.sort((a, b) => a.totalTime - b.totalTime);
      
      // Find user's entry and rank
      const userEntryIndex = allEntries.findIndex(entry => entry.userId === userId);
      if (userEntryIndex === -1) return null;
      
      return {
        rank: userEntryIndex + 1,
        userEntry: allEntries[userEntryIndex]
      };
    } catch (error) {
      return null;
    }
  };

  const getUserCompletedDates = async (userId: string): Promise<string[]> => {
    try {
      const userEntriesQuery = query(
        collection(nhlDb, 'nhl-duo'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(userEntriesQuery);
      const completedDates: string[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.puzzleDate) {
          completedDates.push(data.puzzleDate);
        }
      });
      
      // Remove duplicates
      return [...new Set(completedDates)];
    } catch (error) {
      return [];
    }
  };

  const getUserStats = useCallback(async (userId: string): Promise<UserStats | null> => {
    try {
      // Get all user entries
      const userEntriesQuery = query(
       collection(nhlDb, 'nhl-duo'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(userEntriesQuery);
      const userEntries: LeaderboardEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        try {
          const data = doc.data();
          const entry = {
            id: doc.id,
            ...data,
            completedAt: data.completedAt?.toDate() || new Date()
          } as LeaderboardEntry;
          
          userEntries.push(entry);
        } catch (docError) {
        }
      });
      
      if (userEntries.length === 0) {
        return null;
      }
      
      // Calculate statistics
      const totalGames = userEntries.length;
      const totalMoves = userEntries.reduce((sum, entry) => sum + entry.moves, 0);
      const totalHints = userEntries.reduce((sum, entry) => sum + entry.hintsUsed, 0);
      
      // Time Spent = Sum of base time (excluding 15s penalty)
      const totalTimeSpent = userEntries.reduce((sum, entry) => {
        const baseTime = entry.totalTime - (entry.hintsUsed * 15 * 1000);
        return sum + baseTime;
      }, 0);
      
      // Average Time = Average of total time (including 15s penalty)
      const totalTimeWithPenalties = userEntries.reduce((sum, entry) => sum + entry.totalTime, 0);
      const averageTime = totalTimeWithPenalties / totalGames;
      
      // Get best unassisted game (0 hints used)
      const unassistedGames = userEntries.filter(entry => entry.hintsUsed === 0);
      const unassistedGamesCount = unassistedGames.length;
      const bestUnassistedTime = unassistedGames.length > 0 ? Math.min(...unassistedGames.map(entry => entry.totalTime)) : null;
      
      const bestTime = Math.min(...userEntries.map(entry => entry.totalTime));
      const averageMoves = totalMoves / totalGames;
      const averageHints = totalHints / totalGames;
      
      // Find the entries with best performances
      const bestUnassistedTimeEntry = unassistedGames.find(entry => entry.totalTime === bestUnassistedTime);
      const bestTimeEntry = userEntries.find(entry => entry.totalTime === bestTime);
      
      // Calculate games this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const gamesThisWeek = userEntries.filter(entry => 
        entry.completedAt >= oneWeekAgo
      ).length;
      
      // Calculate current streak (consecutive days from today backwards)
      let currentStreak = 0;
      // Get today's date in YYYY-MM-DD format
      const todayStr = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
      
      // Start from today and go backwards
      let checkDateStr = todayStr;
      
      while (true) {
        // Find entry where puzzle date matches check date AND completion date matches puzzle date
        const validEntryForThisDate = userEntries.find(entry => {
          const completionDateStr = entry.completedAt.toLocaleDateString('en-CA');
          const puzzleDateMatches = entry.puzzleDate === checkDateStr;
          const completionDateMatches = completionDateStr === checkDateStr;
          
          return puzzleDateMatches && completionDateMatches;
        });
        
        if (validEntryForThisDate) {
          currentStreak++;
        } else {
          // If this is today and no valid entry exists, that's normal (they might not have played yet)
          if (checkDateStr === todayStr) {
            // Don't increment streak for today if no valid entry exists yet, but don't break it either
          } else {
            break;
          }
        }
        
        // Move to previous day
        const currentDate = new Date(checkDateStr);
        currentDate.setDate(currentDate.getDate() - 1);
        checkDateStr = currentDate.toLocaleDateString('en-CA');
        
        // Safety check: don't go back more than 365 days
        const daysDiff = Math.floor((Date.now() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff > 365) {
          break;
        }
      }
      
      // Calculate best rank by checking all entries against their respective leaderboards
      let bestRank = Infinity;
      let bestRankDate: string | undefined;
      
      // For now, we'll use the first game date as best rank date
      // In a full implementation, we'd calculate actual ranks for each date
      if (userEntries.length > 0) {
        bestRank = 1; // Placeholder - would need more complex calculation
        bestRankDate = userEntries[0].puzzleDate;
      }
      
      // Get completed dates for pending games calculation
      const completedDates = userEntries.map(entry => entry.puzzleDate);
      
      const stats: UserStats = {
        totalGames,
        totalMoves,
        totalHints,
        totalTimeSpent,
        unassistedGamesCount,
        bestUnassistedTime,
        bestTime,
        bestRank,
        averageMoves,
        averageHints,
        averageTime,
        gamesThisWeek,
        currentStreak,
        bestUnassistedTimeDate: bestUnassistedTimeEntry?.puzzleDate,
        bestTimeDate: bestTimeEntry?.puzzleDate,
        bestRankDate,
        completedDates
      };
      
      return stats;
      
    } catch (error) {
      return null;
    }
  }, []); // Empty dependency array since this function doesn't depend on any external values

  return {
    currentLeaderboard,
    currentPuzzleDate: currentDate,
    loading,
    error,
    submitScore,
    fetchLeaderboardForDate,
    getUserRank,
    getUserCompletedDates,
    calculateScore,
    getUserStats
  };
};