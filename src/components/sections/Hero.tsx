import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16 overflow-hidden relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-200 to-light-500 dark:from-dark-600 dark:to-dark-500 -z-10" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-200/20 dark:bg-primary-700/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.p
          className="text-accent-500 dark:text-accent-500 font-mono mb-6 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hello, my name is
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-500 dark:text-light-100 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Riahi Yassine.
        </motion.h1>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-dark-300 dark:text-light-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          I build things for the web.
        </motion.h2>

        <motion.p
          className="text-lg text-dark-400 dark:text-light-400 max-w-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          I'm a software engineering student specializing in building
          exceptional digital experiences. Currently, I'm focused on expanding
          my skills and seeking internship opportunities for Summer 2025.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button href="#projects" variant="primary" size="lg">
            View My Work
          </Button>
          <Button href="#contact" variant="outline" size="lg">
            Get In Touch
          </Button>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-500 dark:text-accent-500 hover:text-primary-600 dark:hover:text-accent-400 transition-colors"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
};

export default Hero;
