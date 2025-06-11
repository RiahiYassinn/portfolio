import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import SkillCard from "../ui/SkillCard";
import {
  Code,
  Database,
  Globe,
  Layout,
  Server,
  Smartphone,
  Terminal,
  GitBranch,
} from "lucide-react";

// Skill categories with associated technologies
const skillCategories = [
  {
    name: "Frontend",
    icon: <Layout size={36} />,
    skills: [
      "React",
      "HTML/CSS",
      "JavaScript",
      "TypeScript",
      "Responsive Design",
    ],
    color: "primary",
  },
  {
    name: "Backend",
    icon: <Server size={36} />,
    skills: ["Node.js", "Express", "RESTful APIs", "Python", "Java"],
    color: "secondary",
  },
  {
    name: "Database",
    icon: <Database size={36} />,
    skills: ["SQL", "MongoDB", "PostgreSQL", "Database Design", "ORM"],
    color: "primary",
  },
  {
    name: "Programming",
    icon: <Code size={36} />,
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
    color: "secondary",
  },
  {
    name: "Web Services",
    icon: <Globe size={36} />,
    skills: ["RESTful APIs", "GraphQL", "Authentication", "Cloud Services"],
    color: "accent",
  },
  {
    name: "Development Tools",
    icon: <Terminal size={36} />,
    skills: ["VS Code", "CLI", "Webpack", "npm/yarn", "Docker"],
    color: "primary",
  },
  {
    name: "Version Control",
    icon: <GitBranch size={36} />,
    skills: ["Git", "GitHub", "CI/CD", "Code Reviews", "Branching Strategies"],
    color: "secondary",
  },
];

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-20 bg-light-500 dark:bg-dark-600 relative"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="Technologies I've been working with"
        />

        <motion.div
          ref={ref}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.name}
              name={category.name}
              icon={category.icon}
              skills={category.skills}
              colorScheme={category.color as "primary" | "secondary" | "accent"}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
