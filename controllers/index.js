const {loginGoogle, refreshAccessToken, logout} = require("./auth");
const {getAllStudent, updateStudent, deleteStudent, getStudentById, createStudent, getAllStudentPaging, updateProfile} = require("./student");
const {uploadFile, pushNotification} = require('./firebaseService');
const {getAllProjects, createProject, updateProject, deleteProject, getProjectById, getAllProjectsHome} = require('./project')
const {getAllMajors, createMajor, updateMajor, deleteMajor} = require('./major')
const {getAllCategories, createCategory, updateCategory, deleteCategory} = require('./category')
const {getAllRoles} = require('./role')

module.exports = {
  loginGoogle,
  logout,
  getAllStudent,
  updateStudent, 
  deleteStudent,
  refreshAccessToken,
  uploadFile,
  pushNotification,
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

};
