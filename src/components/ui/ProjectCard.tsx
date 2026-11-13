import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { IProject } from "../../data/projects";

interface ProjectCardProps {
  project: IProject;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <motion.article
    variants={{
      hidden: { opacity: 0, y: 18 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.05 } },
    }}
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-light-600 bg-light-100 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-dark-900/5 dark:border-dark-400 dark:bg-dark-700 dark:hover:border-primary-700 dark:hover:shadow-black/20"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-light-300 dark:bg-dark-600">
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark-900/35 via-transparent to-transparent opacity-70" />
    </div>

    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-dark-800 dark:text-light-100">{project.title}</h3>
        <div className="flex shrink-0 items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-dark-300 transition-colors hover:bg-light-300 hover:text-primary-700 dark:text-light-400 dark:hover:bg-dark-500 dark:hover:text-accent-300"
              aria-label={`View ${project.title} source code on GitHub`}
              title="View source code"
            >
              <Github size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-dark-300 transition-colors hover:bg-light-300 hover:text-primary-700 dark:text-light-400 dark:hover:bg-dark-500 dark:hover:text-accent-300"
              aria-label={`Open ${project.title} live site`}
              title="Open live project"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-dark-400 dark:text-light-300">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => (
          <li key={technology} className="rounded-full border border-light-600 bg-light-200 px-2.5 py-1 text-xs font-medium text-dark-400 dark:border-dark-400 dark:bg-dark-600 dark:text-light-300">
            {technology}
          </li>
        ))}
      </ul>
    </div>
  </motion.article>
);

export default ProjectCard;
