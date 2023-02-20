const { getAllPost, createPost, updatePost, deletePost} = require("./postService");
const {loginGoogle, refreshAccessToken, logout}= require("./authService");
const {getAllStudent, updateStudent, deleteStudent} = require("./studentService");

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
};
