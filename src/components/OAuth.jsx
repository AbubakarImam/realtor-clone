import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { loginWithGoogle } from "../api/auth"
import { ApiError } from "../api/client"
import { useAuth } from "../context/AuthContext"
import { GOOGLE_CLIENT_ID } from "../api/config"

const isConfigured = GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.startsWith("replace-me");

const OAuth = () => {
  const navigate = useNavigate();
  const { login: setSession } = useAuth();
  const [pending, setPending] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    setPending(true);
    try {
      const user = await loginWithGoogle(credentialResponse.credential);
      setSession(user);
      navigate("/");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Could not authorize with Google");
    } finally {
      setPending(false);
    }
  };

  const button = (
    <button
      type="button"
      tabIndex={-1}
      className="flex items-center justify-center gap-2.5
      w-full bg-white border border-ink/20 text-ink px-7 py-3
      font-mono uppercase text-xs font-semibold tracking-stamped
      transition-colors duration-150 ease-in-out rounded-sm">
      <FcGoogle className="text-xl" />
      {pending ? "Signing in..." : "Continue with Google"}
    </button>
  );

  if (!isConfigured) {
    return (
      <button
        type="button"
        onClick={() => toast.error("Google sign-in isn't configured yet — set REACT_APP_GOOGLE_CLIENT_ID and the backend's matching GOOGLE_OAUTH_CLIENT_ID")}
        className="w-full opacity-60 cursor-not-allowed">
        {button}
      </button>
    );
  }

  return (
    // The real GIS button renders invisibly on top of our styled button so
    // the credential flow (a Google-signed ID token, what the backend's
    // verifyIdToken() needs) stays intact while the visible button matches
    // the rest of the design system — GIS doesn't expose that level of
    // CSS control on its own rendered button.
    <div className="relative w-full">
      {button}
      <div className="absolute inset-0 opacity-0 overflow-hidden [&>div]:w-full [&_iframe]:!w-full">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => toast.error("Could not authorize with Google")}
          width="100%"
        />
      </div>
    </div>
  );
}

export default OAuth
