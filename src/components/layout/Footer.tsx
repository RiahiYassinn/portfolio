import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
  <footer className="border-t border-light-600 bg-light-100/80 py-7 dark:border-dark-400 dark:bg-dark-800/80">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
      <div>
        <p className="text-sm font-medium text-dark-500 dark:text-light-200">&copy; {new Date().getFullYear()} Yassine Riahi</p>
        <p className="mt-1 text-xs text-dark-300 dark:text-light-400">{t("footer.credit")}</p>
      </div>
      <nav aria-label={t("footer.social")} className="flex items-center gap-2">
        <a href="https://github.com/RiahiYassinn" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full p-2.5 text-dark-300 transition-colors hover:bg-light-300 hover:text-primary-700 dark:text-light-400 dark:hover:bg-dark-600 dark:hover:text-accent-300">
          <Github size={18} />
        </a>
        <a href="https://www.linkedin.com/in/yassine-riahi-63a69b242/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-dark-300 transition-colors hover:bg-light-300 hover:text-primary-700 dark:text-light-400 dark:hover:bg-dark-600 dark:hover:text-accent-300">
          <Linkedin size={18} />
        </a>
        <a href="mailto:yassineriahi540@gmail.com" aria-label="Email" className="rounded-full p-2.5 text-dark-300 transition-colors hover:bg-light-300 hover:text-primary-700 dark:text-light-400 dark:hover:bg-dark-600 dark:hover:text-accent-300">
          <Mail size={18} />
        </a>
      </nav>
    </div>
  </footer>
  );
};

export default Footer;
