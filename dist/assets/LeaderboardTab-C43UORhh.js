import { R as React, j as jsxRuntimeExports, T as Trophy, b as LogIn, k as Target, d as Lightbulb, l as Clock } from "./react-vendor-Cxdu5FWc.js";
import { t as trackLeaderboardView, a as trackCTAClick, b as trackLeaderboardRankView } from "./index-D4MpbWLW.js";
import "./vendor-vU7BIIlf.js";
import "./firebase-DnFTZRb-.js";
const LeaderboardTab = ({
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
  const [userRankInfo, setUserRankInfo] = React.useState(null);
  const [userRankLoading, setUserRankLoading] = React.useState(false);
  React.useEffect(() => {
    if (currentPuzzleDate && onFetchLeaderboard) {
      trackLeaderboardView(currentPuzzleDate, isLoggedIn);
      onFetchLeaderboard(currentPuzzleDate);
    }
  }, [currentPuzzleDate, onFetchLeaderboard]);
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
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1e3);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };
  const getTimeBreakdown = (entry) => {
    if (entry.hintsUsed === 0) return null;
    const baseTime = entry.totalTime - entry.hintsUsed * 15 * 1e3;
    const baseTimeFormatted = formatTime(baseTime);
    return `${baseTimeFormatted} + ${entry.hintsUsed}×15s`;
  };
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-yellow-500" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600", children: rank });
    }
  };
  const userInTop20 = userId && currentLeaderboard.some((entry) => entry.userId === userId);
  const showUserRank = userRankInfo && !userInTop20 && userRankInfo.rank > 20;
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-yellow-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-gray-800", children: currentPuzzleDate ? `${new Date(currentPuzzleDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short"
        })} Leaderboard` : `${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short"
        })} Leaderboard` })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-3", children: "Sign in to view the leaderboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: "Create an account to see how you rank against other players and track your progress over time." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onShowLogin,
            className: "px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mx-auto",
            onClick: () => {
              trackCTAClick("login", "leaderboard_guest_prompt", false);
              onShowLogin();
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
              "Sign In"
            ]
          }
        )
      ] }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full px-2 md:px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-yellow-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-gray-800", children: currentPuzzleDate ? `${new Date(currentPuzzleDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short"
        })} Leaderboard` : `${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short"
        })} Leaderboard` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm", children: "Rankings may change as more players join" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-lg p-3 md:p-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-gray-600", children: "Loading leaderboard..." })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600 mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => window.location.reload(),
          className: "px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors",
          children: "Try Again"
        }
      )
    ] }) : currentLeaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-lg mb-2", children: "No scores yet today!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Be the first to complete today's puzzle." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Top 20 Players" }) }),
      currentLeaderboard.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center justify-between p-3 md:p-4 rounded-lg border overflow-hidden ${index === 0 ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300 shadow-lg" : ""} ${userId === entry.userId ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 md:space-x-4 flex-1 min-w-0", children: [
              getRankIcon(index + 1),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 md:gap-2 flex-wrap ${index === 0 ? "items-center" : ""}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold ${index === 0 ? "text-yellow-800 text-base md:text-lg font-bold" : "text-gray-800 text-sm md:text-base"} truncate max-w-[120px] md:max-w-none`, children: entry.displayName || "Anonymous" }),
                  index === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-bold", children: "WINNER" }),
                  userId === entry.userId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-medium", children: "You" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-4 mt-1 text-sm text-gray-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      entry.moves,
                      " moves"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      entry.hintsUsed,
                      " hints"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden text-xs text-gray-600 mt-1", children: [
                  entry.moves,
                  " moves • ",
                  entry.hintsUsed,
                  " hints"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 ${index === 0 ? "text-yellow-700 text-lg md:text-xl font-bold" : "text-green-600 text-base md:text-lg font-bold"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 md:w-4 md:h-4" }),
                formatTime(entry.totalTime)
              ] }),
              getTimeBreakdown(entry) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mt-1", children: getTimeBreakdown(entry) })
            ] })
          ]
        },
        entry.id
      )),
      showUserRank && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-700", children: "Your Rank" }) }),
        userRankLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-gray-600", children: "Loading your rank..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 md:p-4 rounded-lg border bg-yellow-50 border-yellow-200 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 md:space-x-4 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600", children: userRankInfo.rank }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 md:gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800 text-sm md:text-base truncate max-w-[120px] md:max-w-none", children: userRankInfo.userEntry.displayName || "Anonymous" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-medium", children: "You" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-4 mt-1 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    userRankInfo.userEntry.moves,
                    " moves"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    userRankInfo.userEntry.hintsUsed,
                    " hints"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden text-xs text-gray-600 mt-1", children: [
                userRankInfo.userEntry.moves,
                " moves • ",
                userRankInfo.userEntry.hintsUsed,
                " hints"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-600 text-base md:text-lg font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 md:w-4 md:h-4" }),
              formatTime(userRankInfo.userEntry.totalTime)
            ] }),
            getTimeBreakdown(userRankInfo.userEntry) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mt-1", children: getTimeBreakdown(userRankInfo.userEntry) })
          ] })
        ] })
      ] })
    ] }) })
  ] }) });
};
export {
  LeaderboardTab
};
