import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-primary-500 dark:text-light-100 relative inline-block">
        {title}
        <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent-500 transform origin-left"></span>
      </h2>
      <p className="text-lg text-dark-400 dark:text-light-300 max-w-xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SectionHeader;