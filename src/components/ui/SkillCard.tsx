import React from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  skills: string[];
  colorScheme: 'primary' | 'secondary' | 'accent';
  delay?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  name, 
  icon, 
  skills,
  colorScheme,
  delay = 0 
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: delay,
      },
    },
  };

  // Map color scheme to specific colors
  const colorConfig = {
    primary: {
      bg: 'bg-primary-50 dark:bg-primary-900/30',
      border: 'border-primary-200 dark:border-primary-700',
      icon: 'text-primary-500 dark:text-primary-400',
      title: 'text-primary-600 dark:text-primary-300'
    },
    secondary: {
      bg: 'bg-secondary-50 dark:bg-secondary-900/30',
      border: 'border-secondary-200 dark:border-secondary-700',
      icon: 'text-secondary-500 dark:text-secondary-400',
      title: 'text-secondary-600 dark:text-secondary-300'
    },
    accent: {
      bg: 'bg-accent-50 dark:bg-accent-900/30',
      border: 'border-accent-200 dark:border-accent-700',
      icon: 'text-accent-500 dark:text-accent-400',
      title: 'text-accent-600 dark:text-accent-300'
    }
  };

  const colors = colorConfig[colorScheme];

  return (
    <motion.div
      className={`p-6 rounded-lg border ${colors.border} ${colors.bg} h-full`}
      variants={cardVariants}
    >
      <div className={`${colors.icon} mb-4`}>
        {icon}
      </div>
      
      <h3 className={`text-xl font-bold mb-3 ${colors.title}`}>
        {name}
      </h3>
      
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li 
            key={index} 
            className="flex items-center text-dark-400 dark:text-light-300"
          >
            <span className={`${colors.icon} mr-2 text-sm`}>▹</span> {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillCard;