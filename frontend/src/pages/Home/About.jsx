import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAbout } from "../../utils/api";

const defaultSkills = ["React", "Node.js", "MongoDB", "TypeScript", "AWS", "GraphQL"];
const defaultLottie = "https://lottie.host/9f5702bd-7f8e-4ac0-8869-a81f725585bd/nFNDf8gTve.json";
const defaultDesc1 = "I'm a passionate full-stack developer with expertise in building modern web applications.";
const defaultDesc2 = "I love creating intuitive user experiences and scalable backend systems.";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await getAbout();
        if (data) setAbout(data);
      } catch (error) {
        console.error("Error fetching about:", error);
      }
      setLoading(false);
    };
    fetchAbout();
  }, []);

  const skills = about?.skills?.length > 0 ? about.skills : defaultSkills;
  const lottieURL = about?.lottieURL || defaultLottie;
  const description1 = about?.description1 || defaultDesc1;
  const description2 = about?.description2 || defaultDesc2;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-32 relative animated-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="gradient-text">About</span> Me
            </h2>
            <p className="text-gray-400 text-lg">Get to know me better</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="glass-card p-8">
              <div className="h-80 flex items-center justify-center">
                <dotlottie-player
                  src={lottieURL}
                  background="transparent"
                  speed="1"
                  autoplay
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                {description1}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {description2}
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-4 text-white">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="glass-card px-4 py-2 text-sm text-gray-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
