const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LeaderboardTab-C43UORhh.js","assets/react-vendor-Cxdu5FWc.js","assets/vendor-vU7BIIlf.js","assets/firebase-DnFTZRb-.js","assets/DashboardTab-DjLo4uwJ.js","assets/CompletionScreen-DjegN7SB.js","assets/AuthModal-D11GsNiE.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, R as React, X, S as Save, U as User, a as SquarePen, L as LogOut, b as LogIn, c as Undo, d as Lightbulb, e as RotateCcw, A as AlertCircle, C as Calendar, f as Check, H as HelpCircle, g as Share2, h as Archive, T as Trophy, i as createRoot } from "./react-vendor-Cxdu5FWc.js";
import { i as initializeApp, a as initializeFirestore, g as getAuth, c as connectAuthEmulator, b as connectFirestoreEmulator, o as onAuthStateChanged, G as GoogleAuthProvider, s as signInWithPopup, d as createUserWithEmailAndPassword, u as updateProfile, e as signInWithEmailAndPassword, f as signOut, q as query, h as collection, w as where, j as getDocs, l as limit, T as Timestamp, k as addDoc } from "./firebase-DnFTZRb-.js";
import "./vendor-vU7BIIlf.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/games/tennis-duo/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const firebaseConfig = {
  apiKey: "AIzaSyDxsSRpmQUt41Q_JmPEcbAPgQzUrUNXV6Q",
  authDomain: "profootballnetwork-8e365.firebaseapp.com",
  projectId: "profootballnetwork-8e365",
  storageBucket: "profootballnetwork-8e365.appspot.com",
  messagingSenderId: "317914786543",
  appId: "1:317914786543:web:e93f8a514cbbc1e761491a",
  measurementId: "G-HZWEW0N3E8"
};
const app = initializeApp(firebaseConfig);
const firestoreSettings = {
  ignoreUndefinedProperties: true
};
const db = initializeFirestore(app, firestoreSettings, "leaderboards");
const tennisDb = initializeFirestore(app, firestoreSettings, "tennis-leaderboards");
const auth = getAuth(app);
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  try {
    if (!auth._delegate._config.emulator) {
      connectAuthEmulator(auth, "http://localhost:9099");
    }
  } catch (error) {
    console.log("Auth emulator connection skipped:", error.message);
  }
  try {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      connectFirestoreEmulator(db, "localhost", 8080);
    }
  } catch (error) {
    console.log("Firestore emulator connection skipped:", error.message);
  }
}
const GA_PREFIX = "GAME.TENNIS_DUO.";
const trackEvent = (eventName, parameters) => {
  if (typeof window !== "undefined" && window.gtag) {
    const fullEventName = `${GA_PREFIX}${eventName}`;
    console.log("GA4 Event:", fullEventName, parameters);
    window.gtag("event", fullEventName, parameters);
  }
};
const trackGameStart = (puzzleType, difficulty) => {
  trackEvent("game_start", {
    puzzle_type: puzzleType,
    difficulty: difficulty || "unknown",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackGameEnd = (gameStats) => {
  trackEvent("game_end", {
    moves: gameStats.moves,
    hints_used: gameStats.hintsUsed,
    time_taken_seconds: Math.floor(gameStats.timeTaken / 1e3),
    completed: gameStats.completed,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackCellClick = (row, col, newValue, moveNumber) => {
  trackEvent("cell_click", {
    row,
    col,
    new_value: newValue || "empty",
    move_number: moveNumber
  });
};
const trackHint = (hintsUsed, row, col) => {
  trackEvent("hint_used", {
    hints_used_total: hintsUsed,
    hint_row: row,
    hint_col: col
  });
};
const trackReset = (currentMoves, currentHints) => {
  trackEvent("game_reset", {
    moves_before_reset: currentMoves,
    hints_before_reset: currentHints
  });
};
const trackShare = (gameStats, shareMethod) => {
  trackEvent("share_result", {
    moves: gameStats.moves,
    hints_used: gameStats.hintsUsed,
    time_taken_seconds: Math.floor(gameStats.timeTaken / 1e3),
    share_method: shareMethod
  });
};
const trackRuleView = () => {
  trackEvent("rules_viewed", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackArchiveView = () => {
  trackEvent("archive_viewed", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackArchivePuzzleLoad = (date, success) => {
  trackEvent("archive_puzzle_load", {
    puzzle_date: date,
    success,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackPuzzleLoad = (success, puzzleType, error) => {
  trackEvent("puzzle_load", {
    success,
    puzzle_type: puzzleType,
    error: error || null,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackTabSwitch = (fromTab, toTab) => {
  trackEvent("tab_switch", {
    from_tab: fromTab,
    to_tab: toTab,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackLeaderboardView = (puzzleDate, userLoggedIn) => {
  trackEvent("leaderboard_view", {
    puzzle_date: puzzleDate,
    user_logged_in: userLoggedIn,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackLeaderboardRankView = (userRank, totalPlayers) => {
  trackEvent("leaderboard_rank_view", {
    user_rank: userRank,
    total_players: totalPlayers,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackDashboardView = (userLoggedIn) => {
  trackEvent("dashboard_view", {
    user_logged_in: userLoggedIn,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackUserStatsView = (totalGames, currentStreak) => {
  trackEvent("user_stats_view", {
    total_games: totalGames,
    current_streak: currentStreak,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackPendingGamesClick = (pendingCount, totalAvailable) => {
  trackEvent("pending_games_click", {
    pending_count: pendingCount,
    total_available: totalAvailable,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackLogout = () => {
  trackEvent("logout", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackProfileEdit = () => {
  trackEvent("profile_edit", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackProfileUpdate = (success) => {
  trackEvent("profile_update", {
    success,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackCompletionScreenView = (gameStats) => {
  trackEvent("completion_screen_view", {
    moves: gameStats.moves,
    hints_used: gameStats.hintsUsed,
    total_time_seconds: Math.floor(gameStats.totalTime / 1e3),
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackCompletionScreenAction = (action) => {
  trackEvent("completion_screen_action", {
    action,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackCTAClick = (ctaType, location, userLoggedIn) => {
  trackEvent("cta_click", {
    cta_type: ctaType,
    location,
    user_logged_in: userLoggedIn,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackModalOpen = (modalType) => {
  trackEvent("modal_open", {
    modal_type: modalType,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const trackScoreSubmission = (success, gameStats, puzzleDate) => {
  trackEvent("score_submission", {
    success,
    moves: gameStats.moves,
    hints_used: gameStats.hintsUsed,
    total_time_seconds: Math.floor(gameStats.totalTime / 1e3),
    puzzle_date: puzzleDate,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
const useAuth = () => {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user2) => {
      setUser(user2);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };
  const signUp = async (email, password, displayName) => {
    try {
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      await result.user.reload();
      const updatedUser = auth.currentUser;
      return updatedUser || result.user;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };
  const signIn = async (email, password) => {
    try {
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };
  const logout = async () => {
    try {
      trackLogout();
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const getErrorMessage = (error) => {
    const errorCode = error.code || error.message;
    switch (errorCode) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Invalid email or password. Please check your credentials and try again.";
      case "auth/email-already-in-use":
        return "Email address already exists. Please sign in instead or use a different email.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password must be at least 6 characters long.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled. Please contact support.";
      case "auth/requires-recent-login":
        return "Please sign out and sign in again to complete this action.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with this email using a different sign-in method.";
      case "auth/credential-already-in-use":
        return "This credential is already associated with a different account.";
      case "auth/popup-closed-by-user":
        return "Sign-in was cancelled. Please try again.";
      case "auth/popup-blocked":
        return "Pop-up was blocked by your browser. Please allow pop-ups and try again.";
      case "auth/popup-blocked":
        return "Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.";
      case "auth/cancelled-popup-request":
        return "Sign-in was cancelled. Please try again.";
      case "auth/missing-email":
        return "Please enter your email address.";
      case "auth/missing-password":
        return "Please enter your password.";
      case "auth/internal-error":
        return "Something went wrong. Please try again later.";
      case "auth/too-many-requests":
        return "Too many failed sign-in attempts. Please wait a few minutes and try again.";
      case "auth/network-request-failed":
        return "Network connection error. Please check your internet connection and try again.";
      case "Password must be at least 6 characters long":
        return "Password must be at least 6 characters long.";
      default:
        if (error.message && error.message.includes("Password")) {
          return "Password must be at least 6 characters long.";
        }
        if (error.message && error.message.includes("email")) {
          return "Please check your email address and try again.";
        }
        return "An unexpected error occurred. Please try again or contact support if the problem persists.";
    }
  };
  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout
  };
};
const RacketSvgIcon = ({ className = "w-6 h-6" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      version: "1.1",
      id: "Capa_1",
      x: "0px",
      y: "0px",
      style: { enableBackground: "new 0 0 1856 2425" },
      xmlSpace: "preserve",
      viewBox: "504.52 139.48 846.84 2145.76",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#E39A46" }, d: "M915.016,1444.76c-2.88-127.094-46.765-233.491-79.212-295.315  c-18.332-5.825-36.532-13.351-54.464-22.436c25.32,40.771,93.792,164.738,97.627,317.751H915.016z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#E39A46" }, d: "M1021.792,1148.94c-32.471,61.75-76.586,168.388-79.473,295.82h36.049  c3.869-154.303,73.471-279.076,98.26-318.771C1058.583,1135.266,1040.255,1142.966,1021.792,1148.94z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#51322F" }, d: "M876.531,2034.328c-1.196,0.453-2.433,0.726-3.684,0.909v71.388l108.338-41.032  c0.603-0.228,1.228-0.355,1.848-0.515v-71.086L876.531,2034.328z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#51322F" }, d: "M876.531,1916.727c-1.196,0.453-2.433,0.726-3.684,0.908v71.387l108.338-41.031  c0.603-0.229,1.228-0.355,1.848-0.516v-71.085L876.531,1916.727z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#51322F" }, d: "M876.531,1563.92c-1.196,0.453-2.433,0.727-3.684,0.909v71.388l108.338-41.031  c0.603-0.229,1.228-0.356,1.848-0.516v-71.085L876.531,1563.92z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#51322F" }, d: "M876.531,1681.522c-1.196,0.453-2.433,0.726-3.684,0.909v71.388l108.338-41.032  c0.603-0.228,1.228-0.355,1.848-0.515v-71.086L876.531,1681.522z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#51322F" }, d: "M876.531,1799.125c-1.196,0.453-2.433,0.726-3.684,0.908v71.388l108.34-41.032  c0.603-0.228,1.228-0.355,1.846-0.515v-71.086L876.531,1799.125z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#51322F" }, d: "M872.847,2152.839v58.983h110.186v-100.227l-106.502,40.336  C875.334,2152.384,874.098,2152.657,872.847,2152.839z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#51322F" }, d: "M981.185,1477.583c0.603-0.228,1.228-0.355,1.848-0.515v-24.204H872.847v65.75L981.185,1477.583z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#E39A46" }, d: "M983.866,2219.927H872.014c-4.954,0-9.007,4.053-9.007,9.005v39.201c0,4.953,4.053,9.005,9.007,9.005  h111.852c4.952,0,9.005-4.052,9.005-9.005v-39.201C992.871,2223.979,988.818,2219.927,983.866,2219.927z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#E39A46" }, d: "M1343.255,651.899c0-278.523-129.97-504.311-415.315-504.311  c-285.347,0-415.316,225.788-415.316,504.311c0,278.525,216.37,504.312,415.316,504.312  C1126.885,1156.211,1343.255,930.423,1343.255,651.899z M927.94,1120.188c-184.736,0-385.651-209.66-385.651-468.289  c0-258.628,120.686-468.289,385.651-468.289c264.963,0,385.65,209.661,385.65,468.289  C1313.59,910.528,1112.675,1120.188,927.94,1120.188z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#282033" }, d: "M927.94,139.483c-136.342,0-247.395,52.203-321.157,150.964  c-66.903,89.577-102.265,214.565-102.265,361.452c0,132.738,47.954,261.265,135.03,361.906  c38.418,44.404,81.684,79.881,127.04,105.296c11.122,16.381,99.938,152.606,104.275,325.933c-3.511,0.888-6.123,4.044-6.123,7.832  v68.821l-3.68,1.394c-9.068,3.435-13.649,13.606-10.216,22.673l3.013,7.953c1.889,4.988,5.97,8.755,10.883,10.413v75.169  l-3.68,1.394c-9.066,3.435-13.649,13.606-10.216,22.673l3.013,7.953c1.889,4.988,5.97,8.755,10.883,10.413v75.169l-3.68,1.394  c-9.068,3.435-13.651,13.605-10.216,22.673l3.013,7.953c1.889,4.988,5.97,8.755,10.883,10.413v75.169l-3.68,1.394  c-9.068,3.435-13.649,13.606-10.216,22.673l3.013,7.953c1.889,4.988,5.97,8.754,10.883,10.412v75.17l-3.68,1.394  c-9.068,3.436-13.649,13.606-10.216,22.674l3.013,7.953c1.889,4.988,5.97,8.755,10.883,10.413v75.17l-3.68,1.394  c-9.068,3.435-13.649,13.606-10.216,22.673l3.013,7.953c1.889,4.988,5.97,8.755,10.883,10.413v61.376  c-5.794,2.744-9.839,8.603-9.839,15.427v39.201c0,9.435,7.677,17.111,17.112,17.111h111.852c9.436,0,17.111-7.676,17.111-17.111  v-39.201c0-6.825-4.044-12.684-9.839-15.428v-104.979l5.516-2.089c4.382-1.66,7.86-4.936,9.794-9.225  c1.933-4.29,2.083-9.066,0.422-13.45l-3.011-7.95c-2.119-5.596-7.001-9.633-12.721-10.896v-73.992l5.516-2.089  c4.382-1.66,7.86-4.936,9.794-9.225c1.933-4.29,2.083-9.067,0.422-13.45l-3.011-7.95c-2.119-5.596-7.001-9.633-12.721-10.897  v-73.991l5.516-2.089c4.382-1.66,7.86-4.936,9.794-9.225c1.933-4.29,2.083-9.067,0.422-13.45l-3.011-7.95  c-2.119-5.596-7.002-9.633-12.721-10.896v-73.991l5.516-2.089c4.382-1.661,7.86-4.936,9.794-9.225  c1.933-4.29,2.083-9.067,0.422-13.451l-3.011-7.95c-2.119-5.596-7.001-9.632-12.721-10.896v-73.992l5.516-2.089  c4.382-1.66,7.86-4.936,9.794-9.224c1.933-4.29,2.083-9.067,0.422-13.451l-3.011-7.95c-2.119-5.596-7.001-9.633-12.721-10.896  v-73.991l5.516-2.089c4.382-1.66,7.86-4.936,9.794-9.225c1.933-4.29,2.083-9.067,0.422-13.45l-3.011-7.95  c-2.119-5.597-7.001-9.633-12.721-10.897v-24.04c0-3.25-1.926-6.033-4.688-7.325c4.341-179.745,99.78-319.959,105.184-327.741  c44.504-25.322,86.94-60.354,124.697-103.994c87.075-100.641,135.029-229.167,135.029-361.906  c0-146.886-35.363-271.875-102.265-361.452C1175.335,191.685,1064.28,139.483,927.94,139.483z M996.071,1490.75l3.011,7.952  c1.804,4.761-0.616,10.132-5.378,11.935l-120.124,45.495c-1.069,0.406-2.17,0.598-3.255,0.598c-3.739,0-7.281-2.284-8.679-5.975  l-3.013-7.952c-1.803-4.761,0.618-10.132,5.378-11.936l120.123-45.495c1.071-0.405,2.171-0.598,3.255-0.598  C991.131,1484.774,994.673,1487.059,996.071,1490.75z M996.071,1608.352l3.011,7.952c1.804,4.761-0.616,10.132-5.378,11.935  l-120.124,45.495c-1.069,0.405-2.17,0.597-3.255,0.597c-3.739,0-7.281-2.284-8.679-5.975l-3.013-7.952  c-1.803-4.762,0.618-10.132,5.378-11.936l120.123-45.495c1.071-0.405,2.171-0.597,3.255-0.597  C991.131,1602.377,994.673,1604.661,996.071,1608.352z M996.071,1725.954l3.011,7.952c1.804,4.761-0.616,10.132-5.378,11.936  l-120.124,45.495c-1.069,0.405-2.17,0.598-3.255,0.598c-3.739,0-7.281-2.284-8.679-5.976l-3.013-7.952  c-1.803-4.761,0.618-10.132,5.378-11.935l120.123-45.495c1.071-0.405,2.171-0.597,3.255-0.597  C991.131,1719.979,994.673,1722.263,996.071,1725.954z M996.071,1843.556l3.011,7.952c1.804,4.761-0.616,10.132-5.378,11.935  l-120.124,45.495c-1.069,0.405-2.17,0.597-3.253,0.597c-3.741,0-7.283-2.284-8.68-5.975l-3.013-7.952  c-1.803-4.761,0.618-10.132,5.378-11.935l120.123-45.495c1.069-0.406,2.171-0.597,3.255-0.597  C991.131,1837.581,994.673,1839.865,996.071,1843.556z M996.071,1961.159l3.011,7.952c1.804,4.761-0.616,10.132-5.378,11.935  l-120.124,45.495c-1.069,0.405-2.17,0.597-3.255,0.597c-3.739,0-7.281-2.284-8.679-5.975l-3.013-7.952  c-1.803-4.761,0.618-10.132,5.378-11.936l120.123-45.495c1.071-0.406,2.171-0.598,3.255-0.598  C991.131,1955.183,994.673,1957.467,996.071,1961.159z M996.071,2078.76l3.011,7.952c1.804,4.761-0.616,10.132-5.378,11.935  l-120.124,45.495c-1.069,0.405-2.17,0.597-3.255,0.597c-3.739,0-7.281-2.284-8.679-5.975l-3.013-7.952  c-1.803-4.761,0.618-10.132,5.378-11.935l120.123-45.495c1.071-0.405,2.171-0.597,3.255-0.597  C991.131,2072.785,994.673,2075.069,996.071,2078.76z M992.871,2268.133c0,4.953-4.053,9.005-9.005,9.005H872.014  c-4.954,0-9.007-4.052-9.007-9.005v-39.201c0-4.953,4.053-9.005,9.007-9.005h111.852c4.952,0,9.005,4.053,9.005,9.005V2268.133z   M983.032,2211.822H872.847v-58.983c1.251-0.183,2.487-0.456,3.684-0.908l106.502-40.336V2211.822z M981.185,2065.594  l-108.338,41.032v-71.388c1.251-0.183,2.487-0.456,3.684-0.909l106.502-40.336v71.086  C982.413,2065.238,981.788,2065.365,981.185,2065.594z M981.185,1947.992l-108.338,41.031v-71.387  c1.251-0.182,2.487-0.456,3.684-0.908l106.502-40.336v71.085C982.413,1947.636,981.788,1947.763,981.185,1947.992z   M981.187,1830.389l-108.34,41.032v-71.388c1.251-0.182,2.487-0.456,3.684-0.908l106.502-40.336v71.086  C982.414,1830.034,981.789,1830.161,981.187,1830.389z M981.185,1712.788l-108.338,41.032v-71.388  c1.251-0.183,2.487-0.456,3.684-0.909l106.502-40.336v71.086C982.413,1712.432,981.788,1712.56,981.185,1712.788z M981.185,1595.186  l-108.338,41.031v-71.388c1.251-0.182,2.487-0.456,3.684-0.909l106.502-40.335v71.085  C982.413,1594.83,981.788,1594.957,981.185,1595.186z M846.539,1152.608c27.12,7.631,54.422,11.707,81.401,11.707  c27.55,0,55.437-4.262,83.122-12.214c-32.476,63.48-74.064,168.305-76.852,292.659h-11.088  C920.344,1320.73,878.975,1216.134,846.539,1152.608z M835.803,1149.445c32.448,61.824,76.332,168.22,79.212,295.315h-36.05  c-3.834-153.013-72.307-276.98-97.627-317.751C799.271,1136.094,817.472,1143.62,835.803,1149.445z M872.847,1452.864h110.186  v24.204c-0.62,0.16-1.245,0.287-1.848,0.515l-108.338,41.031V1452.864z M942.319,1444.76c2.887-127.431,47.002-234.07,79.473-295.82  c18.462-5.974,36.791-13.674,54.836-22.951c-24.789,39.695-94.391,164.469-98.26,318.771H942.319z M927.94,1156.211  c-198.946,0-415.316-225.787-415.316-504.312c0-278.523,129.969-504.311,415.316-504.311c285.345,0,415.315,225.788,415.315,504.311  C1343.255,930.423,1126.885,1156.211,927.94,1156.211z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#282033" }, d: "M1313.59,651.899c0-258.628-120.686-468.289-385.65-468.289  c-264.965,0-385.651,209.661-385.651,468.289c0,258.629,200.915,468.289,385.651,468.289  C1112.675,1120.188,1313.59,910.528,1313.59,651.899z M550.395,651.899c0-8.352,0.146-16.583,0.383-24.738h37.996v48.815h-37.759  C550.626,667.97,550.395,659.946,550.395,651.899z M654.365,309.317h40.357v48.815h-48.47v-38.88  C648.905,315.88,651.607,312.564,654.365,309.317z M708.14,258.793h39.554v46.365h-48.469v-39.456  C702.163,263.353,705.122,261.034,708.14,258.793z M1305.484,651.899c0,8.047-0.232,16.071-0.621,24.077h-22.926v-48.815h23.166  C1305.338,635.316,1305.484,643.547,1305.484,651.899z M1270.409,834.897h-41.445v-48.815h48.469v29.978  C1275.218,822.387,1272.878,828.665,1270.409,834.897z M1123.016,993.819v-48.815h48.469v46.456  c-0.734,0.784-1.457,1.583-2.196,2.359H1123.016z M1165.176,997.978c-13.488,13.833-27.579,26.6-42.159,38.146v-38.146H1165.176z   M809.606,208.27h44.037v46.364h-48.469v-45.097C806.628,209.08,808.14,208.71,809.606,208.27z M959.59,468.238v48.815  l-48.469-0.001v-48.815H959.59z M911.12,464.08v-48.815h48.469v48.815H911.12z M959.59,574.187v48.815l-48.469-0.001v-48.815H959.59  z M911.12,570.028v-48.815l48.469,0.001v48.815H911.12z M964.094,627.161h48.471v48.815h-48.471V627.161z M959.59,675.976  l-48.469-0.001V627.16l48.469,0.001V675.976z M964.094,623.002v-48.815h48.471v48.815H964.094z M906.617,623.001h-48.47v-48.815  h48.47V623.001z M906.617,627.16v48.815h-48.47V627.16H906.617z M906.617,680.134v48.815h-48.47v-48.815H906.617z M911.12,680.134  l48.469,0.001v48.815H911.12V680.134z M959.59,733.108v48.815H911.12v-48.815H959.59z M964.094,733.108h48.471v48.815h-48.471  V733.108z M964.094,728.949v-48.815h48.471v48.815H964.094z M1017.068,680.135h48.469v48.815h-48.469V680.135z M1017.068,675.976  v-48.815h48.469v48.815H1017.068z M1017.068,623.002v-48.815h48.469v48.815H1017.068z M1017.068,570.028v-48.815h48.469v48.815  H1017.068z M1012.565,570.028h-48.471v-48.815h48.471V570.028z M964.094,517.054v-48.815h48.471v48.815H964.094z M906.617,517.053  h-48.47v-48.815h48.47V517.053z M906.617,521.212v48.815h-48.47v-48.815H906.617z M853.642,570.028h-48.469v-48.815h48.469V570.028z   M853.642,574.187v48.815h-48.469v-48.815H853.642z M800.669,623.001h-48.471v-48.815h48.471V623.001z M800.669,627.16v48.815  h-48.471V627.16H800.669z M805.173,627.16h48.469v48.815h-48.469V627.16z M853.642,680.134v48.815h-48.469v-48.815H853.642z   M853.642,733.108v48.815h-48.469v-48.815H853.642z M858.146,733.108h48.47v48.815h-48.47V733.108z M906.617,786.082v48.815h-48.47  v-48.815H906.617z M911.12,786.082l48.469,0.001v48.815l-48.469-0.001V786.082z M964.094,786.083h48.471v48.815h-48.471V786.083z   M1017.068,786.083h48.469v48.815h-48.469V786.083z M1017.068,781.923v-48.815h48.469v48.815H1017.068z M1070.042,733.108h48.471  v48.815h-48.471V733.108z M1070.042,728.949v-48.815h48.471v48.815H1070.042z M1070.042,675.976v-48.815h48.471v48.815H1070.042z   M1123.016,627.161h48.469v48.815h-48.469V627.161z M1123.016,623.002v-48.815h48.469v48.815H1123.016z M1118.512,623.002h-48.471  v-48.815h48.471V623.002z M1070.042,570.028v-48.815h48.471v48.815H1070.042z M1070.042,517.054v-48.815h48.471v48.815H1070.042z   M1065.538,517.054h-48.469v-48.815h48.469V517.054z M1017.068,464.08v-48.815h48.469v48.815H1017.068z M1012.565,464.08h-48.471  v-48.815h48.471V464.08z M964.094,411.106v-48.815h48.471v48.815H964.094z M959.59,411.106H911.12v-48.815h48.469V411.106z   M906.617,411.106h-48.47v-48.815h48.47V411.106z M906.617,415.265v48.815h-48.47v-48.815H906.617z M853.642,464.08h-48.469v-48.815  h48.469V464.08z M853.642,468.238v48.815h-48.469v-48.815H853.642z M800.669,517.053h-48.471v-48.815h48.471V517.053z   M800.669,521.212v48.815h-48.471v-48.815H800.669z M747.694,570.028h-48.469v-48.815h48.469V570.028z M747.694,574.187v48.815  h-48.469v-48.815H747.694z M747.694,627.16v48.815h-48.469V627.16H747.694z M747.694,680.134v48.815h-48.469v-48.815H747.694z   M752.198,680.134h48.471v48.815h-48.471V680.134z M800.669,733.108v48.815h-48.471v-48.815H800.669z M800.669,786.082v48.815  h-48.471v-48.815H800.669z M805.173,786.082h48.469v48.815h-48.469V786.082z M853.642,839.056v48.815h-48.469v-48.815H853.642z   M858.146,839.056h48.47v48.815h-48.47V839.056z M906.617,892.029v48.815h-48.47v-48.815H906.617z M911.12,892.03h48.469v48.815  H911.12V892.03z M911.12,887.871v-48.815l48.469,0.001v48.815H911.12z M964.094,839.056h48.471v48.815h-48.471V839.056z   M1017.068,839.056h48.469v48.815h-48.469V839.056z M1070.042,839.056h48.471v48.815h-48.471V839.056z M1070.042,834.897v-48.815  h48.471v48.815H1070.042z M1123.016,786.083h48.469v48.815h-48.469V786.083z M1123.016,781.923v-48.815h48.469v48.815H1123.016z   M1123.016,728.949v-48.815h48.469v48.815H1123.016z M1175.99,680.135h48.47v48.815h-48.47V680.135z M1175.99,675.976v-48.815h48.47  v48.815H1175.99z M1175.99,623.002v-48.815h48.47v48.815H1175.99z M1175.99,570.028v-48.815h48.47v48.815H1175.99z   M1171.486,570.028h-48.469v-48.815h48.469V570.028z M1123.016,517.054v-48.815h48.469v48.815H1123.016z M1123.016,464.08v-48.815  h48.469v48.815H1123.016z M1118.512,464.08h-48.471v-48.815h48.471V464.80z M1070.042,411.106v-48.815h48.471v48.815H1070.042z   M1065.538,411.106h-48.469v-48.815h48.469V411.106z M1017.068,358.132v-48.815h48.469v48.815H1017.068z M1012.565,358.132h-48.471  v-48.815h48.471V358.132z M959.59,358.132H911.12v-48.815h48.469V358.132z M911.12,305.158v-46.365h48.469v46.365H911.12z   M906.617,305.158h-48.47v-46.365h48.47V305.158z M906.617,309.317v48.815h-48.47v-48.815H906.617z M853.642,358.132h-48.469  v-48.815h48.469V358.132z M853.642,362.291v48.815h-48.469v-48.815H853.642z M800.669,411.106h-48.471v-48.815h48.471V411.106z   M800.669,415.265v48.815h-48.471v-48.815H800.669z M747.694,464.80h-48.469v-48.815h48.469V464.80z M747.694,468.238v48.815  h-48.469v-48.815H747.694z M694.721,517.053h-48.47v-48.815h48.47V517.053z M694.721,521.212v48.815h-48.47v-48.815H694.721z   M694.721,574.187v48.815h-48.47v-48.815H694.721z M694.721,627.16v48.815h-48.47V627.16H694.721z M694.721,680.134v48.815h-48.47  v-48.815H694.721z M694.721,733.108v48.815h-48.47v-48.815H694.721z M699.225,733.108h48.469v48.815h-48.469V733.108z   M747.694,786.082v48.815h-48.469v-48.815H747.694z M747.694,839.056v48.815h-48.469v-48.815H747.694z M752.198,839.056h48.471  v48.815h-48.471V839.056z M800.669,892.029v48.815h-48.471v-48.815H800.669z M805.173,892.029h48.469v48.815h-48.469V892.029z   M853.642,945.004v48.815h-48.469v-48.815H853.642z M858.146,945.004h48.47v48.815h-48.47V945.004z M911.12,945.004h48.469v48.815  H911.12V945.004z M964.094,945.004h48.471v48.815h-48.471V945.004z M964.094,940.845V892.03h48.471v48.815H964.094z   M1017.068,892.03h48.469v48.815h-48.469V892.03z M1070.042,892.03h48.471v48.815h-48.471V892.03z M1123.016,892.03h48.469v48.815  h-48.469V892.03z M1123.016,887.871v-48.815h48.469v48.815H1123.016z M1175.99,839.056h48.47v48.815h-48.47V839.056z   M1175.99,834.897v-48.815h48.47v48.815H1175.99z M1175.99,781.923v-48.815h48.47v48.815H1175.99z M1228.964,733.108h48.469v48.815  h-48.469V733.108z M1228.964,728.949v-48.815h48.469v48.815H1228.964z M1228.964,675.976v-48.815h48.469v48.815H1228.964z   M1228.964,623.002v-48.815h48.469v48.815H1228.964z M1228.964,570.028v-48.815h48.469v48.815H1228.964z M1228.964,517.054v-48.815  h48.469v48.815H1228.964z M1224.46,517.054h-48.47v-48.815h48.47V517.054z M1175.99,464.80v-48.815h48.47v48.815H1175.99z   M1175.99,411.106v-48.815h48.47v48.815H1175.99z M1171.486,411.106h-48.469v-48.815h48.469V411.106z M1123.016,358.132v-48.815  h48.469v48.815H1123.016z M1118.512,358.132h-48.471v-48.815h48.471V358.132z M1070.042,305.158v-46.365h48.471v46.365H1070.042z   M1065.538,305.158h-48.469v-46.365h48.469V305.158z M1012.565,305.158h-48.471v-46.365h48.471V305.158z M964.094,254.634V208.27  h48.471v46.364H964.094z M959.59,254.634H911.12V208.27h48.469V254.634z M906.617,254.634h-48.47V208.27h48.47V254.634z   M853.642,258.793v46.365h-48.469v-46.365H853.642z M800.669,305.158h-48.471v-46.365h48.471V305.158z M800.669,309.317v48.815  h-48.471v-48.815H800.669z M747.694,358.132h-48.469v-48.815h48.469V358.132z M747.694,362.291v48.815h-48.469v-48.815H747.694z   M694.721,411.106h-48.47v-48.815h48.47V411.106z M694.721,415.265v48.815h-48.47v-48.815H694.721z M641.747,464.80h-48.469v-48.815  h48.469V464.80z M641.747,468.238v48.815h-48.469v-48.815H641.747z M641.747,521.212v48.815h-48.469v-48.815H641.747z   M641.747,574.187v48.815h-48.469v-48.815H641.747z M641.747,627.16v48.815h-48.469V627.16H641.747z M641.747,680.134v48.815  h-48.469v-48.815H641.747z M641.747,733.108v48.815h-48.469v-48.815H641.747z M641.747,786.082v48.815h-48.469v-48.815H641.747z   M646.251,786.082h48.47v48.815h-48.47V786.082z M694.721,839.056v48.815h-48.47v-48.815H694.721z M694.721,892.029v48.815h-48.47  v-48.815H694.721z M699.225,892.029h48.469v48.815h-48.469V892.029z M747.694,945.004v48.815h-48.469v-48.815H747.694z   M752.198,945.004h48.471v48.815h-48.471V945.004z M800.669,997.978v48.086h-48.471v-48.086H800.669z M805.173,997.978h48.469  v48.086h-48.469V997.978z M858.146,997.978h48.47v48.086h-48.47V997.978z M911.12,997.978h48.469v48.087l-48.469-0.001V997.978z   M964.094,997.978h48.471v48.087h-48.471V997.978z M1017.068,997.978h48.469v48.087h-48.469V997.978z M1017.068,993.819v-48.815  h48.469v48.815H1017.068z M1070.042,945.004h48.471v48.815h-48.471V945.004z M1175.99,986.482v-41.478h33.851  c-8.172,11.216-16.786,22.156-25.929,32.723C1181.32,980.721,1178.637,983.574,1175.99,986.482z M1175.99,940.845V892.03h48.47  v31.871c-3.737,5.725-7.625,11.362-11.604,16.944H1175.99z M1228.964,892.03h14.534c-4.599,8.342-9.452,16.551-14.534,24.636V892.03  z M1228.964,887.871v-48.815h39.788c-6.765,16.645-14.369,32.956-22.915,48.815H1228.964z M1281.937,786.083h5.015  c-1.577,5.618-3.242,11.21-5.015,16.766V786.083z M1281.937,781.923v-48.815h16.745c-2.732,16.46-6.212,32.76-10.567,48.815  H1281.937z M1281.937,728.949v-48.815h22.645c-0.936,16.399-2.705,32.681-5.242,48.815H1281.937z M1281.937,623.002v-48.815h19.881  c1.547,15.838,2.582,32.129,3.148,48.815H1281.937z M1281.937,570.028v-48.815h12.557c2.822,15.776,5.114,32.047,6.851,48.815  H1281.937z M1281.937,517.054v-48.815h0.507c4.359,15.681,8.118,31.953,11.254,48.815H1281.937z M1277.433,464.80h-48.469v-48.815  h35.628c4.688,11.584,8.938,23.624,12.842,36.019V464.80z M1228.964,411.106v-48.815h9.899  c8.861,15.303,16.804,31.639,23.958,48.815H1228.964z M1228.964,358.132v-11.964c2.527,3.904,4.955,7.923,7.362,11.964H1228.964z   M1224.46,358.132h-48.47v-48.815h25.525c8.098,9.53,15.747,19.607,22.946,30.214V358.132z M1175.99,305.158v-22.713  c7.625,7.165,14.92,14.751,21.913,22.713H1175.99z M1171.486,305.158h-48.469v-46.365h24.723  c8.221,6.106,16.124,12.636,23.746,19.533V305.158z M1123.016,254.634v-12.482c6.481,3.927,12.773,8.116,18.937,12.482H1123.016z   M1118.512,254.634h-48.471v-38.351c16.997,6.478,33.156,14.22,48.471,23.159V254.634z M1065.538,214.656v39.978h-48.469V208.27  h29.205C1052.803,210.231,1059.229,212.353,1065.538,214.656z M1017.068,204.111v-3.302c4.892,1.042,9.786,2.082,14.568,3.302  H1017.068z M1012.565,204.111h-48.471v-10.89c16.675,1.312,32.875,3.443,48.471,6.568V204.111z M959.59,204.111H911.12V192.1  c5.568-0.198,11.142-0.386,16.82-0.386c10.773,0,21.276,0.48,31.649,1.19V204.111z M906.617,204.111h-48.47v-6.9  c15.657-2.517,31.783-4.252,48.47-5.007V204.111z M853.642,204.111h-29.399c9.556-2.437,19.405-4.4,29.399-6.126V204.111z   M800.669,254.634h-48.471v-23.387c15.354-7.906,31.558-14.579,48.471-20.155V254.634z M747.694,254.634h-33.767  c10.776-7.634,22.027-14.619,33.767-20.903V254.634z M694.721,305.158h-36.744c11.41-12.993,23.661-24.942,36.744-35.799V305.158z   M641.747,358.132h-22.195c6.908-11.592,14.314-22.613,22.195-33.068V358.132z M641.747,362.291v48.815h-48.469v-0.513  c7.097-16.986,14.966-33.153,23.738-48.302H641.747z M588.774,464.80h-14.192c4.205-14.661,8.931-28.797,14.192-42.378V464.80z   M588.774,468.238v48.815h-26.592c3.136-16.862,6.894-33.134,11.253-48.815H588.774z M588.774,521.212v48.815h-34.24  c1.738-16.767,4.029-33.039,6.853-48.815H588.774z M588.774,574.187v48.815h-37.861c0.567-16.686,1.6-32.977,3.148-48.815H588.774z   M588.774,680.134v48.815h-32.234c-2.537-16.134-4.308-32.417-5.242-48.815H588.774z M588.774,733.108v48.815h-21.009  c-4.355-16.055-7.835-32.355-10.567-48.815H588.774z M588.774,786.082v48.815h-3.304c-6.331-15.983-11.895-32.258-16.543-48.815  H588.774z M588.774,839.056v4.131c-0.571-1.369-1.088-2.757-1.647-4.131H588.774z M593.278,839.056h48.469v48.815h-31.704  c-6.053-11.234-11.6-22.709-16.765-34.35V839.056z M641.747,892.029v46.956c-10.69-15.138-20.472-30.821-29.365-46.956H641.747z   M646.251,945.004h48.47v48.815h-8.133c-4.962-5.222-9.846-10.575-14.62-16.093c-9.065-10.478-17.606-21.326-25.717-32.442V945.004z   M694.721,997.978v4.061c-1.345-1.345-2.685-2.695-4.018-4.061H694.721z M699.225,997.978h48.469v48.086h-1.86  c-16.098-11.757-31.698-24.97-46.61-39.473V997.978z M752.198,1050.223h48.471v29.298c-16.461-8.237-32.673-17.944-48.471-29.03  V1050.223z M805.173,1081.738v-31.515h48.469v50.404C837.403,1095.791,821.196,1089.474,805.173,1081.738z M858.146,1050.223h48.47  v60.771c-16.036-1.447-32.245-4.459-48.47-9.013V1050.223z M911.12,1050.223l48.469,0.001v59.692  c-10.63,1.405-21.201,2.168-31.649,2.168c-5.576,0-11.185-0.215-16.82-0.619V1050.223z M964.094,1050.223h48.471v47.224  c-16.167,5.448-32.379,9.379-48.471,11.795V1050.223z M1017.068,1050.223h48.469v23.943c-15.963,8.641-32.175,15.87-48.469,21.64  V1050.223z M1070.042,1050.223h34.025c-11.152,7.844-22.512,14.991-34.025,21.432V1050.223z M1070.042,1046.064v-48.087h48.471  v41.598c-2.819,2.172-5.616,4.406-8.468,6.489H1070.042z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#936865" }, d: "M987.39,1484.774c-1.084,0-2.184,0.192-3.255,0.598l-120.123,45.495  c-4.76,1.804-7.181,7.174-5.378,11.936l3.013,7.952c1.398,3.691,4.94,5.975,8.679,5.975c1.085,0,2.186-0.192,3.255-0.598  l120.124-45.495c4.762-1.803,7.182-7.174,5.378-11.935l-3.011-7.952C994.673,1487.059,991.131,1484.774,987.39,1484.774z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#936865" }, d: "M987.39,1602.377c-1.084,0-2.184,0.192-3.255,0.597l-120.123,45.495  c-4.76,1.803-7.181,7.174-5.378,11.936l3.013,7.952c1.398,3.691,4.94,5.975,8.679,5.975c1.085,0,2.186-0.192,3.255-0.597  l120.124-45.495c4.762-1.803,7.182-7.174,5.378-11.935l-3.011-7.952C994.673,1604.661,991.131,1602.377,987.39,1602.377z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#936865" }, d: "M987.39,1719.979c-1.084,0-2.184,0.192-3.255,0.597l-120.123,45.495  c-4.76,1.803-7.181,7.174-5.378,11.935l3.013,7.952c1.398,3.691,4.94,5.976,8.679,5.976c1.085,0,2.186-0.192,3.255-0.598  l120.124-45.495c4.762-1.803,7.182-7.174,5.378-11.936l-3.011-7.952C994.673,1722.263,991.131,1719.979,987.39,1719.979z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#936865" }, d: "M987.39,1837.581c-1.084,0-2.186,0.192-3.255,0.597l-120.123,45.495  c-4.76,1.803-7.181,7.174-5.378,11.935l3.013,7.952c1.398,3.691,4.94,5.975,8.68,5.975c1.083,0,2.184-0.192,3.253-0.597  l120.124-45.495c4.762-1.803,7.182-7.174,5.378-11.935l-3.011-7.952C994.673,1839.865,991.131,1837.581,987.39,1837.581z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#936865" }, d: "M987.39,1955.183c-1.084,0-2.184,0.192-3.255,0.598l-120.123,45.495  c-4.76,1.803-7.181,7.174-5.378,11.936l3.013,7.952c1.398,3.691,4.94,5.975,8.679,5.975c1.085,0,2.186-0.192,3.255-0.597  l120.124-45.495c4.762-1.803,7.182-7.174,5.378-11.935l-3.011-7.952C994.673,1957.467,991.131,1955.183,987.39,1955.183z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { style: { fill: "#936865" }, d: "M987.39,2072.785c-1.084,0-2.184,0.192-3.255,0.597l-120.123,45.495  c-4.76,1.803-7.181,7.174-5.378,11.935l3.013,7.952c1.398,3.691,4.94,5.975,8.679,5.975c1.085,0,2.186-0.192,3.255-0.597  l120.124-45.495c4.762-1.803,7.182-7.174,5.378-11.935l-3.011-7.952C994.673,2075.069,991.131,2072.785,987.39,2072.785z" })
      ]
    }
  );
};
const HINT_PENALTY_SECONDS = 15;
const validateGrid = (grid, constraints) => {
  const violations = /* @__PURE__ */ new Set();
  const messages = [];
  const size = grid.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size - 2; col++) {
      const cell1 = grid[row][col];
      const cell2 = grid[row][col + 1];
      const cell3 = grid[row][col + 2];
      if (cell1.value && cell2.value && cell3.value && cell1.value === cell2.value && cell2.value === cell3.value) {
        const symbol = cell1.value === "ball" ? `3 consecutive 🎾 in row ${row + 1}` : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "3 consecutive ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-4 h-4 align-middle mx-1" }),
          " in row ",
          row + 1
        ] });
        messages.push(symbol);
        violations.add(`${row},${col}`);
        violations.add(`${row},${col + 1}`);
        violations.add(`${row},${col + 2}`);
      }
    }
  }
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size - 2; row++) {
      const cell1 = grid[row][col];
      const cell2 = grid[row + 1][col];
      const cell3 = grid[row + 2][col];
      if (cell1.value && cell2.value && cell3.value && cell1.value === cell2.value && cell2.value === cell3.value) {
        const symbol = cell1.value === "ball" ? `3 consecutive 🎾 in column ${col + 1}` : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "3 consecutive ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-4 h-4 align-middle mx-1" }),
          " in column ",
          col + 1
        ] });
        messages.push(symbol);
        violations.add(`${row},${col}`);
        violations.add(`${row + 1},${col}`);
        violations.add(`${row + 2},${col}`);
      }
    }
  }
  for (let row = 0; row < size; row++) {
    const rowCells = grid[row].filter((cell) => cell.value !== null);
    const balls = rowCells.filter((cell) => cell.value === "ball").length;
    const rackets = rowCells.filter((cell) => cell.value === "racket").length;
    if (rowCells.length === size && balls !== rackets) {
      const ballCount = balls;
      const racketCount = rackets;
      if (ballCount > racketCount) {
        messages.push(`${ballCount} 🎾 in row ${row + 1} (should be ${size / 2})`);
      } else {
        messages.push(/* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          racketCount,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-4 h-4 align-middle mx-1" }),
          " in row ",
          row + 1,
          " (should be ",
          size / 2,
          ")"
        ] }));
      }
      for (let col = 0; col < size; col++) {
        violations.add(`${row},${col}`);
      }
    }
  }
  for (let col = 0; col < size; col++) {
    const colCells = grid.map((row) => row[col]).filter((cell) => cell.value !== null);
    const balls = colCells.filter((cell) => cell.value === "ball").length;
    const rackets = colCells.filter((cell) => cell.value === "racket").length;
    if (colCells.length === size && balls !== rackets) {
      const ballCount = balls;
      const racketCount = rackets;
      if (ballCount > racketCount) {
        messages.push(`${ballCount} 🎾 in column ${col + 1} (should be ${size / 2})`);
      } else {
        messages.push(/* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          racketCount,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-4 h-4 align-middle mx-1" }),
          " in column ",
          col + 1,
          " (should be ",
          size / 2,
          ")"
        ] }));
      }
      for (let row = 0; row < size; row++) {
        violations.add(`${row},${col}`);
      }
    }
  }
  constraints.forEach((constraint) => {
    const [r1, c1] = constraint.cell1;
    const [r2, c2] = constraint.cell2;
    const cell1 = grid[r1][c1];
    const cell2 = grid[r2][c2];
    if (cell1.value && cell2.value) {
      if (constraint.type === "equal" && cell1.value !== cell2.value) {
        messages.push(`Cells with = should be the same`);
        violations.add(`${r1},${c1}`);
        violations.add(`${r2},${c2}`);
      } else if (constraint.type === "different" && cell1.value === cell2.value) {
        messages.push(`Cells with × should be different`);
        violations.add(`${r1},${c1}`);
        violations.add(`${r2},${c2}`);
      }
    }
  });
  return { violations, messages };
};
const isGameCompleteAndValid = (grid, constraints) => {
  const size = grid.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!grid[row][col].value) return false;
    }
  }
  const { violations } = validateGrid(grid, constraints);
  return violations.size === 0;
};
const getNextValue = (current) => {
  if (current === null) return "ball";
  if (current === "ball") return "racket";
  return null;
};
const getHint = (grid, solution) => {
  const size = grid.length;
  const emptyCells = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!grid[row][col].value && !grid[row][col].isFixed) {
        emptyCells.push([row, col]);
      }
    }
  }
  if (emptyCells.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};
const useGameState = (dailyPuzzleData) => {
  const [gameState, setGameState] = reactExports.useState({
    grid: [],
    constraints: [],
    size: 6,
    isComplete: false,
    violations: /* @__PURE__ */ new Set(),
    violationMessages: []
  });
  const [gameStats, setGameStats] = reactExports.useState({
    moves: 0,
    hintsUsed: 0,
    startTime: Date.now(),
    endTime: void 0,
    baseTime: void 0,
    penaltyTime: void 0,
    totalTime: void 0,
    scoreSubmitted: false
  });
  const [showWinAnimation, setShowWinAnimation] = reactExports.useState(false);
  const [solution, setSolution] = reactExports.useState([]);
  const [history, setHistory] = reactExports.useState([]);
  const initializeGame = reactExports.useCallback(() => {
    if (!dailyPuzzleData) return;
    const grid = Array(dailyPuzzleData.size).fill(null).map(
      (_, row) => Array(dailyPuzzleData.size).fill(null).map((_2, col) => ({
        value: null,
        isFixed: false,
        row,
        col
      }))
    );
    dailyPuzzleData.preFilledCells.forEach(
      ({ row, col, value }) => {
        grid[row][col].value = value;
        grid[row][col].isFixed = true;
      }
    );
    const { violations, messages } = validateGrid(grid, dailyPuzzleData.constraints);
    setGameState({
      grid,
      constraints: dailyPuzzleData.constraints,
      size: dailyPuzzleData.size,
      isComplete: false,
      violations,
      violationMessages: messages
    });
    setSolution(dailyPuzzleData.solution);
    setHistory([]);
    setGameStats({
      moves: 0,
      hintsUsed: 0,
      startTime: Date.now(),
      endTime: void 0,
      baseTime: void 0,
      penaltyTime: void 0,
      totalTime: void 0,
      scoreSubmitted: false
    });
  }, [dailyPuzzleData]);
  const makeMove = reactExports.useCallback((row, col) => {
    var _a, _b;
    if (((_b = (_a = gameState.grid[row]) == null ? void 0 : _a[col]) == null ? void 0 : _b.isFixed) || gameState.isComplete) return;
    setHistory((prev) => [...prev, {
      grid: gameState.grid.map((row2) => row2.map((cell) => ({ ...cell }))),
      moves: gameStats.moves
    }]);
    setGameState((prev) => {
      const newGrid = prev.grid.map(
        (gridRow, r) => gridRow.map((cell, c) => {
          if (r === row && c === col) {
            return { ...cell, value: getNextValue(cell.value) };
          }
          return cell;
        })
      );
      const { violations, messages } = validateGrid(newGrid, prev.constraints);
      const complete = isGameCompleteAndValid(newGrid, prev.constraints);
      return {
        ...prev,
        grid: newGrid,
        violations,
        violationMessages: messages,
        isComplete: complete
      };
    });
    setGameStats((prev) => ({ ...prev, moves: prev.moves + 1 }));
  }, [gameState.grid, gameState.constraints, gameState.isComplete, gameStats.moves]);
  const useHint = reactExports.useCallback(() => {
    if (gameState.isComplete) return;
    const hint = getHint(gameState.grid);
    if (!hint) return;
    const [hintRow, hintCol] = hint;
    const hintValue = solution[hintRow][hintCol];
    setHistory((prev) => [...prev, {
      grid: gameState.grid.map((row) => row.map((cell) => ({ ...cell }))),
      moves: gameStats.moves
    }]);
    setGameState((prev) => {
      const newGrid = prev.grid.map(
        (row, r) => row.map((cell, c) => {
          if (r === hintRow && c === hintCol) {
            return { ...cell, value: hintValue };
          }
          return cell;
        })
      );
      const { violations, messages } = validateGrid(newGrid, prev.constraints);
      const complete = isGameCompleteAndValid(newGrid, prev.constraints);
      return {
        ...prev,
        grid: newGrid,
        violations,
        violationMessages: messages,
        isComplete: complete
      };
    });
    setGameStats((prev) => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
  }, [gameState.grid, gameState.isComplete, solution, gameStats.moves]);
  const undoMove = reactExports.useCallback(() => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    const { violations, messages } = validateGrid(lastState.grid, gameState.constraints);
    const complete = isGameCompleteAndValid(lastState.grid, gameState.constraints);
    setGameState((prev) => ({
      ...prev,
      grid: lastState.grid,
      violations,
      violationMessages: messages,
      isComplete: complete
    }));
    setGameStats((prev) => ({ ...prev, moves: lastState.moves }));
  }, [history, gameState.constraints]);
  reactExports.useEffect(() => {
    if (gameState.isComplete && gameStats.endTime === void 0) {
      setShowWinAnimation(true);
      const endTime = Date.now();
      const baseTime = endTime - gameStats.startTime;
      const penaltyTime = gameStats.hintsUsed * HINT_PENALTY_SECONDS * 1e3;
      const totalTime = baseTime + penaltyTime;
      setGameStats((prev) => ({
        ...prev,
        endTime,
        baseTime,
        penaltyTime,
        totalTime
      }));
      setTimeout(() => {
        setShowWinAnimation(false);
      }, 1200);
    }
  }, [gameState.isComplete, gameStats.startTime, gameStats.hintsUsed, gameStats.endTime]);
  const resetGame = reactExports.useCallback(() => {
    setShowWinAnimation(false);
    initializeGame();
  }, [initializeGame]);
  reactExports.useEffect(() => {
    if (dailyPuzzleData) {
      setShowWinAnimation(false);
      initializeGame();
      setHistory([]);
    }
  }, [dailyPuzzleData, initializeGame]);
  const canUndo = history.length > 0;
  return {
    gameState,
    gameStats,
    violations: gameState.violations,
    violationMessages: gameState.violationMessages,
    isComplete: gameState.isComplete,
    showWinAnimation,
    canUndo,
    makeMove,
    undoMove,
    useHint,
    resetGame,
    initializeGame
  };
};
const useLeaderboard = () => {
  const [currentLeaderboard, setCurrentLeaderboard] = reactExports.useState([]);
  const [currentDate, setCurrentDate] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const calculateScore = (moves, totalTime, hintsUsed) => {
    return -totalTime;
  };
  const fetchLeaderboardForDate = reactExports.useCallback(async (date) => {
    if (!date || typeof date !== "string" || date.trim() === "") {
      setError("Invalid puzzle date");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setError(null);
      const allEntriesQuery = query(
        collection(tennisDb, "tennis-duo"),
        where("puzzleDate", "==", date)
      );
      const allEntriesSnapshot = await getDocs(allEntriesQuery);
      const entries = [];
      allEntriesSnapshot.forEach((doc) => {
        var _a;
        try {
          const data = doc.data();
          const entry = {
            id: doc.id,
            ...data,
            completedAt: ((_a = data.completedAt) == null ? void 0 : _a.toDate()) || /* @__PURE__ */ new Date()
          };
          entries.push(entry);
        } catch (docError) {
        }
      });
      entries.sort((a, b) => a.totalTime - b.totalTime);
      const top20 = entries.slice(0, 20);
      setCurrentLeaderboard(top20);
      setCurrentDate(date);
    } catch (error2) {
      if (error2.code !== "unavailable" && error2.code !== "permission-denied") {
        setError("Failed to load leaderboard");
      }
      setCurrentLeaderboard([]);
    } finally {
      setLoading(false);
    }
  }, []);
  const submitScore = async (userId, displayName, gameStats, puzzleDate) => {
    try {
      setError(null);
      const existingScoreQuery = query(
        collection(tennisDb, "tennis-duo"),
        where("userId", "==", userId),
        where("puzzleDate", "==", puzzleDate),
        limit(1)
      );
      const existingScoreSnapshot = await getDocs(existingScoreQuery);
      if (!existingScoreSnapshot.empty) {
        return;
      }
      const leaderboardEntry = {
        userId,
        displayName,
        puzzleDate,
        moves: gameStats.moves,
        hintsUsed: gameStats.hintsUsed,
        totalTime: gameStats.totalTime,
        score: calculateScore(gameStats.moves, gameStats.totalTime, gameStats.hintsUsed),
        completedAt: Timestamp.now()
      };
      const docRef = await addDoc(collection(tennisDb, "tennis-duo"), leaderboardEntry);
    } catch (error2) {
      if (error2.code === "permission-denied") {
        setError("Please sign in to submit your score to the leaderboard");
      } else if (error2.code === "unavailable") ;
      else {
        setError("Failed to submit score. Please try again.");
      }
    }
  };
  const getUserRank = async (userId, puzzleDate) => {
    try {
      const allEntriesQuery = query(
        collection(tennisDb, "tennis-duo"),
        where("puzzleDate", "==", puzzleDate)
      );
      const querySnapshot = await getDocs(allEntriesQuery);
      const allEntries = [];
      querySnapshot.forEach((doc) => {
        var _a;
        try {
          const data = doc.data();
          const entry = {
            id: doc.id,
            ...data,
            completedAt: ((_a = data.completedAt) == null ? void 0 : _a.toDate()) || /* @__PURE__ */ new Date()
          };
          allEntries.push(entry);
        } catch (docError) {
        }
      });
      allEntries.sort((a, b) => a.totalTime - b.totalTime);
      const userEntryIndex = allEntries.findIndex((entry) => entry.userId === userId);
      if (userEntryIndex === -1) return null;
      return {
        rank: userEntryIndex + 1,
        userEntry: allEntries[userEntryIndex]
      };
    } catch (error2) {
      return null;
    }
  };
  const getUserCompletedDates = async (userId) => {
    try {
      const userEntriesQuery = query(
        collection(tennisDb, "tennis-duo"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(userEntriesQuery);
      const completedDates = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.puzzleDate) {
          completedDates.push(data.puzzleDate);
        }
      });
      return [...new Set(completedDates)];
    } catch (error2) {
      return [];
    }
  };
  const getUserStats = reactExports.useCallback(async (userId) => {
    try {
      const userEntriesQuery = query(
        collection(tennisDb, "tennis-duo"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(userEntriesQuery);
      const userEntries = [];
      querySnapshot.forEach((doc) => {
        var _a;
        try {
          const data = doc.data();
          const entry = {
            id: doc.id,
            ...data,
            completedAt: ((_a = data.completedAt) == null ? void 0 : _a.toDate()) || /* @__PURE__ */ new Date()
          };
          userEntries.push(entry);
        } catch (docError) {
        }
      });
      if (userEntries.length === 0) {
        return null;
      }
      const totalGames = userEntries.length;
      const totalMoves = userEntries.reduce((sum, entry) => sum + entry.moves, 0);
      const totalHints = userEntries.reduce((sum, entry) => sum + entry.hintsUsed, 0);
      const totalTimeSpent = userEntries.reduce((sum, entry) => {
        const baseTime = entry.totalTime - entry.hintsUsed * 15 * 1e3;
        return sum + baseTime;
      }, 0);
      const totalTimeWithPenalties = userEntries.reduce((sum, entry) => sum + entry.totalTime, 0);
      const averageTime = totalTimeWithPenalties / totalGames;
      const unassistedGames = userEntries.filter((entry) => entry.hintsUsed === 0);
      const unassistedGamesCount = unassistedGames.length;
      const bestUnassistedTime = unassistedGames.length > 0 ? Math.min(...unassistedGames.map((entry) => entry.totalTime)) : null;
      const bestTime = Math.min(...userEntries.map((entry) => entry.totalTime));
      const averageMoves = totalMoves / totalGames;
      const averageHints = totalHints / totalGames;
      const bestUnassistedTimeEntry = unassistedGames.find((entry) => entry.totalTime === bestUnassistedTime);
      const bestTimeEntry = userEntries.find((entry) => entry.totalTime === bestTime);
      const oneWeekAgo = /* @__PURE__ */ new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const gamesThisWeek = userEntries.filter(
        (entry) => entry.completedAt >= oneWeekAgo
      ).length;
      let currentStreak = 0;
      const todayStr = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
      let checkDateStr = todayStr;
      while (true) {
        const validEntryForThisDate = userEntries.find((entry) => {
          const completionDateStr = entry.completedAt.toLocaleDateString("en-CA");
          const puzzleDateMatches = entry.puzzleDate === checkDateStr;
          const completionDateMatches = completionDateStr === checkDateStr;
          return puzzleDateMatches && completionDateMatches;
        });
        if (validEntryForThisDate) {
          currentStreak++;
        } else {
          if (checkDateStr === todayStr) {
          } else {
            break;
          }
        }
        const currentDate2 = new Date(checkDateStr);
        currentDate2.setDate(currentDate2.getDate() - 1);
        checkDateStr = currentDate2.toLocaleDateString("en-CA");
        const daysDiff = Math.floor((Date.now() - currentDate2.getTime()) / (1e3 * 60 * 60 * 24));
        if (daysDiff > 365) {
          break;
        }
      }
      let bestRank = Infinity;
      let bestRankDate;
      if (userEntries.length > 0) {
        bestRank = 1;
        bestRankDate = userEntries[0].puzzleDate;
      }
      const completedDates = userEntries.map((entry) => entry.puzzleDate);
      const stats = {
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
        bestUnassistedTimeDate: bestUnassistedTimeEntry == null ? void 0 : bestUnassistedTimeEntry.puzzleDate,
        bestTimeDate: bestTimeEntry == null ? void 0 : bestTimeEntry.puzzleDate,
        bestRankDate,
        completedDates
      };
      return stats;
    } catch (error2) {
      return null;
    }
  }, []);
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
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXrwTxkBTG8ymHlqL4BH2ivHdMt6GqQA4RIOa0osYW6zK93AUnPRKT9GKKKOvCybIXfwhsPR2pY7nz/pub?gid=352700286&single=true&output=csv";
const fetchDailyPuzzle = async () => {
  try {
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      let values;
      try {
        values = parseCSVLine(line);
      } catch (parseError) {
        continue;
      }
      const csvDate = values[0].trim();
      if (csvDate === today) {
        try {
          let preFilledCells, constraints, solution;
          try {
            const preFilledCellsJson = values[2].replace(/'/g, '"');
            const parsedPreFilledCells = JSON.parse(preFilledCellsJson);
            preFilledCells = parsedPreFilledCells;
          } catch (error) {
            throw new Error(`Invalid preFilledCells JSON: ${error.message}`);
          }
          try {
            const constraintsJson = values[3].replace(/'/g, '"');
            constraints = JSON.parse(constraintsJson);
          } catch (error) {
            throw new Error(`Invalid constraints JSON: ${error.message}`);
          }
          try {
            const solutionJson = values[4].replace(/'/g, '"');
            solution = JSON.parse(solutionJson);
          } catch (error) {
            throw new Error(`Invalid solution JSON: ${error.message}`);
          }
          let hasValidationErrors = false;
          preFilledCells.forEach((cell) => {
            const solutionValue = solution[cell.row][cell.col];
            if (cell.value !== solutionValue) {
              hasValidationErrors = true;
            }
          });
          if (hasValidationErrors) {
            return null;
          }
          const size = parseInt(values[1]);
          if (isNaN(size) || size <= 0 || size > 20) {
            return null;
          }
          const puzzleData = {
            date: values[0],
            size,
            preFilledCells,
            constraints,
            solution,
            difficulty: values[5] || "Easy"
          };
          return puzzleData;
        } catch (parseError) {
          return null;
        }
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
const fetchAllAvailablePuzzles = async () => {
  try {
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    const lines = csvText.split("\n");
    const puzzles = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      try {
        const values = parseCSVLine(line);
        const date = values[0].trim();
        const difficulty = values[5] || "Easy";
        if (date) {
          puzzles.push({ date, difficulty });
        }
      } catch (error) {
        continue;
      }
    }
    puzzles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
    const filteredPuzzles = puzzles.filter((puzzle) => puzzle.date < today);
    return filteredPuzzles;
  } catch (error) {
    return [];
  }
};
const fetchPuzzleByDate = async (targetDate) => {
  try {
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    const lines = csvText.split("\n");
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      let values;
      try {
        values = parseCSVLine(line);
      } catch (parseError) {
        continue;
      }
      const csvDate = values[0].trim();
      if (csvDate === targetDate) {
        try {
          const preFilledCellsJson = values[2].replace(/'/g, '"');
          const preFilledCells = JSON.parse(preFilledCellsJson);
          const solutionJson = values[4].replace(/'/g, '"');
          const solution = JSON.parse(solutionJson);
          let hasValidationErrors = false;
          preFilledCells.forEach((cell) => {
            const solutionValue = solution[cell.row][cell.col];
            if (cell.value !== solutionValue) {
              hasValidationErrors = true;
            }
          });
          if (hasValidationErrors) {
            return null;
          }
          const size = parseInt(values[1]);
          if (isNaN(size) || size <= 0 || size > 20) {
            return null;
          }
          const constraintsJson = values[3].replace(/'/g, '"');
          const constraints = JSON.parse(constraintsJson);
          const archivePuzzleData = {
            date: values[0],
            size,
            preFilledCells,
            constraints,
            solution,
            difficulty: values[5] || "Easy"
          };
          return archivePuzzleData;
        } catch (parseError) {
          return null;
        }
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
const parseCSVLine = (line) => {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
};
const PFSNHeader = ({
  currentPage = "NFL",
  logoUrl = "https://statico.profootballnetwork.com/wp-content/uploads/2025/06/12093424/tools-navigation-06-12-25.jpg",
  logoAlt = "PFSN Logo"
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);
  const navItems = [
    { label: "CBB", href: "https://www.profootballnetwork.com/mens-cbb/" },
    { label: "CFB", href: "https://www.profootballnetwork.com/cfb/" },
    { label: "Fantasy", href: "https://www.profootballnetwork.com/fantasy-football/" },
    { label: "MLB", href: "https://www.profootballnetwork.com/mlb/" },
    { label: "NASCAR", href: "https://www.profootballnetwork.com/nascar/" },
    { label: "NBA", href: "https://www.profootballnetwork.com/nba/" },
    { label: "NFL", href: "https://www.profootballnetwork.com/nfl/" },
    { label: "NHL", href: "https://www.profootballnetwork.com/nhl/" },
    { label: "Tennis", href: "https://www.profootballnetwork.com/tennis/" },
    { label: "WNBA", href: "https://www.profootballnetwork.com/wnba/" },
    { label: "WWE", href: "https://www.profootballnetwork.com/wwe-player-guessing-game/" }
  ];
  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pfsn-header-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pfsn-header-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "mobile-menu-toggle",
          onClick: handleMenuToggle,
          "aria-label": "Toggle menu",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hamburger-line" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hamburger-line" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hamburger-line" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pfsn-logo-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com", target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logoUrl,
            alt: logoAlt,
            className: "pfsn-logo",
            width: "300",
            height: "124"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mobile-game-title md:hidden", children: "NHL Duo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mobile-game-title md:hidden", children: "Tennis Duo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pfsn-tagline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: `pfsn-main-nav ${mobileMenuOpen ? "mobile-open" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "nav-menu", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === item.label ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: item.href,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: handleMenuClose,
          children: item.label
        }
      ) }, item.label)) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mobile-menu-overlay ${mobileMenuOpen ? "active" : ""}`, onClick: handleMenuClose })
  ] });
};
const EditProfileModal = ({ user, onClose }) => {
  const [displayName, setDisplayName] = reactExports.useState(user.displayName || "");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  React.useEffect(() => {
    trackModalOpen("edit_profile");
    trackProfileEdit();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError("Display name cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updateProfile(user, { displayName: displayName.trim() });
      trackProfileUpdate(true);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error2) {
      trackProfileUpdate(false);
      setError("Failed to update display name. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Edit Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "text-gray-500 hover:text-gray-700",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 })
        }
      )
    ] }),
    success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-8 h-8 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-2", children: "Profile Updated!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Your display name has been successfully updated." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Display Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: displayName,
              onChange: (e) => {
                setDisplayName(e.target.value);
                setError("");
              },
              className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm",
              placeholder: "Your display name",
              maxLength: 50
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-gray-500", children: "This name will be shown on the leaderboard" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-700 text-sm bg-red-50 border border-red-200 p-3 rounded-lg", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading || !displayName.trim(),
            className: "flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center gap-2",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              "Save"
            ] })
          }
        )
      ] })
    ] })
  ] }) });
};
const TopBar = ({
  user,
  activeTab,
  onTabChange,
  onShowLogin,
  onLogout
}) => {
  var _a, _b;
  const [showUserMenu, setShowUserMenu] = reactExports.useState(false);
  const [showEditProfile, setShowEditProfile] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-600 text-white shadow-lg", style: { backgroundColor: "#cc3333" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-1 md:py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Tennis Duo" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center md:flex-initial absolute left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-white bg-opacity-20 rounded-lg p-0.5 text-xs md:p-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onTabChange("game"),
            className: `px-2 md:px-4 py-1 md:py-2 rounded-md font-medium transition-colors text-xs md:text-sm ${activeTab === "game" ? "bg-white text-red-600 shadow-sm" : "text-white hover:bg-white hover:bg-opacity-20"}`,
            children: "Game"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-white bg-opacity-30 mx-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              onTabChange("leaderboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
            className: `px-2 md:px-4 py-1 md:py-2 rounded-md font-medium transition-colors text-xs md:text-sm ${activeTab === "leaderboard" ? "bg-white text-red-600 shadow-sm" : "text-white hover:bg-white hover:bg-opacity-20"}`,
            children: "Leaderboard"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-white bg-opacity-30 mx-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              onTabChange("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
            className: `px-2 md:px-4 py-1 md:py-2 rounded-md font-medium transition-colors text-xs md:text-sm ${activeTab === "dashboard" ? "bg-white text-red-600 shadow-sm" : "text-white hover:bg-white hover:bg-opacity-20"}`,
            children: "Dashboard"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowUserMenu(!showUserMenu),
            className: "flex items-center justify-center hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors md:gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-transparent border-2 border-white rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline text-white text-sm", children: user ? user.displayName || ((_a = user.email) == null ? void 0 : _a.split("@")[0]) || "User" : "Guest" })
            ]
          }
        ),
        showUserMenu && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-50", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-b border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gray-800", children: user.displayName || ((_b = user.email) == null ? void 0 : _b.split("@")[0]) || "User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: user.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                setShowEditProfile(true);
                setShowUserMenu(false);
              },
              className: "w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4" }),
                "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                onLogout();
                setShowUserMenu(false);
              },
              className: "w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                "Logout"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              onShowLogin();
              setShowUserMenu(false);
            },
            className: "w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
              "Login"
            ]
          }
        ) })
      ] }) })
    ] }) }) }),
    showUserMenu && user && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setShowUserMenu(false)
      }
    ),
    showEditProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileModal,
      {
        user,
        onClose: () => setShowEditProfile(false)
      }
    )
  ] });
};
const GameGrid = ({
  grid,
  constraints,
  violations,
  onCellClick,
  showWinAnimation = false
}) => {
  const size = grid.length;
  const getCellKey = (row, col) => `${row},${col}`;
  const isViolated = (row, col) => {
    return violations.has(getCellKey(row, col));
  };
  const renderCellContent = (cell) => {
    if (cell.value === "ball") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl sm:text-3xl", children: "🎾" });
    } else if (cell.value === "racket") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "w-8 h-8 sm:w-10 sm:h-10" });
    }
    return null;
  };
  const getConstraintSymbol = (row, col, direction) => {
    const constraint = constraints.find((c) => {
      const [r1, c1] = c.cell1;
      const [r2, c2] = c.cell2;
      if (direction === "right") {
        return r1 === row && c1 === col && r2 === row && c2 === col + 1 || r1 === row && c1 === col + 1 && r2 === row && c2 === col;
      } else {
        return r1 === row && c1 === col && r2 === row + 1 && c2 === col || r1 === row + 1 && c1 === col && r2 === row && c2 === col;
      }
    });
    if (!constraint) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute z-10 ${direction === "right" ? "-right-3 top-1/2 transform -translate-y-1/2" : "-bottom-3 left-1/2 transform -translate-x-1/2"} w-6 h-6 flex items-center justify-center text-sm font-bold bg-white rounded-full border-2 border-gray-200 shadow-sm ${constraint.type === "equal" ? "text-green-600" : "text-red-600"}`, children: constraint.type === "equal" ? "=" : "×" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid gap-1 w-full max-w-lg lg:max-w-96 mx-auto",
      style: {
        gridTemplateColumns: `repeat(${size}, 1fr)`
      },
      children: grid.map(
        (row, rowIndex) => row.map((cell, colIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onCellClick(rowIndex, colIndex),
              disabled: cell.isFixed,
              className: `
                  w-full aspect-square border-2 rounded-lg flex items-center justify-center
                  min-w-0 min-h-0
                  transition-all duration-200 transform hover:scale-105
                  ${showWinAnimation ? "animate-flip" : ""}
                  ${cell.isFixed ? "bg-gray-200 border-gray-300 cursor-not-allowed" : "bg-white border-gray-300 hover:border-gray-400 cursor-pointer hover:shadow-md"}
                  ${isViolated(rowIndex, colIndex) ? "border-red-500 bg-red-50" : ""}
                `,
              style: {
                animationDelay: showWinAnimation ? `${Math.floor(rowIndex / 2) * 300}ms` : "0ms"
              },
              children: renderCellContent(cell)
            }
          ),
          colIndex < size - 1 && getConstraintSymbol(rowIndex, colIndex, "right"),
          rowIndex < size - 1 && getConstraintSymbol(rowIndex, colIndex, "bottom")
        ] }, getCellKey(rowIndex, colIndex)))
      )
    }
  ) });
};
const GameControls = ({
  onUndo,
  onHint,
  onNewGame,
  canUndo,
  isGameComplete,
  difficulty,
  onDifficultyChange
}) => {
  React.useEffect(() => {
    console.log("🎮 GAME CONTROLS - canUndo prop updated:", canUndo);
  }, [canUndo]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onUndo,
        disabled: !canUndo || isGameComplete,
        className: `
            flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium transition-all text-sm
            ${!canUndo || isGameComplete ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}
          `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Undo, { className: "w-4 h-4" }),
          "Undo"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onHint,
        disabled: isGameComplete,
        className: `
            flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium transition-all text-sm
            ${!isGameComplete ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4" }),
          "Fill Next"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onNewGame,
        className: "flex items-center gap-2 px-2 py-1.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all text-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
          "Reset"
        ]
      }
    )
  ] }) });
};
const GameStatus = ({
  violations,
  violationMessages,
  isComplete,
  gameStats,
  showWinAnimation = false,
  onDismissWin
}) => {
  if (isComplete) return null;
  if (violations.size > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-100 border border-red-300 rounded-lg", children: violationMessages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm text-red-700 space-y-1", children: violationMessages.map((message, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
    ] }, index)) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 p-4 bg-blue-100 border border-blue-300 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-800 font-semibold", children: "Keep going! Fill the grid following the rules." }) });
};
const ArchivePopup = ({ onClose, onSelectDate, availablePuzzles, userId }) => {
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [completedDates, setCompletedDates] = reactExports.useState([]);
  const { getUserCompletedDates } = useLeaderboard();
  React.useEffect(() => {
    trackModalOpen("archive");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  reactExports.useEffect(() => {
    trackArchiveView();
    setIsLoading(false);
  }, []);
  reactExports.useEffect(() => {
    const fetchCompletedDates = async () => {
      if (userId && getUserCompletedDates) {
        try {
          const dates = await getUserCompletedDates(userId);
          setCompletedDates(dates);
        } catch (error) {
          console.error("Error fetching completed dates:", error);
        }
      }
    };
    fetchCompletedDates();
  }, [userId, getUserCompletedDates]);
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      };
    } catch (error) {
      return { day: "Invalid", date: "Date" };
    }
  };
  const handleDateSelect = (date) => {
    trackArchivePuzzleLoad(date, true);
    onSelectDate(date);
    onClose();
  };
  const isDateCompleted = (date) => completedDates.includes(date);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-gray-800 to-black p-6 text-center relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 right-4 text-white hover:text-gray-200 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-6 h-6 text-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Archive Games" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-100", children: "Select a previous day to play" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 max-h-96 overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Loading available puzzles..." })
    ] }) : availablePuzzles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "No archive puzzles available" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleDateSelect((/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")),
          className: "relative p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center border-2 border-blue-300 hover:border-blue-400",
          children: [
            isDateCompleted((/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-2.5 h-2.5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-blue-800 mb-1", children: "Today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-blue-900 mb-2", children: (() => {
              const today = /* @__PURE__ */ new Date();
              const { date } = formatDate(today.toLocaleDateString("en-CA"));
              return date;
            })() })
          ]
        }
      ),
      availablePuzzles.map((puzzle) => {
        const { day, date } = formatDate(puzzle.date);
        const isCompleted = isDateCompleted(puzzle.date);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleDateSelect(puzzle.date),
            className: "relative p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center border border-gray-200 hover:border-gray-300",
            children: [
              isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-2.5 h-2.5 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-gray-800 mb-1", children: day }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-gray-900 mb-2", children: date })
            ]
          },
          puzzle.date
        );
      })
    ] }) })
  ] }) });
};
const RulesModal = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      trackModalOpen("rules");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-gray-800 to-black p-6 text-center relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 right-4 text-white hover:text-gray-200 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎾" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Tennis Duo Rules" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-100", children: "How to play Tennis Duo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-h-96 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-4 text-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-lg", children: "1." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Each row and column must have equal numbers of 🎾 and ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-5 h-5 align-middle mx-1" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-lg", children: "2." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "No more than 2 consecutive 🎾 or ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-5 h-5 align-middle mx-1" }),
            " (vertically or horizontally)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-lg", children: "3." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 flex items-center justify-center text-sm font-bold bg-white rounded-full border-2 border-gray-200 shadow-sm text-green-600", children: "=" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "means cells must be the same" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-lg", children: "4." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 flex items-center justify-center text-sm font-bold bg-white rounded-full border-2 border-gray-200 shadow-sm text-red-600", children: "×" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "means cells must be different" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 bg-blue-50 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-800 mb-2", children: "Tips:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-gray-600 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Click a cell to cycle through values:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "ml-4", children: "1st click → 🎾" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "ml-4 flex items-center", children: [
            "2nd click → ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-4 h-4 align-middle ml-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "ml-4", children: "3rd click → Empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Use hints if you get stuck (adds 15 sec to your time)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Try to solve without hints for the best score!" })
        ] })
      ] })
    ] })
  ] }) });
};
const GameTab = ({
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
  onCloseBottomResults
}) => {
  const [showArchive, setShowArchive] = reactExports.useState(false);
  const [showRules, setShowRules] = reactExports.useState(false);
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-2 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 max-w-xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-xl lg:max-w-sm mx-auto", children: [
        dailyPuzzleData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800", children: currentPuzzleDate === (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") ? "Today's Puzzle" : `Archive: ${new Date(currentPuzzleDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600", children: [
                "Fill the grid with 🎾 and ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-5 h-5 align-middle mx-1" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  trackRuleView();
                  setShowRules(true);
                },
                className: "flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(HelpCircle, { className: "w-4 h-4" }),
                  "Rules"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GameGrid,
            {
              grid: gameState.grid,
              constraints: gameState.constraints,
              violations,
              onCellClick,
              showWinAnimation
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            GameControls,
            {
              onUndo: undoMove,
              onHint,
              onNewGame: onReset,
              canUndo,
              isGameComplete: isComplete
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GameStatus,
          {
            violations,
            violationMessages,
            isComplete,
            gameStats
          }
        ),
        showBottomResults && gameStats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", "data-bottom-results": true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "🎉 Puzzle Completed!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Great job solving the challenge!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-3 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Moves" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-blue-600", children: gameStats.moves })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-3 bg-yellow-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Hints Used" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-yellow-600", children: gameStats.hintsUsed })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-3 bg-green-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Time" }),
                gameStats.hintsUsed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mt-1", children: "+15s per hint" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: gameStats.totalTime ? (() => {
                  const seconds = Math.floor(gameStats.totalTime / 1e3);
                  const minutes = Math.floor(seconds / 60);
                  const remainingSeconds = seconds % 60;
                  return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                })() : "0s" }),
                gameStats.hintsUsed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mt-1", children: (() => {
                  const baseTime = gameStats.totalTime - gameStats.hintsUsed * 15 * 1e3;
                  const seconds = Math.floor(baseTime / 1e3);
                  const minutes = Math.floor(seconds / 60);
                  const remainingSeconds = seconds % 60;
                  const baseTimeFormatted = minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                  return `${baseTimeFormatted} + ${gameStats.hintsUsed}×15s`;
                })() })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: async () => {
                  trackCTAClick("share", "game_bottom_results_guest", false);
                  const timeTaken = gameStats.totalTime ? (() => {
                    const seconds = Math.floor(gameStats.totalTime / 1e3);
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;
                    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                  })() : "0s";
                  const shareText = `🎾 Just solved today's Tennis Duo in ${timeTaken}! 🎾

