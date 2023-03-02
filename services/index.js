const { getAllPost, createPost, updatePost, deletePost, getPostById} = require("./post");
const {loginGoogle, refreshAccessToken, logout}= require("./auth");
const {getAllStudent, updateStudent, deleteStudent, getStudentById, createStudent, getAllStudentPaging} = require("./student");
const {getAllProjects, createProject, updateProject, deleteProject, getProjectById} = require("./project")
const {getAllMajors, createMajor, updateMajor, deleteMajor} = require("./major")
const {getAllCategories, createCategory, updateCategory, deleteCategory} = require("./category")
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
  getAllStudentPaging,
  
};
