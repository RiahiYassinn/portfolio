import { Brain, Code2, Database, Layers3, Server, Workflow } from "lucide-react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import SkillCard from "../ui/SkillCard";

const skillCategories = [
  {
    name: "Frontend",
    icon: <Code2 size={24} strokeWidth={1.8} />,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    color: "primary",
  },
  {
    name: "Backend",
    icon: <Server size={24} strokeWidth={1.8} />,
    skills: ["NestJS", "FastAPI", "Node.js", "Express", "REST APIs"],
    color: "secondary",
  },
  {
    name: "Architecture & AI",
    icon: <Brain size={24} strokeWidth={1.8} />,
    skills: ["Event-driven microservices", "Kafka", "RAG", "AI-powered features"],
    color: "accent",
  },
  {
    name: "Data",
    icon: <Database size={24} strokeWidth={1.8} />,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "SQL", "Database design"],
    color: "primary",
  },
  {
    name: "Programming",
    icon: <Layers3 size={24} strokeWidth={1.8} />,
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C#"],
    color: "secondary",
  },
  {
    name: "Tools & Workflow",
    icon: <Workflow size={24} strokeWidth={1.8} />,
    skills: ["Git", "GitHub", "Docker", "CI/CD", "CLI"],
    color: "accent",
  },
];

const Skills: FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="bg-light-300 py-20 dark:bg-dark-800 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Skills & Expertise" subtitle="Tools and concepts represented in my work." />

        <motion.div
          ref={ref}
          className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.name}
              name={category.name}
              icon={category.icon}
              skills={category.skills}
              colorScheme={category.color as "primary" | "secondary" | "accent"}
              delay={index * 0.04}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