⚡ ${gameStats.moves} moves
💡 ${gameStats.hintsUsed} hints used

Can you beat my time? Play now:`;
                  const gameUrl = window.location.href;
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: "Tennis Duo",
                        text: shareText,
                        url: gameUrl
                      });
                    } catch (error) {
                      try {
                        const fullText = `${shareText}
${gameUrl}`;
                        await navigator.clipboard.writeText(fullText);
                        alert("Game results copied to clipboard! 📋");
                      } catch (clipboardError) {
                        const fullText = `${shareText}
${gameUrl}`;
                        alert(`Share this:

${fullText}`);
                      }
                    }
                  } else {
                    try {
                      const fullText = `${shareText}
${gameUrl}`;
                      await navigator.clipboard.writeText(fullText);
                      alert("Game results copied to clipboard! 📋");
                    } catch (error) {
                      const fullText = `${shareText}
${gameUrl}`;
                      alert(`Share this:

${fullText}`);
                    }
                  }
                },
                className: "px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                  "Share"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  trackCTAClick("archive", "game_bottom_results_guest", false);
                  setShowArchive(true);
                },
                className: "px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "w-4 h-4" }),
                  "Play Archive"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  trackCTAClick("login", "game_bottom_results_guest", false);
                  onShowLogin();
                },
                className: "px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  "Login to See your Rank"
                ]
              }
            )
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RulesModal, { isOpen: showRules, onClose: () => setShowRules(false) }),
      showArchive && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArchivePopup,
        {
          onClose: () => setShowArchive(false),
          onSelectDate: (date) => {
            onPlayArchive(date);
            setShowArchive(false);
          },
          availablePuzzles,
          userId
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-2 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-xl lg:max-w-sm mx-auto", children: [
      dailyPuzzleData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800", children: currentPuzzleDate === (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA") ? "Today's Puzzle" : `Archive: ${new Date(currentPuzzleDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600", children: [
              "Fill the grid with 🎾 and ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(RacketSvgIcon, { className: "inline-block w-5 h-5 align-middle mx-1" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                trackRuleView();
                setShowRules(true);
              },
              className: "flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HelpCircle, { className: "w-4 h-4" }),
                "Rules"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GameGrid,
          {
            grid: gameState.grid,
            constraints: gameState.constraints,
            violations,
            onCellClick,
            showWinAnimation
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          GameControls,
          {
            onUndo: undoMove,
            onHint,
            onNewGame: onReset,
            canUndo,
            isGameComplete: isComplete
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GameStatus,
        {
          violations,
          violationMessages,
          isComplete,
          gameStats
        }
      ),
      showBottomResults && gameStats && isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", "data-bottom-results": true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "🎉 Puzzle Completed!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Great job solving today's challenge!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-3 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Moves" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-blue-600", children: gameStats.moves })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-3 bg-yellow-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Hints Used" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-yellow-600", children: gameStats.hintsUsed })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-3 bg-green-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "Time" }),
              gameStats.hintsUsed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mt-1", children: "+15s per hint" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: gameStats.totalTime ? (() => {
                const seconds = Math.floor(gameStats.totalTime / 1e3);
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
              })() : "0s" }),
              gameStats.hintsUsed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mt-1", children: (() => {
                const baseTime = gameStats.totalTime - gameStats.hintsUsed * 15 * 1e3;
                const seconds = Math.floor(baseTime / 1e3);
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                const baseTimeFormatted = minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                return `${baseTimeFormatted} + ${gameStats.hintsUsed}×15s`;
              })() })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: async () => {
                trackCTAClick("share", "game_bottom_results_logged_in", true);
                const timeTaken = gameStats.totalTime ? (() => {
                  const seconds = Math.floor(gameStats.totalTime / 1e3);
                  const minutes = Math.floor(seconds / 60);
                  const remainingSeconds = seconds % 60;
                  return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
                })() : "0s";
                const shareText = `🎾 Just solved today's Tennis Duo in ${timeTaken}! 🎾

⚡ ${gameStats.moves} moves
💡 ${gameStats.hintsUsed} hints used

Can you beat my time? Play now:`;
                const gameUrl = window.location.href;
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: "Tennis Duo",
                      text: shareText,
                      url: gameUrl
                    });
                  } catch (error) {
                    try {
                      const fullText = `${shareText}
${gameUrl}`;
                      await navigator.clipboard.writeText(fullText);
                      alert("Game results copied to clipboard! 📋");
                    } catch (clipboardError) {
                      const fullText = `${shareText}
${gameUrl}`;
                      alert(`Share this:

${fullText}`);
                    }
                  }
                } else {
                  try {
                    const fullText = `${shareText}
${gameUrl}`;
                    await navigator.clipboard.writeText(fullText);
                    alert("Game results copied to clipboard! 📋");
                  } catch (error) {
                    const fullText = `${shareText}
${gameUrl}`;
                    alert(`Share this:

${fullText}`);
                  }
                }
              },
              className: "px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                "Share"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                trackCTAClick("archive", "game_bottom_results_logged_in", true);
                setShowArchive(true);
              },
              className: "px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "w-4 h-4" }),
                "Play Archive"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                trackCTAClick("leaderboard", "game_bottom_results_logged_in", true);
                window.dispatchEvent(new CustomEvent("switchToLeaderboard"));
              },
              className: "px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }),
                "View Leaderboard"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RulesModal, { isOpen: showRules, onClose: () => setShowRules(false) }),
    showArchive && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArchivePopup,
      {
        onClose: () => setShowArchive(false),
        onSelectDate: (date) => {
          onPlayArchive(date);
          setShowArchive(false);
        },
        availablePuzzles,
        userId
      }
    )
  ] });
};
const PFSNFooter = ({ currentPage = "NHL" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "pfsn-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pfsn-footer-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-columns", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-column", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title", children: "News & Analysis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "CBB" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/mens-cbb/", target: "_blank", rel: "noopener noreferrer", children: "CBB" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "CFB" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/cfb/", target: "_blank", rel: "noopener noreferrer", children: "CFB" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "Fantasy" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/fantasy-football/", target: "_blank", rel: "noopener noreferrer", children: "Fantasy" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "MLB" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/mlb/", target: "_blank", rel: "noopener noreferrer", children: "MLB" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "NASCAR" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nascar/", target: "_blank", rel: "noopener noreferrer", children: "NASCAR" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "NBA" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nba/", target: "_blank", rel: "noopener noreferrer", children: "NBA" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "NFL" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nfl/", target: "_blank", rel: "noopener noreferrer", children: "NFL" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "NHL" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nhl/", target: "_blank", rel: "noopener noreferrer", children: "NHL" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "Tennis" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/tennis/", target: "_blank", rel: "noopener noreferrer", children: "Tennis" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "WNBA" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/wnba/", target: "_blank", rel: "noopener noreferrer", children: "WNBA" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: currentPage === "WWE" ? "current-page" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/wwe-player-guessing-game/", target: "_blank", rel: "noopener noreferrer", children: "WWE" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-column", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title", children: "Tennis Tools & Games" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: "Tennis Card Matching Game" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/tennis-player-guessing-game/", children: "Tennis Player Guessing Game" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title footer-subheading", children: "NFL Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/mockdraft", children: "NFL Mock Draft Simulator" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nfl-playoff-predictor", children: "NFL Season & Playoff Predictor" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nfl-offseason-salary-cap-free-agency-manager", children: "NFL Offseason Manager" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/cta-big-board-builder-nfl-draft/", children: "NFL Draft Big Board Builder" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title footer-subheading", children: "NFL Games" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://interactive-tango-pu-7of9.bolt.host/", children: "NFL Duo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nfl-player-guessing-game/", children: "NFL Player Guessing Game" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/cta-guess-nfl-prospects-tools/", children: "NFL Draft Guessing Game" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nfl-word-fumble-cta/", children: "NFL Word Fumble" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-column", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title", children: "Fantasy Football Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/fantasy-football-mock-draft-simulator/", children: "Fantasy Mock Draft Simulator" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/who-should-i-start-fantasy-optimizer", children: "Fantasy Start/Sit Optimizer" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/fantasy-football-waiver-wire", children: "Fantasy Waiver Wire Assistant" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/fantasy-football-trade-analyzer", children: "Fantasy Trade Analyzer" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/dynasty-fantasy-football-trade-value-charts", children: "Dynasty Trade Charts" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/fantasy-football-trade-value-charts", children: "Redraft Trade Charts" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/nfl-dfs-optimizer-lineup-generator", children: "NFL DFS Optimizer" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/who-should-i-draft-fantasy-football", children: "Who Should I Draft?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/fantasy-football-team-name-generator", children: "Team Name Generator" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/fantasy-football-draft-order-generator-randomizer/", children: "Draft Order Randomizer" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-column", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title", children: "Betting Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/betting-odds-calculator-cta/", children: "Odds Calculator" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/parlay-calculator-cta/", children: "Parlay Calculator" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title footer-subheading", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/about-us/", children: "About PFSN" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/contact-media-inquiries-pro-football-network/", children: "Contact Us" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/privacy-policy/", children: "Privacy Policy" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title footer-subheading", children: "Tennis Resources" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/tennis", children: "Tennis News" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/tennis/standings", children: "Tennis Standings" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/tennis/stats", children: "Tennis Stats" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title footer-subheading", children: "Tennis Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/tennis-mock-draft-simulator", children: "Tennis Mock Draft Simulator" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.profootballnetwork.com/tennis-player-guessing-game", children: "Tennis Player Guessing Game" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "footer-column-title footer-subheading", children: "Tennis Games" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "footer-links", children: /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "current-page", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: "Tennis Duo" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-bottom", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "social-icons", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://facebook.com/PFSN365", "aria-label": "Facebook", rel: "noopener noreferrer", target: "_blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fab fa-facebook-f" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:contact@profootballnetwork.com", "aria-label": "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-envelope" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/rss", "aria-label": "RSS Feed", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-rss" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://x.com/PFSN365", "aria-label": "Twitter", rel: "noopener noreferrer", target: "_blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fab fa-twitter" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "copyright", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Copyright © 2019-2025. PFSN." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All Rights Reserved." })
      ] })
    ] })
  ] }) });
};
function SEOHead({
  title = "Tennis Duo - Daily Tennis Grid Game",
  description = "Tennis Duo is a fun, brain-teasing puzzle where you fill the grid by following logical rules. It's perfect for Tennis fans who love a good challenge!",
  image = "https://www.profootballnetwork.com/games/tennis-duo/tennis-duo-og-image.png",
  url = typeof window !== "undefined" ? window.location.href : "https://www.profootballnetwork.com/games/tennis-duo/",
  type = "website",
  siteName = "Pro Football Network",
  twitterCard = "summary_large_image",
  twitterSite = "@PFSN365",
  keywords = "Tennis game, Tennis daily challenge, tennis puzzle, Tennis grid game, daily Tennis game",
  author = "PFSN",
  canonical
}) {
  reactExports.useEffect(() => {
    document.title = title;
    document.documentElement.lang = "en-US";
    const updateMetaTag = (property, content, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);
    updateMetaTag("robots", "index, follow, max-image-preview:large");
    updateMetaTag("language", "English");
    updateMetaTag("revisit-after", "1 day");
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    const currentUrl = typeof window !== "undefined" ? window.location.href : url;
    updateMetaTag("og:image", image.startsWith("http") ? image : `https://www.profootballnetwork.com/games/nhl-duo${image}`, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", siteName, true);
    updateMetaTag("og:locale", "en_US", true);
    updateMetaTag("twitter:card", twitterCard);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image.startsWith("http") ? image : `https://www.profootballnetwork.com/games/tennis-duo${image}`);
    updateMetaTag("twitter:site", twitterSite);
    updateMetaTag("twitter:creator", twitterSite);
    const canonicalUrl = canonical || (typeof window !== "undefined" ? window.location.href : url);
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        // WebApplication/Game schema
        {
          "@type": "WebApplication",
          "@id": currentUrl + "#game",
          "name": title,
          "url": currentUrl,
          "description": description,
          "applicationCategory": "Game",
          "genre": "Sports",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "publisher": {
            "@id": "https://www.profootballnetwork.com/#organization"
          }
        },
        // WebPage schema
        {
          "@type": "WebPage",
          "@id": currentUrl + "#webpage",
          "url": currentUrl,
          "name": title,
          "description": description,
          "isPartOf": {
            "@id": "https://www.profootballnetwork.com/#website"
          },
          "about": {
            "@id": currentUrl + "#game"
          },
          "publisher": {
            "@id": "https://www.profootballnetwork.com/#organization"
          },
          "inLanguage": "en-US"
        },
        // NewsMediaOrganization schema
        {
          "@type": "NewsMediaOrganization",
          "@id": "https://www.profootballnetwork.com/#organization",
          "name": "Pro Football Network",
          "url": "https://www.profootballnetwork.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.profootballnetwork.com/logo.png"
          },
          "sameAs": [
            "https://twitter.com/PFSN365",
            "https://www.facebook.com/ProFootballNetwork",
            "https://www.instagram.com/profootballnetwork",
            "https://www.youtube.com/profootballnetwork"
          ]
        },
        // SiteNavigationElement schema
        {
          "@type": "SiteNavigationElement",
          "name": "Games",
          "url": "https://www.profootballnetwork.com/games/",
          "position": 1
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Tennis Duo",
          "url": currentUrl,
          "position": 2
        }
      ]
    };
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, image, url, type, siteName, twitterCard, twitterSite, keywords, author, canonical]);
  return null;
}
const RaptiveOutstreamAd = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "raptive-pfn-outstream" });
};
const RaptiveSidebarAd = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "raptive-pfn-sticky-sidebar" });
};
const RaptiveFooterAd = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "raptive-pfn-disable-footer-close" });
};
const LeaderboardTab = reactExports.lazy(() => __vitePreload(() => import("./LeaderboardTab-C43UORhh.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0).then((module) => ({ default: module.LeaderboardTab })));
const DashboardTab = reactExports.lazy(() => __vitePreload(() => import("./DashboardTab-DjLo4uwJ.js"), true ? __vite__mapDeps([4,1,2,3]) : void 0));
const CompletionScreen = reactExports.lazy(() => __vitePreload(() => import("./CompletionScreen-DjegN7SB.js"), true ? __vite__mapDeps([5,1,2,3]) : void 0));
const AuthModal = reactExports.lazy(() => __vitePreload(() => import("./AuthModal-D11GsNiE.js"), true ? __vite__mapDeps([6,1,2,3]) : void 0));
function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = reactExports.useState("game");
  const [dailyPuzzleData, setDailyPuzzleData] = reactExports.useState(null);
  const [puzzleLoading, setPuzzleLoading] = reactExports.useState(true);
  const [currentPuzzleDate, setCurrentPuzzleDate] = reactExports.useState("");
  const [puzzleLoadErrorMessage, setPuzzleLoadErrorMessage] = reactExports.useState("");
  const [availablePuzzles, setAvailablePuzzles] = reactExports.useState([]);
  const [showAuthModal, setShowAuthModal] = reactExports.useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = reactExports.useState(false);
  const [showBottomResults, setShowBottomResults] = reactExports.useState(false);
  const [completionModalDismissed, setCompletionModalDismissed] = reactExports.useState(false);
  const [scoreSubmitted, setScoreSubmitted] = reactExports.useState(false);
  const submissionInProgress = reactExports.useRef(false);
  const [previousTab, setPreviousTab] = reactExports.useState("game");
  const {
    currentLeaderboard,
    currentPuzzleDate: leaderboardDate,
    loading: leaderboardLoading,
    error: leaderboardError,
    submitScore,
    getUserRank: getUserRankAsync,
    fetchLeaderboardForDate
  } = useLeaderboard();
  reactExports.useEffect(() => {
    const loadDailyPuzzle = async () => {
      try {
        setPuzzleLoading(true);
        setPuzzleLoadErrorMessage("");
        const puzzle = await fetchDailyPuzzle();
        if (puzzle) {
          setDailyPuzzleData(puzzle);
          setCurrentPuzzleDate(puzzle.date);
          trackPuzzleLoad(true, "daily");
          trackGameStart("daily", puzzle.difficulty);
        } else {
          setPuzzleLoadErrorMessage("No valid puzzle found for today. The puzzle data may be malformed or missing.");
          trackPuzzleLoad(false, "daily", "No puzzle found for today");
        }
      } catch (error) {
        console.error("Failed to load daily puzzle:", error);
        setPuzzleLoadErrorMessage(`Failed to load today's puzzle: ${error.message}`);
        trackPuzzleLoad(false, "daily", error.message);
      } finally {
        setPuzzleLoading(false);
      }
    };
    loadDailyPuzzle();
  }, []);
  reactExports.useEffect(() => {
    const loadAvailablePuzzles = async () => {
      try {
        const puzzles = await fetchAllAvailablePuzzles();
        setAvailablePuzzles(puzzles);
      } catch (error) {
        console.error("Failed to load available puzzles:", error);
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
  React.useEffect(
    () => {
      console.log("🎮 APP - canUndo from hook:", canUndo);
    }
  );
  reactExports.useEffect(() => {
    if (isComplete && !showCompletionScreen && !completionModalDismissed) {
      const timer = setTimeout(() => {
        setShowCompletionScreen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, showCompletionScreen, completionModalDismissed]);
  reactExports.useEffect(() => {
  }, [isComplete]);
  reactExports.useEffect(() => {
    var _a;
    if (isComplete && gameStats && !scoreSubmitted && user && gameStats.endTime && !submissionInProgress.current) {
      setScoreSubmitted(true);
      const finalStats = {
        ...gameStats,
        endTime: gameStats.endTime || Date.now(),
        baseTime: gameStats.baseTime || Date.now() - gameStats.startTime
      };
      trackGameEnd({
        moves: finalStats.moves,
        hintsUsed: finalStats.hintsUsed,
        timeTaken: finalStats.totalTime,
        completed: true
      });
      const displayName = user.displayName || ((_a = user.email) == null ? void 0 : _a.split("@")[0]) || "Anonymous";
      submitScore(user.uid, displayName, finalStats, currentPuzzleDate).then(() => {
        trackScoreSubmission(true, finalStats, currentPuzzleDate);
      }).catch((error) => {
        trackScoreSubmission(false, finalStats, currentPuzzleDate);
      });
    }
  }, [isComplete, scoreSubmitted, user == null ? void 0 : user.uid, gameStats == null ? void 0 : gameStats.endTime, currentPuzzleDate]);
  reactExports.useEffect(() => {
    if (!isComplete) {
      setScoreSubmitted(false);
      submissionInProgress.current = false;
      setShowCompletionScreen(false);
      setShowBottomResults(false);
      setCompletionModalDismissed(false);
    }
  }, [isComplete]);
  const handleCellClick = (row, col) => {
    var _a, _b;
    if (((_b = (_a = gameState.grid[row]) == null ? void 0 : _a[col]) == null ? void 0 : _b.isFixed) || isComplete) return;
    const currentValue = gameState.grid[row][col].value;
    const nextValue = currentValue === null ? "helmet" : currentValue === "helmet" ? "football" : null;
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
    setTimeout(() => {
      const bottomResults = document.querySelector("[data-bottom-results]");
      if (bottomResults) {
        bottomResults.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 100);
  };
  const handleShowLeaderboard = () => {
    trackTabSwitch(activeTab, "leaderboard");
    setActiveTab("leaderboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleTabChange = (newTab) => {
    trackTabSwitch(activeTab, newTab);
    setPreviousTab(activeTab);
    setActiveTab(newTab);
    if (newTab !== "game") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handlePlayArchive = async (date) => {
    try {
      setPuzzleLoading(true);
      setPuzzleLoadErrorMessage("");
      const puzzle = await fetchPuzzleByDate(date);
      if (puzzle) {
        setDailyPuzzleData(puzzle);
        setCurrentPuzzleDate(puzzle.date);
        trackGameStart("daily", puzzle.difficulty);
        setActiveTab("game");
      } else {
        setPuzzleLoadErrorMessage(`No valid puzzle found for ${date}. The puzzle data may be malformed or missing.`);
      }
    } catch (error) {
      setPuzzleLoadErrorMessage(`Failed to load puzzle for ${date}: ${error.message}`);
    } finally {
      setPuzzleLoading(false);
    }
  };
  reactExports.useEffect(() => {
    const handleSwitchToLeaderboard = () => {
      setActiveTab("leaderboard");
    };
    window.addEventListener("switchToLeaderboard", handleSwitchToLeaderboard);
    return () => window.removeEventListener("switchToLeaderboard", handleSwitchToLeaderboard);
  }, []);
  if (authLoading || puzzleLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Loading..." })
    ] }) });
  }
  if (!dailyPuzzleData && activeTab === "game") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TopBar,
        {
          user,
          activeTab,
          onTabChange: handleTabChange,
          onShowLogin: () => setShowAuthModal(true),
          onLogout: logout
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "No Puzzle Available" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: puzzleLoadErrorMessage || "There's no puzzle available for today. Please check back later!" })
      ] }) }),
      showAuthModal && /* @__PURE__ */ jsxRuntimeExports.jsx(AuthModal, { onClose: () => setShowAuthModal(false) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SEOHead, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PFSNHeader, { currentPage: "NHL" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TopBar,
      {
        user,
        activeTab,
        onTabChange: setActiveTab,
        onShowLogin: () => setShowAuthModal(true),
        onLogout: logout
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-0 justify-center items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 max-w-2xl", children: [
        activeTab === "game" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          GameTab,
          {
            dailyPuzzleData,
            gameState,
            gameStats,
            violations,
            violationMessages,
            isComplete,
            showWinAnimation,
            onCellClick: handleCellClick,
            onHint: handleHint,
            onReset: handleReset,
            canUndo,
            undoMove,
            onPlayArchive: handlePlayArchive,
            availablePuzzles,
            isLoggedIn: !!user,
            userId: user == null ? void 0 : user.uid,
            currentPuzzleDate,
            onShowLogin: () => setShowAuthModal(true),
            showBottomResults,
            onCloseBottomResults: () => setShowBottomResults(false)
          }
        ),
        activeTab === "leaderboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-skeleton", children: "Loading..." }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          LeaderboardTab,
          {
            currentLeaderboard,
            currentPuzzleDate: currentPuzzleDate || (dailyPuzzleData == null ? void 0 : dailyPuzzleData.date),
            loading: leaderboardLoading,
            error: leaderboardError,
            userId: user == null ? void 0 : user.uid,
            isLoggedIn: !!user,
            onShowLogin: () => setShowAuthModal(true),
            onFetchLeaderboard: fetchLeaderboardForDate,
            onGetUserRank: getUserRankAsync
          }
        ) }),
        activeTab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-skeleton", children: "Loading..." }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DashboardTab,
          {
            isLoggedIn: !!user,
            userId: user == null ? void 0 : user.uid,
            onShowLogin: () => setShowAuthModal(true),
            onPlayArchive: handlePlayArchive,
            availablePuzzles
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block lg:w-[300px] lg:ml-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RaptiveSidebarAd, {}) }) })
    ] }) }),
    showCompletionScreen && activeTab === "game" && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-skeleton", children: "Loading..." }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CompletionScreen,
      {
        gameStats,
        onPlayArchive: handlePlayArchive,
        availablePuzzles,
        isLoggedIn: !!user,
        onShowLogin: () => setShowAuthModal(true),
        onShowLeaderboard: handleShowLeaderboard,
        userId: user == null ? void 0 : user.uid,
        onClose: handleCloseCompletionModal
      }
    ) }),
    showAuthModal && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-skeleton", children: "Loading..." }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthModal, { onClose: () => setShowAuthModal(false) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RaptiveOutstreamAd, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RaptiveFooterAd, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PFSNFooter, { currentPage: "NBA" })
  ] });
}
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
export {
  ArchivePopup as A,
  HINT_PENALTY_SECONDS as H,
  trackCTAClick as a,
  trackLeaderboardRankView as b,
  trackDashboardView as c,
  trackPendingGamesClick as d,
  trackUserStatsView as e,
  trackCompletionScreenView as f,
  trackCompletionScreenAction as g,
  trackShare as h,
  useAuth as i,
  trackLeaderboardView as t,
  useLeaderboard as u
};
