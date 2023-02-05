// export * from './auth'
// export * from './post'

const getAllPost = require('./post');
const register = require('./auth');

module.exports = {getAllPost, register};