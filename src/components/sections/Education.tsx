import type { FC } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, BookOpen, ExternalLink, GraduationCap } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const education = [
  {
    degree: "Computer Science Engineering Degree",
    institution: "Private Higher School of Engineering and Technology (ESPRIT)",
    duration: "Graduate",
    description:
      "Graduated as a Computer Science Engineer, with academic work in software architecture, algorithms, web development, and database systems.",
    icon: <GraduationCap size={21} />,
  },
  {
    degree: "Certifications",
    institution: "Professional development",
    description: "Selected certifications and learning credentials.",
    items: [
      {
        name: "Graph Developer – Associate",
        url: "https://www.apollographql.com/tutorials/certifications/979b5748-dd80-491f-8101-7e26ffd75e77",
      },
      {
        name: "GitHub Foundations",
        url: "https://www.credly.com/badges/487547e5-3580-4d5b-9daf-189f097dd3d8/linked_in_profile",
      },
      {
        name: "Cloud Foundations",
        url: "https://www.credly.com/badges/34b05406-2a24-41bc-b54a-7373ab5ca5cc",
      },
      {
        name: "Python Essentials",
        url: "https://www.credly.com/badges/7d23b623-550c-4510-bd34-e37d2940178c/linked_in_profile",
      },
    ],
    icon: <Award size={21} />,
  },
  {
    degree: "Baccalaureate in Experimental Science",
    institution: "Mahmoud Messaidi High School, Majaz Al Bab",
    duration: "2015 – 2020",
    description: "",
    courses: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
    icon: <BookOpen size={21} />,
  },
];

const Education: FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="bg-light-100 py-20 dark:bg-dark-700 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Education" subtitle="Academic background and selected credentials." />

        <div ref={ref} className="relative mx-auto mt-12 max-w-4xl">
          <div aria-hidden="true" className="absolute bottom-6 left-5 top-6 w-px bg-light-600 dark:bg-dark-400 sm:left-6" />
          <div className="space-y-5">
            {education.map((item, index) => (
              <motion.article
                key={item.degree}
                initial={{ opacity: 0, x: 14 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative pl-14 sm:pl-16"
              >
                <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-light-600 bg-light-100 text-primary-600 shadow-sm dark:border-dark-400 dark:bg-dark-700 dark:text-accent-300 sm:left-1">
                  {item.icon}
                </div>
                <div className="rounded-2xl border border-light-600 bg-light-200 p-5 shadow-sm dark:border-dark-400 dark:bg-dark-600 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-dark-800 dark:text-light-100 sm:text-xl">{item.degree}</h3>
                      <p className="mt-1 text-sm font-medium text-primary-700 dark:text-primary-200">{item.institution}</p>
                    </div>
                    {item.duration && (
                      <span className="w-fit rounded-full bg-light-100 px-3 py-1 text-xs font-medium text-dark-400 dark:bg-dark-500 dark:text-light-300">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  {item.description && <p className="mt-4 text-sm leading-6 text-dark-400 dark:text-light-300">{item.description}</p>}

                  {item.items && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.items.map((credential) => (
                        <li key={credential.name}>
                          <a
                            href={credential.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-light-600 bg-light-100 px-3 py-1.5 text-xs font-medium text-dark-500 transition-colors hover:border-accent-400 hover:text-primary-700 dark:border-dark-400 dark:bg-dark-500 dark:text-light-200 dark:hover:border-accent-500 dark:hover:text-accent-200"
                          >
                            {credential.name}<ExternalLink size={12} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.courses && (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Subjects studied">
                      {item.courses.map((course) => (
                        <li key={course} className="rounded-full bg-light-100 px-3 py-1.5 text-xs text-dark-400 dark:bg-dark-500 dark:text-light-300">{course}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
