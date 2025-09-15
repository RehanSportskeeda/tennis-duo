import { r as reactExports, j as jsxRuntimeExports, m as TrendingUp, b as LogIn, C as Calendar, k as Target, l as Clock, d as Lightbulb, h as Archive, T as Trophy } from "./react-vendor-Cxdu5FWc.js";
import { u as useLeaderboard, c as trackDashboardView, a as trackCTAClick, d as trackPendingGamesClick, A as ArchivePopup, e as trackUserStatsView } from "./index-D4MpbWLW.js";
import "./vendor-vU7BIIlf.js";
import "./firebase-DnFTZRb-.js";
const DashboardTab = ({
  isLoggedIn,
  userId,
  onShowLogin,
  onPlayArchive,
  availablePuzzles = []
}) => {
  const [userStats, setUserStats] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [showArchivePopup, setShowArchivePopup] = reactExports.useState(false);
  const [completedDates, setCompletedDates] = reactExports.useState([]);
  const { getUserStats } = useLeaderboard();
  reactExports.useEffect(() => {
    trackDashboardView(isLoggedIn);
  }, [isLoggedIn]);
  reactExports.useEffect(() => {
    const fetchUserStats = async () => {
      if (isLoggedIn && userId && getUserStats) {
        setLoading(true);
        try {
          const stats = await getUserStats(userId);
          setUserStats(stats);
          if (stats) {
            trackUserStatsView(stats.totalGames, stats.currentStreak);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserStats();
  }, [isLoggedIn, userId]);
  reactExports.useEffect(() => {
    const fetchCompletedDates = async () => {
      if (isLoggedIn && userId && getUserStats) {
        try {
          const stats = await getUserStats(userId);
          if (stats && stats.completedDates) {
            setCompletedDates(stats.completedDates);
          }
        } catch (error) {
        }
      }
    };
    fetchCompletedDates();
  }, [isLoggedIn, userId]);
  const totalAvailableGames = availablePuzzles.length + 1;
  const pendingGamesCount = totalAvailableGames - (completedDates.length || 0);
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1e3);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    } else if (minutes > 0) {
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6 text-indigo-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-gray-800", children: "Dashboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm", children: "Track your progress and achievements" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-3", children: "Sign in to view your dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: "Track your game statistics, view your best performances, and monitor your progress over time." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              trackCTAClick("dashboard_login");
              onShowLogin();
            },
            className: "inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
              "Sign In"
            ]
          }
        )
      ] }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6 text-indigo-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-gray-800", children: "Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm", children: "Your game statistics and achievements" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-gray-600", children: "Loading your statistics..." })
    ] }) : !userStats ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-lg mb-2", children: "No statistics available" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Complete some puzzles to see your stats here." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 rounded-lg p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-6 h-6 text-blue-600 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-600", children: userStats.totalGames }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600", children: "Games Played" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 rounded-lg p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6 text-green-600 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: userStats.totalMoves }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600", children: "Total Moves" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50 rounded-lg p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6 text-purple-600 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-purple-600", children: formatTime(userStats.totalTimeSpent) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600", children: "Time Spent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-yellow-50 rounded-lg p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-6 h-6 text-yellow-600 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-yellow-600", children: userStats.currentStreak }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600", children: "Current Streak" })
          ] })
        ] })
      ] }),
      pendingGamesCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Catch Up" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              trackPendingGamesClick(pendingGamesCount, totalAvailableGames);
              setShowArchivePopup(true);
            },
            className: "w-full max-w-xs p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold", children: "Pending Games" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm opacity-90", children: [
                  pendingGamesCount,
                  "/",
                  totalAvailableGames,
                  " games remaining"
                ] })
              ] })
            ] })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Best Performances" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-yellow-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-800", children: "Best Rank" }),
                userStats.bestRankDate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 font-normal", children: new Date(userStats.bestRankDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold text-yellow-600 mb-1", children: [
              "#",
              userStats.bestRank
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600", children: "Highest position achieved" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6 text-green-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-800", children: "Unassisted Games" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-green-600 mb-1", children: userStats.unassistedGamesCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600", children: "Games solved with 0 hints" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6 text-blue-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-800", children: "Fastest Time" }),
                userStats.bestTimeDate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 font-normal", children: new Date(userStats.bestTimeDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-blue-600 mb-1", children: formatTime(userStats.bestTime) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600", children: "Personal best" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Averages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5 text-gray-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Average Moves" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-gray-800", children: userStats.averageMoves.toFixed(1) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-5 h-5 text-gray-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Average Hints" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-gray-800", children: userStats.averageHints.toFixed(1) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-gray-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Avg Play Time" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-gray-800", children: formatTime(userStats.averageTime) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Recent Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-gray-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Games This Week" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-gray-800", children: userStats.gamesThisWeek })
        ] }) })
      ] })
    ] }) }),
    showArchivePopup && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArchivePopup,
      {
        onClose: () => setShowArchivePopup(false),
        onSelectDate: (date) => {
          if (onPlayArchive) {
            onPlayArchive(date);
          }
          setShowArchivePopup(false);
        },
        availablePuzzles,
        userId
      }
    )
  ] }) });
};
export {
  DashboardTab as default
};
