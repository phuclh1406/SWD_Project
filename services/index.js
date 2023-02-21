const { getAllPost, createPost, updatePost, deletePost} = require("./post");
const {loginGoogle, refreshAccessToken, logout}= require("./auth");
const {getAllStudent, updateStudent, deleteStudent} = require("./student");
const {getAllProjects, createProject, updateProject, deleteProject} = require("./project")
const {getAllMajors, createMajor, updateMajor, deleteMajor} = require("./major")

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
  deleteMajor
};
