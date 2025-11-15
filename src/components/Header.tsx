import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "../tools/ThemeToogle"; 

const navItems = [
  { label: "About", to: "/about" },
  { label: "Files", to: "/files" },
  { label: "Vault", to: "/vault" },
  { label: "Settings", to: "/settings" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-whitestone dark:bg-darkbg transition-colors duration-300 z-50 shadow-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-darkbg dark:text-whitestone" to="/">
                <span className="sr-only">Home</span>
                <h1 className="font-light ">Secure Kit</h1>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {navItems.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        className="text-darkbg dark:text-whitestone transition "
                        to={to}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-blueee px-5 py-2.5 text-sm font-medium text-whitestone shadow-sm"
                  to="/login"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-whitestone px-5 py-2.5 text-sm font-medium text-blueee"
                    to="/signup"
                  >
                    Register
                  </Link>
                </div>
              </div>

              <div className="block md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="rounded-sm bg-whitestone dark:bg-darkbg p-2 text-darkbg dark:text-whitestone transition hover:text-blueee"
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <HiX className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiMenu className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav
              className="md:hidden mt-2 flex flex-col items-center text-sm px-2 pb-4"
              aria-label="Mobile Navigation"
            >
              <ul className="flex flex-col gap-6 w-full max-w-xs">
                {navItems.map(({ label, to }) => (
                  <li key={label} className="w-full">
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-darkbg dark:text-whitestone  text-center w-full"
                      to={to}
                    >
                      {label}
                    </Link>
                  </li>
                ))}

                <li className="w-full flex justify-center">
                  <ThemeToggle />
                </li>

                <li className="w-full">
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md bg-whitestone px-5 py-2.5 text-center text-sm font-medium text-blueee"
                    to="/signup"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
export default Header;
