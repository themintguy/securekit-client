import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "../tools/ThemeToogle"; 

const navItems = [
  { label: "Home", to: "/" },
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
    <header className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600 dark:text-teal-400" to="/">
              <span className="sr-only">Home</span>
              <h1 className="font-light">Secure Kit</h1>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {navItems.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      className="text-gray-500 dark:text-gray-300 transition hover:text-gray-500/75 dark:hover:text-gray-100"
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
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                to="/login"
              >
                Login
              </Link>

              <div className="hidden sm:flex">
                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                  to="/signup"
                >
                  Register
                </Link>
              </div>
            </div>

            <div className="block md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="rounded-sm bg-gray-100 dark:bg-gray-800 p-2 text-gray-600 dark:text-gray-200 transition hover:text-gray-600/75"
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
                    className="block text-gray-700 dark:text-gray-200 hover:text-teal-600 text-center w-full"
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
                  className="block rounded-md bg-gray-100 px-5 py-2.5 text-center text-sm font-medium text-teal-600"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
