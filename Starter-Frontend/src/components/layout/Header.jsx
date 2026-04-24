import { useState } from "react";
import { FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const userName = user?.username || "User";
  const baseLinkClass = "transition hover:text-[#ffc3d4]";

  function handleLogout() {
    logout();
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="bg-[linear-gradient(90deg,#2f3792_0%,#1f2350_100%)] text-white shadow-[0_10px_28px_rgba(17,21,58,0.45)]">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="rounded-full bg-[linear-gradient(90deg,#ff6a8d_0%,#ff2f74_100%)] px-4 py-1.5 text-lg font-bold tracking-wide shadow-[0_6px_20px_rgba(255,68,135,0.4)]"
            >
              Starter
            </Link>
          </div>
          <ul className="hidden md:flex items-center space-x-8 text-sm font-semibold">
            <li>
              <Link to="/" className={baseLinkClass}>Home</Link>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login" className={baseLinkClass}>Login</Link>
                </li>
                <li>
                  <Link to="/register" className={baseLinkClass}>Register</Link>
                </li>
              </>
            )}

            {isAuthenticated && (
              <>
                <li>
                  <Link to="/profile" className="inline-flex items-center gap-2 transition hover:text-[#ffc3d4]">
                    <FiUser />
                    Profile
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/admin/dashboard" className={baseLinkClass}>Dashboard Admin</Link>
                  </li>
                )}
                <li className="rounded-full bg-[#2a2f68] px-3 py-1 text-xs tracking-wide text-[#d3d8ff]">
                  {isAdmin ? "ADMIN" : "USER"}
                </li>
                <li className="text-[#f9d4de]">{userName}</li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#7078cb] px-3 py-1.5 text-xs uppercase tracking-wide text-white transition hover:bg-[#2a2f68]"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
          <button
            type="button"
            className="md:hidden rounded-lg bg-[#2a2f68] p-2 hover:bg-[#1f2350]"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <ul id="mobile-nav" className="pb-4 md:hidden space-y-2 text-sm font-semibold">
            <li>
              <Link
                to="/"
                className="block rounded-lg bg-[#2a2f68] px-4 py-2 transition hover:bg-[#1f2350]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block rounded-lg bg-[#2a2f68] px-4 py-2 transition hover:bg-[#1f2350]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block rounded-lg bg-[#2a2f68] px-4 py-2 transition hover:bg-[#1f2350]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && (
              <>
                <li className="rounded-lg bg-[#2a2f68] px-4 py-2 text-[#f9d4de]">
                  Signed in as {userName}
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block rounded-lg bg-[#2a2f68] px-4 py-2 transition hover:bg-[#1f2350]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                </li>

                {isAdmin && (
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block rounded-lg bg-[#2a2f68] px-4 py-2 transition hover:bg-[#1f2350]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard Admin
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    className="block w-full rounded-lg bg-[#2a2f68] px-4 py-2 text-left transition hover:bg-[#1f2350]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}