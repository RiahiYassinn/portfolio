import React from "react";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-light-200 dark:bg-dark-600 border-t border-light-300 dark:border-dark-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-dark-400 dark:text-light-300">
              &copy; {currentYear} Riahi Yassine . All rights reserved.
            </p>
            <p className="text-xs text-dark-300 dark:text-light-400 mt-1">
              Designed & Built with ❤️
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/RiahiYassinn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 dark:text-light-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/yassine-riahi-63a69b242/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 dark:text-light-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.facebook.com/yassi.riahi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 dark:text-light-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
              aria-label="Twitter"
            >
              <Facebook size={20} />
            </a>
            <a
              href="mailto:yassineriahi540@gmail.com"
              className="text-dark-400 dark:text-light-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
