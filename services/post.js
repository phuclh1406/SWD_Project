import db from '../models'

export const getAllPost = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll();
        resolve({response});
    } catch (error) {
        reject(error);
    }
}) 

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
