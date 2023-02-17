const { getAllPost, createPost, updatePost, deletePost} = require("./post");
const loginGoogle = require("./auth");
const getAllStudent = require("./student");

module.exports = {
  getAllPost,
  loginGoogle,
  getAllStudent,
  createPost,
  updatePost,
  deletePost
};
