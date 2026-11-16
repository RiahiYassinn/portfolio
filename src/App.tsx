import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Education from "./components/sections/Education";
import AnimatedShaderBackground from "./components/ui/animated-shader-background";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode === null
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : savedMode === "true";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <div className="relative isolate flex min-h-screen flex-col">
          <AnimatedShaderBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex-grow">
              <Hero />
              <About />
              <Skills />
              <Education />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
          <Analytics />
        </div>
      </LanguageProvider>
    </MotionConfig>
  );
}

export default App;
