import type { FC } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import profileImage from "../../assets/Gemini_Generated_Image_5d4daq5d4daq5d4d (1).jpg";
import SectionHeader from "../ui/SectionHeader";

const focusAreas = [
  "Full-stack development",
  "Applied AI",
  "Software architecture",
  "Event-driven systems",
];

const About: FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <section id="about" className="relative bg-light-100/70 py-20 dark:bg-dark-700/65 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="About Me" subtitle="Engineer by training, curious by nature." />

        <div ref={ref} className="mx-auto mt-14 grid max-w-5xl items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
          <motion.div
            className="relative mx-auto w-full max-w-sm"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55 }}
          >
            <div aria-hidden="true" className="absolute -inset-3 rotate-3 rounded-[2rem] border border-accent-300/70 dark:border-accent-700/70" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-light-600 bg-light-300 shadow-xl shadow-dark-900/10 dark:border-dark-400 dark:bg-dark-600">
              <img
                src={profileImage}
                alt="Portrait of Yassine Riahi"
                className="aspect-[4/5] w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-900/80 via-dark-900/25 to-transparent p-5 pt-16">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-300">Computer Science Engineer</p>
                <p className="mt-1 text-lg font-semibold text-white">Yassine Riahi</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <p className="font-mono text-sm tracking-wide text-primary-600 dark:text-primary-300">A little about how I work</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-dark-800 dark:text-light-100 sm:text-4xl">
              From a solid foundation to software people can use.
            </h3>
            <p className="mt-5 leading-7 text-dark-400 dark:text-light-300">
              I’m a Computer Science Engineer and recent graduate interested in building useful products across full-stack web development and applied AI. I enjoy working through a problem from its interface and API to the data and services behind it.
            </p>
            <p className="mt-4 leading-7 text-dark-400 dark:text-light-300">
              My End-of-Studies Project, <span className="font-semibold text-dark-700 dark:text-light-100">Dev.Lab</span>, brings these interests together through AI-powered features, retrieval-augmented generation, and an event-driven microservices architecture.
            </p>

            <div className="mt-8 border-t border-light-600 pt-6 dark:border-dark-400">
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-dark-500 dark:text-light-200">Areas I focus on</h4>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {focusAreas.map((area) => (
                  <li key={area} className="flex items-center gap-3 text-sm text-dark-400 dark:text-light-300">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                    {area}
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
