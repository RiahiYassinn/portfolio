import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Menu, X, Sun, Moon } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-light-200/95 dark:bg-dark-600/95 shadow-md backdrop-blur-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.a
          href="#hero"
          className="text-xl font-bold text-primary-500 dark:text-accent-500 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono">{"<"}</span>
          <span className="mx-1 text-lg">Riahi Yassine</span>
          <span className="font-mono">{"/>"}</span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              staggerChildren: 0.1,
              delayChildren: 0.2,
            }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-dark-400 dark:text-light-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-light-300 dark:hover:bg-dark-400 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun size={20} className="text-light-200" />
              ) : (
                <Moon size={20} className="text-primary-500" />
              )}
            </button>
            <Button
              href="https://riahiyassine.my.canva.site"
              target="_blank"
              variant="primary"
              size="sm"
            >
              Resume
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Nav */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full mr-2"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <Sun size={20} className="text-light-200" />
            ) : (
              <Moon size={20} className="text-primary-500" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary-500 dark:text-accent-500"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-light-200 dark:bg-dark-600 shadow-lg py-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-3 px-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="py-2 text-dark-400 dark:text-light-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button
                href="/resume.pdf"
                target="_blank"
                variant="primary"
                size="sm"
                className="mt-2"
              >
                Resume
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
