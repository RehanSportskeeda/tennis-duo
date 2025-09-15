import { r as reactExports, R as React, j as jsxRuntimeExports, X, b as LogIn, T as Trophy, g as Share2, h as Archive } from "./react-vendor-Cxdu5FWc.js";
import { f as trackCompletionScreenView, g as trackCompletionScreenAction, a as trackCTAClick, A as ArchivePopup, H as HINT_PENALTY_SECONDS, h as trackShare } from "./index-D4MpbWLW.js";
import "./vendor-vU7BIIlf.js";
import "./firebase-DnFTZRb-.js";
const CompletionScreen = ({ gameStats, onPlayArchive, availablePuzzles, isLoggedIn, onShowLogin, onShowLeaderboard, userId, onClose }) => {
  const [showArchivePopup, setShowArchivePopup] = reactExports.useState(false);
  React.useEffect(() => {
    if (gameStats) {
      trackCompletionScreenView({
        moves: gameStats.moves,
        hintsUsed: gameStats.hintsUsed,
        totalTime: gameStats.totalTime || 0
      });
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.overflow = "unset";
    };
  }, [isLoggedIn]);
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1e3);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };
  const getTimeTaken = () => {
    if (!(gameStats == null ? void 0 : gameStats.totalTime)) return "0s";
    return formatTime(gameStats.totalTime);
  };
  const getTimeBreakdown = () => {
    if (!(gameStats == null ? void 0 : gameStats.baseTime) || gameStats.hintsUsed === 0) {
      return null;
    }
    const baseTimeFormatted = formatTime(gameStats.baseTime);
    return `${baseTimeFormatted} + ${gameStats.hintsUsed}×${HINT_PENALTY_SECONDS}s`;
  };
  const handleShare = async () => {
    trackCompletionScreenAction("share");
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
          title: "NHL Duo",
          text: shareText,
          url: gameUrl
        });
        trackShare(gameStatsForTracking, "native");
      } catch (error) {
        await fallbackToClipboard(shareText, gameUrl, gameStatsForTracking);
      }
    } else {
      await fallbackToClipboard(shareText, gameUrl, gameStatsForTracking);
    }
  };
  const fallbackToClipboard = async (shareText, gameUrl, gameStatsForTracking) => {
    try {
      const fullText = `${shareText}
${gameUrl}`;
      await navigator.clipboard.writeText(fullText);
      alert("Game results copied to clipboard! 📋");
      trackShare(gameStatsForTracking, "clipboard");
    } catch (error) {
      const fullText = `${shareText}
${gameUrl}`;
      alert(`Share this:

${fullText}`);
      trackShare(gameStatsForTracking, "fallback");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl max-w-xl w-full mx-auto p-6 space-y-6 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-gray-800 to-black rounded-xl p-6 text-center -mx-6 -mt-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 right-4 text-white hover:text-gray-200 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🏀" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Game Completed!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-100 text-lg font-medium", children: "Puzzle Solved!" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-4 text-center", children: "Your Performance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-blue-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Moves" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-blue-600", children: gameStats.moves })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-yellow-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Hints Used" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-yellow-600", children: gameStats.hintsUsed })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-green-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Time" }),
            gameStats.hintsUsed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mt-1", children: "+15s per hint" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: getTimeTaken() }),
            getTimeBreakdown() && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mt-1", children: getTimeBreakdown() })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      !isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            trackCompletionScreenAction("login");
            trackCTAClick("login", "completion_screen", false);
            onShowLogin();
          },
          className: "w-5/6 mx-auto px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
            "Login to See Your Rank"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            trackCompletionScreenAction("leaderboard");
            trackCTAClick("leaderboard", "completion_screen", true);
            onShowLeaderboard();
          },
          className: "w-5/6 mx-auto px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }),
            "View Leaderboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleShare,
            className: "px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5" }),
              "Share"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              trackCompletionScreenAction("archive");
              trackCTAClick("archive", "completion_screen", isLoggedIn);
              setShowArchivePopup(true);
            },
            className: "px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "w-5 h-5" }),
              "Play Archive"
            ]
          }
        )
      ] })
    ] }) }),
    showArchivePopup && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArchivePopup,
      {
        onClose: () => setShowArchivePopup(false),
        onSelectDate: (date) => {
          onPlayArchive(date);
          setShowArchivePopup(false);
        },
        availablePuzzles,
        userId
      }
    )
  ] }) });
};
export {
  CompletionScreen as default
};
