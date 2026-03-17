import axios from "axios";

const API_URL = "http://localhost:8000/api/portfolio";

export const getIntro = () => axios.get(`${API_URL}/intro`);
export const getAbout = () => axios.get(`${API_URL}/about`);
export const getExperiences = () => axios.get(`${API_URL}/experiences`);
export const getProjects = () => axios.get(`${API_URL}/projects`);
export const getCourses = () => axios.get(`${API_URL}/courses`);
export const getContact = () => axios.get(`${API_URL}/contact`);
