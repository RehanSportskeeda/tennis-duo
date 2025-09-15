import { r as reactExports, R as React, j as jsxRuntimeExports, X, U as User, M as Mail, n as Lock } from "./react-vendor-Cxdu5FWc.js";
import { i as useAuth } from "./index-D4MpbWLW.js";
import "./vendor-vU7BIIlf.js";
import "./firebase-DnFTZRb-.js";
const AuthModal = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [displayName, setDisplayName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [validationErrors, setValidationErrors] = reactExports.useState({});
  const { signUp, signIn, signInWithGoogle } = useAuth();
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const validateEmail = (email2) => {
    if (!email2) return "Email is required";
    if (!email2.includes("@")) return "Please include an @ in the email address";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email2)) return "Please enter a valid email address";
    return void 0;
  };
  const validatePassword = (password2) => {
    if (!password2) return "Password is required";
    if (password2.length < 6) return "Password must be at least 6 characters long";
    return void 0;
  };
  const validateDisplayName = (name) => {
    if (isSignUp && !name.trim()) return "Display name is required";
    return void 0;
  };
  const handleInputChange = (field, value) => {
    setValidationErrors((prev) => ({ ...prev, [field]: void 0 }));
    setError("");
    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "displayName":
        setDisplayName(value);
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const displayNameError = validateDisplayName(displayName);
    const newValidationErrors = {
      email: emailError,
      password: passwordError,
      displayName: displayNameError
    };
    setValidationErrors(newValidationErrors);
    if (emailError || passwordError || displayNameError) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (isSignUp) {
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (error2) {
      setError(error2.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      onClose();
    } catch (error2) {
      if (error2.message.includes("popup-blocked")) {
        setError("Pop-up was blocked by your browser. Please allow pop-ups for this site and try again. You may need to click the pop-up blocker icon in your browser's address bar.");
      } else {
        setError(error2.message || "Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800", children: isSignUp ? "Sign Up" : "Sign In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "text-gray-500 hover:text-gray-700",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      isSignUp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Display Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: displayName,
              onChange: (e) => handleInputChange("displayName", e.target.value),
              className: `w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm ${validationErrors.displayName ? "border-red-500 bg-red-50" : "border-gray-300"}`,
              placeholder: "Your name"
            }
          )
        ] }),
        validationErrors.displayName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-red-600 break-words", children: validationErrors.displayName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => handleInputChange("email", e.target.value),
              className: `w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm ${validationErrors.email ? "border-red-500 bg-red-50" : "border-gray-300"}`,
              placeholder: "your@email.com"
            }
          )
        ] }),
        validationErrors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-red-600 break-words", children: validationErrors.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              value: password,
              onChange: (e) => handleInputChange("password", e.target.value),
              className: `w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm ${validationErrors.password ? "border-red-500 bg-red-50" : "border-gray-300"}`,
              placeholder: "••••••••"
            }
          )
        ] }),
        validationErrors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-red-600 break-words", children: validationErrors.password })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-gray-300" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 bg-white text-gray-500", children: "or" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleGoogleSignIn,
          disabled: loading,
          className: "w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
            ] }),
            "Continue with Google"
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-700 text-sm bg-red-50 border border-red-200 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-red-500 mt-0.5 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: error })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium",
          children: loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setIsSignUp(!isSignUp),
        disabled: loading,
        className: "text-indigo-600 hover:text-indigo-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
        children: isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"
      }
    ) })
  ] }) });
};
export {
  AuthModal as default
};
