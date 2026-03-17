const express = require("express");
const {
  getIntro,
  updateIntro,
  createIntro,
  getAbout,
  updateAbout,
  createAbout,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getContact,
  updateContact,
  createContact,
  getMessages,
  createMessage,
  deleteMessage,
} = require("../controllers/portfolioController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/intro").get(getIntro).post(protect, createIntro);
router.route("/intro/:id").put(protect, updateIntro);

router.route("/about").get(getAbout).post(protect, createAbout);
router.route("/about/:id").put(protect, updateAbout);

router
  .route("/experiences")
  .get(getExperiences)
  .post(protect, createExperience);
router
  .route("/experiences/:id")
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

router.route("/projects").get(getProjects).post(protect, createProject);
router
  .route("/projects/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.route("/courses").get(getCourses).post(protect, createCourse);
router
  .route("/courses/:id")
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

router.route("/contact").get(getContact).post(protect, createContact);
router.route("/contact/:id").put(protect, updateContact);

router.route("/messages").get(protect, getMessages).post(createMessage);
router.route("/messages/:id").delete(protect, deleteMessage);

module.exports = router;
