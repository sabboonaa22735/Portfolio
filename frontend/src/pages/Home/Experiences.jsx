import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getExperiences } from "../../utils/api";

const defaultExperiences = [
  { _id: "1", company: "Tech Corp", title: "Senior Developer", period: "2022 - Present", description: ["Lead development", "Mentored team"] },
  { _id: "2", company: "StartupXYZ", title: "Full Stack Developer", period: "2020 - 2022", description: ["Built scalable apps", "API development"] },
  { _id: "3", company: "Freelance", title: "Web Developer", period: "2018 - 2020", description: ["Client projects", "WordPress development"] },
];

function Experiences() {
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await getExperiences();
        if (data && data.length > 0) setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-32 relative animated-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-tertiary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg">My professional journey</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            {experiences.map((exp, index) => (
              <motion.button
                key={exp._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedIndex(index)}
                className={`w-full text-left p-6 rounded-2xl transition-all ${
                  selectedIndex === index
                    ? "glass-card bg-white/10 border-secondary"
                    : "glass-card hover:bg-white/5"
                }`}
              >
                <span className="text-secondary text-sm">{exp.period}</span>
                <h3 className="text-xl font-semibold text-white mt-2">{exp.company}</h3>
                <p className="text-gray-400">{exp.title}</p>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-2"
          >
            <div className="glass-card p-10 h-full">
              <h3 className="text-3xl font-bold text-white mb-2">
                {experiences[selectedIndex]?.title}
              </h3>
              <p className="text-secondary text-lg mb-6">
                {experiences[selectedIndex]?.company}
              </p>
              <div className="space-y-4">
                {experiences[selectedIndex]?.description?.map((desc, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2" />
                    <p className="text-gray-300">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
