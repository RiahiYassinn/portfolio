import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45 }}
    >
      <h2 className="text-3xl font-semibold tracking-tight text-dark-800 dark:text-light-100 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-dark-400 dark:text-light-300 sm:text-lg">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
