import React, { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Education from './components/sections/Education';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/ui/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <div className="min-h-screen flex flex-col">
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
      )}
    </AnimatePresence>
  );
}

export default App;