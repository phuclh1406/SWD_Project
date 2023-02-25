const { getAllPost, createPost, updatePost, deletePost, getPostById} = require("./post");
const {loginGoogle, refreshAccessToken, logout} = require("./auth");
const {getAllStudent, updateStudent, deleteStudent, getStudentById, createStudent, getAllStudentByAdmin, getAllStudentPaging} = require("./student");
const {uploadFile, pushNotification} = require('./firebaseService');
const {getAllProjects, createProject, updateProject, deleteProject, getProjectById} = require('./project')
const {getAllMajors, createMajor, updateMajor, deleteMajor} = require('./major')
const {getAllCategories, createCategory, updateCategory, deleteCategory} = require('./category')
const {getAllRoles} = require('./role')

module.exports = {
  getAllPost,
  loginGoogle,
  logout,
  getAllStudent,
  updateStudent, 
  deleteStudent,
  refreshAccessToken,
  createPost,
  updatePost,
  deletePost,
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
  getPostById,
  createStudent,
  getAllStudentByAdmin,
  getAllStudentPaging,
};
