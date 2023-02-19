const { getAllPost, createPost, updatePost, deletePost} = require("./post");
const {loginGoogle, refreshAccessToken}= require("./auth");
const {getAllStudent} = require("./student");

module.exports = {
  getAllPost,
  loginGoogle,
  getAllStudent,
  // getStudentByEmail,
  refreshAccessToken,
  createPost,
  updatePost,
  deletePost
};
