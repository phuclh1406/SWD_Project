const { getAllPost, createPost, updatePost, deletePost} = require("./post");
const {loginGoogle, refreshAccessToken, logout} = require("./AuthController");
const {getAllStudent} = require("./student");
const uploadFile = require('./uploadFile');

module.exports = {
  getAllPost,
  loginGoogle,
  getAllStudent,
  // getStudentByEmail,
  refreshAccessToken,
  logout,
  createPost,
  updatePost,
  deletePost,
  uploadFile
};
