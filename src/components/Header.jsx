import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegistryMark from "./RegistryMark";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Offers", path: "/offers" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState("Sign in");
  const auth = getAuth();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setPageState(user ? "Profile" : "Sign in");
    });
  }, [auth]);

  const isActive = (route) =>
    route === location.pathname ||
    (route === "/profile" &&
      (location.pathname === "/sign-in" || location.pathname === "/profile"));

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-paper-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 sm:gap-2.5 text-ink shrink-0"
        >
          <RegistryMark className="h-7 w-7 sm:h-8 sm:w-8 text-ink" />
          <span className="hidden sm:inline font-mono text-sm font-semibold uppercase tracking-stamped">
            GidaListing
          </span>
        </button>

        <nav>
          <ul className="flex items-center gap-4 sm:gap-8">
            {NAV_ITEMS.map(({ label, path }) => (
              <li key={path}>
                <button
                  onClick={() => navigate(path)}
                  className={`relative py-5 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-stamped
                    transition-colors duration-150 ease-in-out
                    ${isActive(path) ? "text-ink" : "text-ink-faint hover:text-ink-soft"}`}
                >
                  {label}
                  {isActive(path) && (
                    <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-stamp" />
                  )}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/profile")}
                className={`relative py-5 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-stamped
                  transition-colors duration-150 ease-in-out
                  ${isActive("/profile") ? "text-ink" : "text-ink-faint hover:text-ink-soft"}`}
              >
                {pageState}
                {isActive("/profile") && (
                  <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-stamp" />
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
