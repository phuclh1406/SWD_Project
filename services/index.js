const { getAllPost, createPost, updatePost, deletePost} = require("./post");
const {loginGoogle, refreshAccessToken, logout}= require("./auth");
const {getAllStudent} = require("./student");

module.exports = {
  getAllPost,
  loginGoogle,
  getAllStudent,
  // getStudentByEmail,
  logout,
  refreshAccessToken,
  createPost,
  updatePost,
  deletePost
};
