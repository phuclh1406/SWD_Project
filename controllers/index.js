const { getAllPost, createPost, updatePost, deletePost} = require("./post");
const {loginGoogle, refreshAccessToken} = require("./auth");
const {getAllStudent} = require("./student");
const uploadFile = require('./uploadFile');

module.exports = {
  getAllPost,
  loginGoogle,
  getAllStudent,
  // getStudentByEmail,
  refreshAccessToken,
  createPost,
  updatePost,
  deletePost,
  uploadFile
};
