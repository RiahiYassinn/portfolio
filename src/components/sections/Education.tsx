import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { GraduationCap, Award, BookOpen, ExternalLink } from "lucide-react";

const Education: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      degree: "Engineering Cycle in Computer Science (2nd Year)",
      institution:
        "Private Higher School of Engineering and Technology (ESPRIT)",
      duration: "Sept 2021 - Present",
      description:
        "Focusing on software architecture, algorithms, web development, and database systems.",
      courses: [
        "Data Structures & Algorithms",
        "Software Engineering Principles",
        "Database Systems",
        "Web Development",
      ],
      icon: <GraduationCap size={24} className="text-accent-500" />,
    },
    {
      degree: "Relevant Certifications",
      institution: "Various Platforms",
      duration: "2022 - Present",
      description:
        "Continuously improving skills through online courses and certifications in various technologies.",
      courses: [
        "Graph Developer - Associate",
        "GitHub Foundations",
        "Cloud Foundations",
        "Python Essentials",
      ],
      links: [
        "https://www.apollographql.com/tutorials/certifications/979b5748-dd80-491f-8101-7e26ffd75e77",
        "https://www.credly.com/badges/487547e5-3580-4d5b-9daf-189f097dd3d8/linked_in_profile",
        "https://www.credly.com/badges/34b05406-2a24-41bc-b54a-7373ab5ca5cc",
        "https://www.credly.com/badges/7d23b623-550c-4510-bd34-e37d2940178c/linked_in_profile",
      ],
      icon: <Award size={24} className="text-accent-500" />,
    },
    {
      degree: "Baccalauréat in Experimental Science",
      institution: "Mahmoud Messaidi High School, Majaz Al Bab",
      duration: "Sept 2015 - Jun 2020",
      description: "",
      courses: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
      ],
      icon: <BookOpen size={24} className="text-accent-500" />,
    },
  ];

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleCertificateClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="education"
      className="py-20 bg-light-100 dark:bg-dark-500 relative"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Education" subtitle="My academic background" />

        <motion.div
          ref={ref}
          className="mt-12 relative"
          variants={timelineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-700"></div>

          {education.map((item, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } mb-12`}
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 rounded-full bg-accent-500 border-4 border-light-100 dark:border-dark-500"></div>

              {/* Content */}
              <div
                className={`md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                } pl-8 md:pl-0`}
              >
                <div className="bg-white dark:bg-dark-600 p-6 rounded-lg shadow-md border border-light-300 dark:border-dark-400 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    {item.icon}
                    <h3 className="text-xl font-bold text-primary-500 dark:text-light-100 ml-2">
                      {item.degree}
                    </h3>
                  </div>

                  <p className="text-accent-600 dark:text-accent-400 font-medium">
                    {item.institution}
                  </p>

                  <p className="text-dark-300 dark:text-light-400 mb-3">
                    {item.duration}
                  </p>

                  <p className="text-dark-400 dark:text-light-300 mb-4">
                    {item.description}
                  </p>

                  <div>
                    <h4 className="text-sm font-semibold text-primary-500 dark:text-accent-500 mb-2">
                      Key Courses/Certifications:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {item.courses.map((course, i) => (
                        <li
                          key={i}
                          className={`text-sm text-dark-400 dark:text-light-300 flex items-start group ${
                            item.links && item.links[i]
                              ? "cursor-pointer hover:text-accent-500 transition-colors"
                              : ""
                          }`}
                          onClick={() =>
                            item.links &&
                            item.links[i] &&
                            handleCertificateClick(item.links[i])
                          }
                        >
                          <span className="text-accent-500 mr-2">▹</span>
                          <span className="flex items-center">
                            {course}
                            {item.links && item.links[i] && (
                              <ExternalLink
                                size={14}
                                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              />
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
