import { useState, useRef } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
} from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { projectsData } from "../../data/projects";

// Visual themes matching the WarpCarousel mesh & glow aesthetic for each project
const cardThemes = [
  {
    badge: "01 / FLAGSHIP",
    accent: "#89e5ff",
    glow: "rgba(21, 155, 206, 0.25)",
    gradient:
      "radial-gradient(circle at 85% 15%, #0b6377 0%, #042338 45%, #071d35 100%)",
    border: "border-cyan-400/30",
  },
  {
    badge: "02 / AI & FULL-STACK",
    accent: "#8ef4d1",
    glow: "rgba(34, 168, 139, 0.25)",
    gradient:
      "radial-gradient(circle at 85% 15%, #168777 0%, #062e2c 45%, #071d2b 100%)",
    border: "border-emerald-400/30",
  },
  {
    badge: "03 / MARKETPLACE",
    accent: "#d1a8ff",
    glow: "rgba(132, 87, 212, 0.25)",
    gradient:
      "radial-gradient(circle at 85% 15%, #7440a8 0%, #23123e 45%, #100d29 100%)",
    border: "border-purple-400/30",
  },
  {
    badge: "04 / AI AGENT",
    accent: "#ffc58e",
    glow: "rgba(217, 120, 80, 0.25)",
    gradient:
      "radial-gradient(circle at 85% 15%, #c26a39 0%, #30192a 45%, #1f1738 100%)",
    border: "border-orange-400/30",
  },
  {
    badge: "05 / MOBILE & MAPS",
    accent: "#73d3ff",
    glow: "rgba(21, 155, 206, 0.25)",
    gradient:
      "radial-gradient(circle at 85% 15%, #154f72 0%, #06394c 45%, #071d35 100%)",
    border: "border-sky-400/30",
  },
  {
    badge: "06 / E-COMMERCE",
    accent: "#f0dcff",
    glow: "rgba(132, 87, 212, 0.25)",
    gradient:
      "radial-gradient(circle at 85% 15%, #451b61 0%, #23123e 45%, #100d29 100%)",
    border: "border-indigo-400/30",
  },
  {
    badge: "07 / FINTECH",
    accent: "#ffe4b8",
    glow: "rgba(217, 120, 80, 0.25)",
    gradient:
      "radial-gradient(circle at 85% 15%, #873a39 0%, #30192a 45%, #1f1738 100%)",
    border: "border-amber-400/30",
  },
];

const Projects: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToProject = (index: number) => {
    const clampedIndex = (index + projectsData.length) % projectsData.length;
    setActiveIndex(clampedIndex);

    if (carouselRef.current) {
      const cardElement = carouselRef.current.children[
        clampedIndex
      ] as HTMLElement;
      if (cardElement) {
        carouselRef.current.scrollTo({
          left:
            cardElement.offsetLeft -
            carouselRef.current.offsetWidth / 2 +
            cardElement.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  };

  // Update activeIndex on manual horizontal scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - elCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  };

  return (
    <section
      id="projects"
      className="overflow-hidden bg-light-300/70 py-20 dark:bg-dark-800/65 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            title="Selected Projects"
            subtitle="Swipe or scroll through full-stack systems, microservices architectures, and applied AI products."
          />

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-dark-500 dark:text-light-300">
              0{activeIndex + 1} / 0{projectsData.length}
            </span>
            <button
              onClick={() => scrollToProject(activeIndex - 1)}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-800/15 bg-white text-dark-800 shadow-sm transition-all hover:scale-105 hover:bg-primary-600 hover:text-white dark:border-white/15 dark:bg-dark-900 dark:text-white dark:hover:bg-primary-500"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollToProject(activeIndex + 1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-800/15 bg-white text-dark-800 shadow-sm transition-all hover:scale-105 hover:bg-primary-600 hover:text-white dark:border-white/15 dark:bg-dark-900 dark:text-white dark:hover:bg-primary-500"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Warp-Style Card Track */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[7.5vw] pb-10 pt-4 no-scrollbar md:px-[15vw] lg:px-[22vw]"
      >
        {projectsData.map((project, index) => {
          const theme = cardThemes[index % cardThemes.length];
          const isActive = index === activeIndex;

          return (
            <motion.article
              key={project.id}
              onClick={() => scrollToProject(index)}
              animate={{
                scale: isActive ? 1 : 0.92,
                opacity: isActive ? 1 : 0.55,
                rotateY: isActive ? 0 : index < activeIndex ? 6 : -6,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              style={{
                background: theme.gradient,
                boxShadow: isActive
                  ? `0 25px 60px -15px ${theme.glow}`
                  : "none",
              }}
              className={`relative flex w-[85vw] max-w-[780px] flex-shrink-0 cursor-pointer snap-center flex-col justify-between overflow-hidden rounded-[2rem] border ${theme.border} p-6 text-white transition-colors sm:p-8 lg:min-h-[460px] lg:flex-row lg:gap-8 lg:p-10`}
            >
              {/* Subtle ambient mesh glow */}
              <div
                aria-hidden="true"
                style={{ backgroundColor: theme.accent }}
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-15 blur-3xl"
              />

              {/* Left Column: All Project Info */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      style={{ color: theme.accent }}
                      className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
                    >
                      {theme.badge}
                    </span>
                    <span className="font-mono text-xs text-white/40">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {project.title}
                    <span style={{ color: theme.accent }}>.</span>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-light-100/90 sm:text-base">
                    {project.description}
                  </p>

                  {/* Full Tech Stack Pills */}
                  <ul
                    className="mt-6 flex flex-wrap gap-1.5"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Links */}
                <div className="mt-8 flex flex-wrap items-center gap-5 pt-4 border-t border-white/10">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: theme.accent }}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                    >
                      <Github size={16} /> Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: theme.accent }}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {/* {project.id === 0 && (
                    <a
                      href="#contact"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: theme.accent }}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                    >
                      Ask me about Dev.Lab <ArrowRight size={16} />
                    </a>
                  )} */}
                </div>
              </div>

              {/* Right Column: Visual Preview Card */}
              <div className="mt-6 flex flex-col justify-between lg:mt-0 lg:w-[42%]">
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/15 bg-black/30 sm:h-56 lg:h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Bottom Dot Indicators */}
      <div className="mt-2 flex justify-center gap-2">
        {projectsData.map((project, idx) => (
          <button
            key={project.id}
            onClick={() => scrollToProject(idx)}
            aria-label={`Go to ${project.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-8 bg-primary-600 dark:bg-accent-300"
                : "w-2 bg-dark-800/20 hover:bg-dark-800/40 dark:bg-white/20 dark:hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
