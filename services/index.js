const { getAllPost, createPost, updatePost, deletePost} = require("./PostService");
const {loginGoogle, refreshAccessToken, logout}= require("./AuthService");
const {getAllStudent, updateStudent, deleteStudent} = require("./StudentService");

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
