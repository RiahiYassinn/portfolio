import type { FC } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import profileImage from "../../assets/Gemini_Generated_Image_5d4daq5d4daq5d4d (1).jpg";
import SectionHeader from "../ui/SectionHeader";
import { useLanguage } from "../../i18n/LanguageContext";

const focusAreas = ["about.area1", "about.area2", "about.area3", "about.area4"];

const About: FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <section
      id="about"
      className="relative bg-light-100/70 py-20 dark:bg-dark-700/65 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />

        <div
          ref={ref}
          className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-16"
        >
          <motion.div
            className="relative mx-auto w-full max-w-sm"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55 }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rotate-3 rounded-[2rem] border border-accent-300/70 dark:border-accent-700/70"
            />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-light-600 bg-light-300 shadow-xl shadow-dark-900/10 dark:border-dark-400 dark:bg-dark-600">
              <img
                src={profileImage}
                alt="Portrait of Yassine Riahi"
                className="aspect-[4/5] w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-900/80 via-dark-900/25 to-transparent p-5 pt-16">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-300">
                  {t("about.role")}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Yassine Riahi
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <p className="font-mono text-sm tracking-wide text-primary-600 dark:text-primary-300">
              {t("about.open")}
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-dark-800 dark:text-light-100 sm:text-4xl">
              {t("about.heading")}
            </h3>
            <p className="mt-5 leading-7 text-dark-400 dark:text-light-300">{t("about.p1")} <span className="font-medium text-dark-700 dark:text-light-100">{t("about.emphasis")}</span>{t("about.p1b")}</p>
            <p className="mt-4 leading-7 text-dark-400 dark:text-light-300">{t("about.p2")}</p>

            <div className="mt-8 border-t border-light-600 pt-6 dark:border-dark-400">
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-dark-500 dark:text-light-200">
                {t("about.areas")}
              </h4>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {focusAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 text-sm text-dark-400 dark:text-light-300"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent-500"
                    />
                    {t(area)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
