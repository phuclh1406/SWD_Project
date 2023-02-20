const { getAllPost, createPost, updatePost, deletePost} = require("./PostController");
const {loginGoogle, refreshAccessToken, logout} = require("./AuthController");
const {getAllStudent, updateStudent, deleteStudent} = require("./StudentController");
const uploadFile = require('./UploadFileController');

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
