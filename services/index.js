const {loginGoogle, refreshAccessToken, logout}= require("./auth");
const {getAllStudent, updateStudent, deleteStudent, getStudentById, createStudent, getAllStudentPaging, updateProfile} = require("./student");
const {getAllProjects, createProject, updateProject, deleteProject, getProjectById, getAllProjectsHome} = require("./project")
const {getAllMajors, createMajor, updateMajor, deleteMajor, getMajorById} = require("./major")
const {getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById} = require("./category")
const {getAllRoles} = require('./role')
const {getAllApplications, createApplication, acceptApplication, getApplicationById, updateApplication, deleteApplication} = require("./application")

module.exports = {
  loginGoogle,
  logout,
  getAllStudent,
  updateStudent,
  deleteStudent,
  refreshAccessToken,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getAllMajors,
  createMajor,
  updateMajor,
  deleteMajor,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllRoles,
  getStudentById,
  getProjectById,
  createStudent,
  getAllStudentPaging,
  updateProfile,
  getAllProjectsHome,
  getAllApplications, 
  createApplication, 
  acceptApplication, 
  getApplicationById, 
  updateApplication, 
  deleteApplication,
  getMajorById,
  getCategoryById
  
};
