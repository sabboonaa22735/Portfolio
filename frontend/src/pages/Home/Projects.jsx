import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProjects } from "../../utils/api";

const defaultProjects = [
  { _id: "1", title: "E-Commerce Platform", description: "A full-featured online store", technologies: ["React", "Node.js", "MongoDB"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", link: "#" },
  { _id: "2", title: "Social Media App", description: "Real-time social platform", technologies: ["React Native", "Firebase"], image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800", link: "#" },
  { _id: "3", title: "Dashboard System", description: "Analytics dashboard", technologies: ["Vue.js", "D3.js"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", link: "#" },
];

function Projects() {
  const [projects, setProjects] = useState(defaultProjects);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        if (data && data.length > 0) setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-32 relative animated-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">Some of my recent work</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.button
                key={project._id}
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
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 mt-1">{project.description}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-4 overflow-hidden"
          >
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <img 
                src={projects[selectedIndex]?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"} 
                alt={projects[selectedIndex]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {projects[selectedIndex]?.title}
                </h3>
                <p className="text-gray-300 mb-4">{projects[selectedIndex]?.description}</p>
                <a 
                  href={projects[selectedIndex]?.link} 
                  className="inline-block glass-btn text-sm py-2 px-6"
                >
                  View Project
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
