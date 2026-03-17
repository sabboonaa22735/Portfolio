import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("intro");
  const [loading, setLoading] = useState(false);

  const [intro, setIntro] = useState({
    welcomeText: "",
    firstName: "",
    lastName: "",
    caption: "",
    description: "",
  });

  const [about, setAbout] = useState({
    lottieURL: "",
    description1: "",
    description2: "",
    skills: "",
  });

  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    title: "",
    period: "",
    company: "",
    description: "",
  });

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    technologies: "",
  });

  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });

  const [contact, setContact] = useState({
    name: "",
    gender: "",
    email: "",
    mobile: "",
    age: "",
    address: "",
  });

  const [messages, setMessages] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:8000/api/portfolio",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "intro") {
        const { data } = await api.get("/intro");
        if (data) setIntro(data);
      } else if (activeTab === "about") {
        const { data } = await api.get("/about");
        if (data) setAbout({ ...data, skills: data.skills?.join(", ") || "" });
      } else if (activeTab === "experiences") {
        const { data } = await api.get("/experiences");
        setExperiences(data);
      } else if (activeTab === "projects") {
        const { data } = await api.get("/projects");
        setProjects(data.map((p) => ({ ...p, technologies: p.technologies?.join(", ") || "" })));
      } else if (activeTab === "courses") {
        const { data } = await api.get("/courses");
        setCourses(data);
      } else if (activeTab === "contact") {
        const { data } = await api.get("/contact");
        if (data) setContact(data);
      } else if (activeTab === "messages") {
        const { data } = await api.get("/messages");
        setMessages(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSaveIntro = async () => {
    try {
      if (intro._id) {
        await api.put(`/intro/${intro._id}`, intro);
      } else {
        await api.post("/intro", intro);
      }
      alert("Intro saved!");
    } catch (error) {
      alert("Error saving intro");
    }
  };

  const handleSaveAbout = async () => {
    try {
      const data = { ...about, skills: about.skills.split(",").map((s) => s.trim()) };
      if (about._id) {
        await api.put(`/about/${about._id}`, data);
      } else {
        await api.post("/about", data);
      }
      alert("About saved!");
    } catch (error) {
      alert("Error saving about");
    }
  };

  const handleAddExperience = async () => {
    try {
      const data = { ...newExperience, description: newExperience.description.split(",").map((s) => s.trim()) };
      await api.post("/experiences", data);
      setNewExperience({ title: "", period: "", company: "", description: "" });
      fetchData();
    } catch (error) {
      alert("Error adding experience");
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await api.delete(`/experiences/${id}`);
      fetchData();
    } catch (error) {
      alert("Error deleting experience");
    }
  };

  const handleAddProject = async () => {
    try {
      const data = { ...newProject, technologies: newProject.technologies.split(",").map((s) => s.trim()) };
      await api.post("/projects", data);
      setNewProject({ title: "", description: "", image: "", link: "", technologies: "" });
      fetchData();
    } catch (error) {
      alert("Error adding project");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchData();
    } catch (error) {
      alert("Error deleting project");
    }
  };

  const handleAddCourse = async () => {
    try {
      await api.post("/courses", newCourse);
      setNewCourse({ title: "", description: "", image: "", link: "" });
      fetchData();
    } catch (error) {
      alert("Error adding course");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      fetchData();
    } catch (error) {
      alert("Error deleting course");
    }
  };

  const handleSaveContact = async () => {
    try {
      if (contact._id) {
        await api.put(`/contact/${contact._id}`, contact);
      } else {
        await api.post("/contact", contact);
      }
      alert("Contact saved!");
    } catch (error) {
      alert("Error saving contact");
    }
  };

  const tabs = ["intro", "about", "experiences", "projects", "courses", "contact", "messages"];

  return (
    <div className="min-h-screen animated-bg">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-card mx-4 mt-4 rounded-2xl px-6 py-4 sticky top-4 z-50"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-white text-sm">View Site</a>
            <button 
              onClick={() => { logout(); navigate("/login"); }} 
              className="glass-card px-4 py-2 text-sm text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto p-6">
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-xl capitalize font-medium transition-all ${
                activeTab === tab 
                  ? "glass-card bg-white/10 text-white" 
                  : "glass-card text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {activeTab === "intro" && (
                <div className="glass-card p-8 max-w-2xl">
                  <h2 className="text-2xl font-bold mb-6">Intro Settings</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Welcome Text"
                      value={intro.welcomeText}
                      onChange={(e) => setIntro({ ...intro, welcomeText: e.target.value })}
                      className="glass-input"
                    />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={intro.firstName}
                      onChange={(e) => setIntro({ ...intro, firstName: e.target.value })}
                      className="glass-input"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={intro.lastName}
                      onChange={(e) => setIntro({ ...intro, lastName: e.target.value })}
                      className="glass-input"
                    />
                    <input
                      type="text"
                      placeholder="Caption"
                      value={intro.caption}
                      onChange={(e) => setIntro({ ...intro, caption: e.target.value })}
                      className="glass-input"
                    />
                    <textarea
                      placeholder="Description"
                      value={intro.description}
                      onChange={(e) => setIntro({ ...intro, description: e.target.value })}
                      className="glass-input h-32"
                    />
                    <motion.button 
                      onClick={handleSaveIntro} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-btn w-full"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div className="glass-card p-8 max-w-2xl">
                  <h2 className="text-2xl font-bold mb-6">About Settings</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Lottie URL"
                      value={about.lottieURL || ""}
                      onChange={(e) => setAbout({ ...about, lottieURL: e.target.value })}
                      className="glass-input"
                    />
                    <textarea
                      placeholder="Description 1"
                      value={about.description1 || ""}
                      onChange={(e) => setAbout({ ...about, description1: e.target.value })}
                      className="glass-input h-32"
                    />
                    <textarea
                      placeholder="Description 2"
                      value={about.description2 || ""}
                      onChange={(e) => setAbout({ ...about, description2: e.target.value })}
                      className="glass-input h-32"
                    />
                    <input
                      type="text"
                      placeholder="Skills (comma separated)"
                      value={about.skills || ""}
                      onChange={(e) => setAbout({ ...about, skills: e.target.value })}
                      className="glass-input"
                    />
                    <motion.button 
                      onClick={handleSaveAbout} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-btn w-full"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              )}

              {activeTab === "experiences" && (
                <div className="space-y-6">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-4">Add New Experience</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={newExperience.title}
                        onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                        className="glass-input"
                      />
                      <input
                        type="text"
                        placeholder="Period"
                        value={newExperience.period}
                        onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                        className="glass-input"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                        className="glass-input"
                      />
                      <input
                        type="text"
                        placeholder="Description (comma separated)"
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                        className="glass-input"
                      />
                    </div>
                    <motion.button 
                      onClick={handleAddExperience} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-btn mt-4"
                    >
                      Add Experience
                    </motion.button>
                  </div>
                  
                  <div className="grid gap-4">
                    {experiences.map((exp) => (
                      <motion.div 
                        key={exp._id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-4 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-bold text-white">{exp.title}</h3>
                          <p className="text-gray-400 text-sm">{exp.company} - {exp.period}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteExperience(exp._id)} 
                          className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        >
                          Delete
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-4">Add New Project</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="glass-input"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        className="glass-input"
                      />
                      <input
                        type="text"
                        placeholder="Link"
                        value={newProject.link}
                        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                        className="glass-input"
                      />
                      <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={newProject.technologies}
                        onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                        className="glass-input"
                      />
                      <textarea
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="glass-input h-24 md:col-span-2"
                      />
                    </div>
                    <motion.button 
                      onClick={handleAddProject} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-btn mt-4"
                    >
                      Add Project
                    </motion.button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <motion.div 
                        key={proj._id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-4 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-bold text-white">{proj.title}</h3>
                          <p className="text-gray-400 text-sm">{proj.technologies}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteProject(proj._id)} 
                          className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        >
                          Delete
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "courses" && (
                <div className="space-y-6">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-4">Add New Course</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        className="glass-input"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={newCourse.image}
                        onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                        className="glass-input"
                      />
                      <input
                        type="text"
                        placeholder="Link"
                        value={newCourse.link}
                        onChange={(e) => setNewCourse({ ...newCourse, link: e.target.value })}
                        className="glass-input"
                      />
                      <textarea
                        placeholder="Description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="glass-input h-24"
                      />
                    </div>
                    <motion.button 
                      onClick={handleAddCourse} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-btn mt-4"
                    >
                      Add Course
                    </motion.button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {courses.map((course) => (
                      <motion.div 
                        key={course._id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-4 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-bold text-white">{course.title}</h3>
                          <p className="text-gray-400 text-sm">{course.description?.substring(0, 50)}...</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteCourse(course._id)} 
                          className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        >
                          Delete
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="glass-card p-8 max-w-2xl">
                  <h2 className="text-2xl font-bold mb-6">Contact Settings</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      className="glass-input"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="glass-input"
                    />
                    <input
                      type="text"
                      placeholder="Mobile"
                      value={contact.mobile}
                      onChange={(e) => setContact({ ...contact, mobile: e.target.value })}
                      className="glass-input"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={contact.address}
                      onChange={(e) => setContact({ ...contact, address: e.target.value })}
                      className="glass-input"
                    />
                    <motion.button 
                      onClick={handleSaveContact} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-btn w-full"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              )}

              {activeTab === "messages" && (
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="glass-card p-10 text-center">
                      <p className="text-gray-500">No messages yet.</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <motion.div 
                        key={msg._id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 flex justify-between items-start"
                      >
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{msg.name}</h3>
                          <p className="text-secondary text-sm">{msg.email}</p>
                          <p className="text-gray-300 mt-3">{msg.message}</p>
                          <p className="text-gray-500 text-xs mt-2">
                            {new Date(msg.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button 
                          onClick={async () => {
                            if (window.confirm("Delete this message?")) {
                              try {
                                await api.delete(`/messages/${msg._id}`);
                                fetchData();
                              } catch (error) {
                                alert("Error deleting message");
                              }
                            }
                          }} 
                          className="ml-4 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        >
                          Delete
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
