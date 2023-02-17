const {getAllPost, getPostById} = require('./post');
const loginGoogle = require('./auth');
const getAllStudent = require('./student');
const uploadFile = require('./uploadFile');


module.exports = {getAllPost, getPostById, loginGoogle, getAllStudent, uploadFile};