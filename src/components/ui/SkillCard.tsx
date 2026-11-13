import React from "react";
import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  skills: string[];
  colorScheme: "primary" | "secondary" | "accent";
  delay?: number;
}

const colorConfig = {
  primary: {
    icon: "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200",
    marker: "bg-primary-500",
  },
  secondary: {
    icon: "bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-light-200",
    marker: "bg-secondary-500",
  },
  accent: {
    icon: "bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-200",
    marker: "bg-accent-500",
  },
};

const SkillCard: React.FC<SkillCardProps> = ({
  name,
  icon,
  skills,
  colorScheme,
  delay = 0,
}) => {
  const colors = colorConfig[colorScheme];

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay } },
      }}
      className="h-full rounded-2xl border border-light-600 bg-light-100 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-900/5 dark:border-dark-400 dark:bg-dark-700 dark:hover:border-primary-700"
    >
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${colors.icon}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-dark-800 dark:text-light-100">{name}</h3>
      <ul className="mt-4 space-y-2.5">
        {skills.map((skill) => (
          <li key={skill} className="flex items-start gap-2.5 text-sm leading-5 text-dark-400 dark:text-light-300">
            <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${colors.marker}`} />
            {skill}
          </li>
        ))}
      </ul>
    </motion.article>
  );
};

export default SkillCard;
