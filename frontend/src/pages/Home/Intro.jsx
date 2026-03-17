import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getIntro } from '../../utils/api';

const defaultIntro = {
  welcomeText: "Hi, I am",
  firstName: "Sebona",
  lastName: "Ifa",
  caption: "FullStack Developer",
  description: "A passionate developer building amazing things."
};

function Intro() {
  const [intro, setIntro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const { data } = await getIntro();
        if (data) setIntro(data);
      } catch (error) {
        console.error("Error fetching intro:", error);
      }
      setLoading(false);
    };
    fetchIntro();
  }, []);

  const firstName = intro?.firstName || defaultIntro.firstName;
  const lastName = intro?.lastName || defaultIntro.lastName;
  const caption = intro?.caption || defaultIntro.caption;
  const description = intro?.description || defaultIntro.description;
  const welcomeText = intro?.welcomeText || defaultIntro.welcomeText;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden animated-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary/20 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-secondary text-lg mb-4 tracking-widest uppercase"
          >
            {welcomeText}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-8xl font-bold mb-6"
          >
            <span className="gradient-text">{firstName}</span>
            <br />
            <span className="text-white">{lastName}</span>
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl text-gray-400 mb-8"
          >
            {caption}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 justify-center"
          >
            <a href="#contact" className="glass-btn">
              Get In Touch
            </a>
            <a href="#projects" className="glass-card px-8 py-4 text-white font-semibold">
              View Work
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-secondary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Intro;
