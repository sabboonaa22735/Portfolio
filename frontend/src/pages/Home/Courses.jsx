import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCourses } from "../../utils/api";

const defaultCourses = [
  { _id: "1", title: "React Masterclass", description: "Complete React course", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800", link: "#" },
  { _id: "2", title: "Node.js Backend", description: "Build scalable backends", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800", link: "#" },
  { _id: "3", title: "MongoDB Fundamentals", description: "Database design", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800", link: "#" },
];

function Courses() {
  const [courses, setCourses] = useState(defaultCourses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await getCourses();
        if (data && data.length > 0) setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <section id="courses" className="py-32 relative animated-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-tertiary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            My <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-gray-400 text-lg">What I've taught</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">{course.description}</p>
                <a 
                  href={course.link} 
                  className="text-secondary hover:text-tertiary transition-colors"
                >
                  Learn More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
