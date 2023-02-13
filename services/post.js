const db = require('../models');

const getAllPost = () => new Promise( async (resolve, reject) => {
    try {
        const posts = await db.JobPost.findAll({
            attributes: {exclude: ['project_id', 'cate_id', 'major_id']},
            raw: true,
            nest: true,
            include: [{
                model: db.Category, as: 'post_category', attributes: ['cate_name']
            }]
        });
        resolve({posts});
    } catch (error) {
        reject(error);
    }
});

const getPostById = (id) => new Promise( async (resolve, reject) => {
    try {
        const posts = await db.JobPost.findOne({
            where: {post_id: id},
            attributes: {exclude: ['project_id', 'cate_id', 'major_id']},
            raw: true,
            nest: true,
            include: [{
                model: db.Category, as: 'post_category', attributes: ['cate_name']
            }]
        });
        resolve({
            posts: posts
        });
    } catch (error) {
        reject(error);
    }
});


module.exports = { getAllPost, getPostById };

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
