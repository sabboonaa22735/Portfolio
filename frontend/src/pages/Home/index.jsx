import React from 'react';
import { motion } from 'framer-motion';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Courses from './Courses';
import Contact from './Contact';

function Header() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-card mx-4 mt-4 rounded-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a 
            href="/"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.a>
          
          <nav className="hidden md:flex items-center gap-8">
            {['About', 'Experience', 'Projects', 'Courses', 'Contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                whileHover={{ color: '#6366f1' }}
                className="text-gray-300 text-sm font-medium"
              >
                {item}
              </motion.button>
            ))}
          </nav>

          <motion.a
            href="/admin"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card px-4 py-2 text-sm font-medium text-white"
          >
            Admin
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}

function Home() {
  return (
    <div className="noise-overlay">
      <Header />
      <main>
        <Intro />
        <About />
        <Experiences />
        <Projects />
        <Courses />
        <Contact />
      </main>
      
      <footer className="py-8 border-t border-white/10">
        <div className="section-container text-center">
          <p className="text-gray-500">
            © 2024 Built with ❤️ using React + Vite + Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
