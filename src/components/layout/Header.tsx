import { useEffect, useState } from "react";
import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import resumeUrl from "../../assets/CV Riahi Yassine ( Anglais ).pdf";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Header: FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 16);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const sections = ["hero", ...links.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-light-600/80 bg-light-500/90 py-3 shadow-sm backdrop-blur-xl dark:border-dark-400/80 dark:bg-dark-800/90"
          : "border-transparent bg-light-500/70 py-4 backdrop-blur-md dark:bg-dark-800/60"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 md:px-6">
        <a
          href="#hero"
          onClick={closeMobileMenu}
          className="inline-flex shrink-0 items-center gap-2.5 rounded-lg text-dark-800 dark:text-light-100"
          aria-label="Yassine Riahi, home"
        >
          <span className="font-mono">{"<"}</span>
          <span className="mx-1 text-lg">Riahi Yassine</span>
          <span className="font-mono">{"/>"}</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-full border border-light-600/80 bg-light-100/70 p-1 dark:border-dark-400/80 dark:bg-dark-700/60 md:flex"
        >
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-light-100 text-primary-700 shadow-sm dark:bg-dark-500 dark:text-accent-300"
                    : "text-dark-400 hover:text-dark-800 dark:text-light-300 dark:hover:text-light-100"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-full text-dark-400 transition-colors hover:bg-light-300 hover:text-primary-700 dark:text-light-300 dark:hover:bg-dark-600 dark:hover:text-accent-300"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 dark:bg-accent-500 dark:text-dark-900 dark:hover:bg-accent-400 sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-dark-500 transition-colors hover:bg-light-300 dark:text-light-200 dark:hover:bg-dark-600 md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full border-b border-light-600 bg-light-100/95 px-4 pb-5 pt-3 shadow-lg backdrop-blur-xl dark:border-dark-400 dark:bg-dark-700/95 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="container mx-auto flex max-w-lg flex-col gap-1">
              {links.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={closeMobileMenu}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
                        : "text-dark-500 hover:bg-light-300 dark:text-light-200 dark:hover:bg-dark-600"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="mt-2 rounded-xl bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-accent-500 dark:text-dark-900"
              >
                View resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
