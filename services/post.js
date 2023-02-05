// import db from '../models';
const db = require('../models');

const getAllPost = () => new Promise(async (resolve, reject) => {
    try {
        const posts = await db.Post.findAll();
        resolve({posts});
    } catch (error) {
        reject(error);
    }
}) 

module.exports = getAllPost;

// export const getPostByName = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.Post.findAll();
//         resolve({response});
//     } catch (error) {
//         reject(error);
//     }
// }) 

// export const updatePost = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.Post.findAll();
//         resolve({response});
//     } catch (error) {
//         reject(error);
//     }
// }) 

// export const deletePost = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.Post.findAll();
//         resolve({response});
//     } catch (error) {
//         reject(error);
//     }
// }) 
