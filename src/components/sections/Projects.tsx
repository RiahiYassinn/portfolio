import { useState } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../ui/ProjectCard";
import WarpCarousel, { type WarpCard } from "../ui/warp-carousel";
import { projectsData } from "../../data/projects";
import Button from "../ui/Button";

const devLabCards: WarpCard[] = [
  {
    title: "Web\napplication",
    value: "WEB",
    footer: "Next.js",
    detail: "slider",
    labels: ["UI", "APP"],
    numeral: ["#73d3ff", "#c8faff"],
    accent: "#89e5ff",
    glow: "#159bce",
    mesh: ["#042338", "#06394c", "#0b6377", "#154f72", "#071d35"],
  },
  {
    title: "Service\nlayer",
    value: "API",
    footer: "NestJS + FastAPI",
    detail: "ring",
    numeral: ["#d5b6ff", "#f0dcff"],
    accent: "#d1a8ff",
    glow: "#8457d4",
    mesh: ["#23123e", "#451b61", "#7440a8", "#41216a", "#100d29"],
  },
  {
    title: "Event\nstreaming",
    value: "BUS",
    footer: "Kafka",
    detail: "wave",
    numeral: ["#8ef4d1", "#d1ffec"],
    accent: "#8ef4d1",
    glow: "#22a88b",
    mesh: ["#062e2c", "#08574c", "#168777", "#074f5f", "#071d2b"],
  },
  {
    title: "AI &\ndata",
    value: "RAG",
    footer: "PostgreSQL + MongoDB",
    detail: "cross",
    labels: ["DATA", "IN", "OUT"],
    numeral: ["#ffc58e", "#ffe4b8"],
    accent: "#ffc58e",
    glow: "#d97850",
    mesh: ["#30192a", "#873a39", "#c26a39", "#643959", "#1f1738"],
  },
];

const Projects: FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const loadMore = () => {
    setVisibleProjects((count) => Math.min(count + 3, projectsData.length));
  };

  return (
    <section
      id="projects"
      className="bg-light-300 py-20 dark:bg-dark-800 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Selected Projects"
          subtitle="Products and systems I’ve worked on across web development and applied AI."
        />

        <motion.article
          className="relative isolate mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-[1.75rem] bg-dark-800 text-white shadow-2xl shadow-primary-900/10 dark:bg-dark-900 dark:shadow-black/20 lg:grid-cols-[1.05fr_.95fr]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-primary-600/20 blur-3xl"
          />
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-300">
              End-of-Studies Project
            </p>
            <h3 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Dev.Lab<span className="text-accent-300">.</span>
            </h3>
            <p className="mt-5 max-w-xl leading-7 text-light-200">
              An AI-powered project built around an event-driven microservices
              architecture. Dev.Lab combines retrieval-augmented generation with
              a full-stack system spanning web, services, messaging, and data
              technologies.
            </p>

            <ul
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Dev.Lab technologies"
            >
              {[
                "Next.js",
                "NestJS",
                "FastAPI",
                "Kafka",
                "PostgreSQL",
                "MongoDB",
                "RAG",
              ].map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-light-100"
                >
                  {technology}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
            >
              Ask me about Dev.Lab <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="flex items-center border-t border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <WarpCarousel
              cards={devLabCards}
              ariaLabel="Dev.Lab architecture layers"
              background="#0b1120"
              interval={5.5}
              step={1}
              warp={0.65}
              className="rounded-2xl"
            />
          </div>
        </motion.article>

        <motion.div
          ref={ref}
          className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {visibleProjects < projectsData.length && (
          <div className="mt-10 flex justify-center">
            <Button
              onClick={loadMore}
              variant="outline"
              size="md"
              className="inline-flex items-center gap-2 rounded-xl border-primary-200 px-5 py-3 text-primary-700 hover:bg-primary-50 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-900/30"
            >
              Load more projects <ArrowDown size={16} aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
