import { Blocks, Brain, Code2, Database, Server, Workflow } from "lucide-react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import SkillCard from "../ui/SkillCard";
import { useLanguage } from "../../i18n/LanguageContext";

const skillCategories = [
  {
    key: "skills.frontend",
    icon: <Code2 size={24} strokeWidth={1.8} />,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    color: "primary",
  },
  {
    key: "skills.backend",
    icon: <Server size={24} strokeWidth={1.8} />,
    skills: ["NestJS", "FastAPI", "Node.js", "Python", "Java"],
    color: "secondary",
  },
  {
    key: "skills.ai",
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
    key: "skills.architecture",
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
    key: "skills.data",
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
    key: "skills.devops",
    icon: <Workflow size={24} strokeWidth={1.8} />,
    skills: ["Git & GitHub", "Docker", "CI/CD Pipelines", "Linux / CLI"],
    color: "accent",
  },
];

const Skills: FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="skills"
      className="bg-light-300/70 py-20 dark:bg-dark-800/65 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
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
              key={category.key}
              name={t(category.key)}
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
