import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { IProject } from '../../data/projects';

interface ProjectCardProps {
  project: IProject;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className="bg-white dark:bg-dark-600 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-light-300 dark:border-dark-400 flex flex-col h-full"
      variants={cardVariants}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-primary-500 dark:text-light-100">
              {project.title}
            </h3>
            <div className="flex space-x-2">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-primary-500 dark:text-light-300 dark:hover:text-accent-500 transition-colors"
                  aria-label="View source code on GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-primary-500 dark:text-light-300 dark:hover:text-accent-500 transition-colors"
                  aria-label="View live project"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
          
          <p className="text-dark-400 dark:text-light-300 mb-4">
            {project.description}
          </p>
        </div>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs rounded-md bg-light-300 dark:bg-dark-400 text-dark-500 dark:text-light-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;