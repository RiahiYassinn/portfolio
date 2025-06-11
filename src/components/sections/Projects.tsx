import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import { projectsData } from '../../data/projects';
import Button from '../ui/Button';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [visibleProjects, setVisibleProjects] = useState(3);

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projectsData.length));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-light-100 dark:bg-dark-500 relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          title="Featured Projects" 
          subtitle="Some things I've built" 
        />
        
        <motion.div
          ref={ref}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
        
        {visibleProjects < projectsData.length && (
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={loadMore} 
              variant="outline" 
              size="lg"
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;