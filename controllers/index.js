const { getAllPost, createPost, updatePost, deletePost} = require("./postController");
const {loginGoogle, refreshAccessToken, logout} = require("./authController");
const {getAllStudent, updateStudent, deleteStudent} = require("./studentController");
const uploadFile = require('./uploadFileController');

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
};
