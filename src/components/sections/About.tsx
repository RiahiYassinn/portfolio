import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const profileImage =
    "https://raw.githubusercontent.com/RiahiYassinn/portfolio/main/src/assets/Image 25 juin 2025.png";

  return (
    <section
      id="about"
      className="py-20 bg-light-100 dark:bg-dark-500 relative"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="About Me" subtitle="Get to know me better" />

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
        >
          <motion.div
            className="lg:col-span-3 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-dark-400 dark:text-light-300 mb-4 leading-relaxed">
              {" "}
              Hello! I'm a final-year software engineering student, passionate
              about crafting efficient and user-friendly applications. My
              journey in programming started in high school, where I first
              discovered the power of code to creatively solve real-world
              problems.{" "}
            </p>
            <p className="text-dark-400 dark:text-light-300 mb-4 leading-relaxed">
              {" "}
              Throughout my academic journey, I've built a strong foundation in
              computer science principles, software architecture, and modern
              development practices. My primary focus lies at the intersection
              of full-stack web development and artificial intelligence, where I
              enjoy building intelligent systems and dynamic web experiences.{" "}
            </p>
            <p className="text-dark-400 dark:text-light-300 mb-6 leading-relaxed">
              {" "}
              I am currently seeking a 6-month internship to complete my
              studies, where I can apply my technical skills, learn from
              seasoned professionals, and make a meaningful contribution to
              impactful projects. I am particularly eager to find opportunities
              in full-stack development or applied AI and machine learning.{" "}
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-500 dark:text-accent-500 mb-3">
                Some technologies I've been working with:
              </h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Node.js",
                  "Python",
                  "Java",
                  "SQL",
                  "Git",
                  "Docker",
                ].map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center text-dark-400 dark:text-light-300"
                  >
                    <span className="text-accent-500 mr-2">▹</span> {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg">
              <div className="absolute inset-0 rounded-lg border-2 border-accent-500 transform translate-x-4 translate-y-4 z-0" />
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg relative z-10 shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
