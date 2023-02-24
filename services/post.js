const db = require('../models');
const { Op } = require('sequelize');
const { response } = require('express');

const getAllPost = ({page, limit, order, post_title, ...query}) => new Promise( async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const flimit = +limit || +process.env.LIMIT_POST;
        queries.offset = offset * flimit;
        queries.limit = flimit;
        if(order) queries.order = [order];
        if(post_title) query.post_title = {[Op.substring]: post_title};
        query.status = {[Op.ne]: 'deactive'};

        const posts = await db.JobPost.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['project_id', 'cate_id', 'major_id', 'createAt', 'updateAt'],
            },
            include: [{
                model: db.Category, as: 'post_category', attributes: ['cate_id', 'cate_name']
            }, {
                model: db.Project, as: 'post_project', attributes: ['project_id', 'project_name']
            }, {
                model: db.Major, as: 'post_major', attributes: ['major_id', 'major_name']
            }]
        });
        resolve({
            msg: posts ? `Got posts` : 'Cannot find posts',
            posts: posts
        });
    } catch (error) {
        reject(error);
    }
});

const createPost = (body) => new Promise( async (resolve, reject) => {
    try {
        const posts = await db.JobPost.findOrCreate({
            where: {post_title: body?.post_title},
            defaults: {
                ...body
            }
        });
        resolve({
            msg: posts[1] ? 'Create new post successfully' : 'Cannot create new post',
        });
    } catch (error) {
        reject(error);
    }
});

const updatePost = ({post_id, ...body}) => new Promise( async (resolve, reject) => {
    try {
        const checkDuplicateName = await db.JobPost.findOne({
            where: {post_title: body?.post_title}
        });

        if (checkDuplicateName !== null) {
            resolve({
                msg: 'Post title already have'
            });
        };
        const posts = await db.JobPost.update(body, {
            where: {post_id}
        });
        resolve({
            msg: posts[0] > 0 ? `${posts[0]} post update` : 'Cannot update post/ post_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

const deletePost = (post_ids) => new Promise( async (resolve, reject) => {
    try {
        const posts = await db.JobPost.update({status: 'deactive'}, {
            where: {post_id: post_ids}
        });
        resolve({
            msg: posts > 0 ? `${posts} post delete` : 'Cannot delete post/ post_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

const getPostById = (post_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const post = await db.JobPost.findOne({
        where: { post_id: post_id },
        raw: true,
        nest: true,
        attributes: {
            exclude: ['project_id', 'cate_id', 'major_id', 'createAt', 'updateAt'],
        },
        include: [{
            model: db.Category, as: 'post_category', attributes: ['cate_id', 'cate_name']
        }, {
            model: db.Project, as: 'post_project', attributes: ['project_id', 'project_name']
        }, {
            model: db.Major, as: 'post_major', attributes: ['major_id', 'major_name']
        }]
      });
      if (post) {
        resolve({
            post: post 
        });
      } else {
        resolve({
          msg: `Cannot find post with id: ${post_id}`
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = { getAllPost, createPost, updatePost, deletePost, getPostById};

