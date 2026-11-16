import { Blocks, Brain, Code2, Database, Server, Workflow } from "lucide-react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import SkillCard from "../ui/SkillCard";

const skillCategories = [
  {
    name: "Frontend Development",
    icon: <Code2 size={24} strokeWidth={1.8} />,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    color: "primary",
  },
  {
    name: "Backend Engineering",
    icon: <Server size={24} strokeWidth={1.8} />,
    skills: ["NestJS", "FastAPI", "Node.js", "Python", "Java"],
    color: "secondary",
  },
  {
    name: "Applied AI",
    icon: <Brain size={24} strokeWidth={1.8} />,
    skills: [
      "RAG Pipelines",
      "LLM Integration",
      "Prompt Engineering",
      "AI Workflows",
    ],
    color: "accent",
  },
  {
    name: "System Architecture",
    icon: <Blocks size={24} strokeWidth={1.8} />,
    skills: [
      "Microservices",
      "Event-Driven Design",
      "Apache Kafka",
      "System Design",
    ],
    color: "primary",
  },
  {
    name: "Databases & Data",
    icon: <Database size={24} strokeWidth={1.8} />,
    skills: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Vector Search",
      "Data Modeling",
    ],
    color: "secondary",
  },
  {
    name: "DevOps & Workflow",
    icon: <Workflow size={24} strokeWidth={1.8} />,
    skills: ["Git & GitHub", "Docker", "CI/CD Pipelines", "Linux / CLI"],
    color: "accent",
  },
];

const Skills: FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="skills"
      className="bg-light-300/70 py-20 dark:bg-dark-800/65 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="Technologies and architectural patterns I use to build scalable systems."
        />

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
              delay={index * 0.08}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
