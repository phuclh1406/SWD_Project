const db = require('../models');
const { Op } = require('sequelize');
const { response } = require('express');

const getAllCategories = ({page, limit, order, cate_name, ...query}) => new Promise( async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const flimit = +limit || +process.env.LIMIT_POST;
        queries.offset = offset * flimit;
        queries.limit = flimit;
        if(order) queries.order = [order]
        if(cate_name) query.cate_name = {[Op.substring]: cate_name}

        const categories = await db.Category.findAndCountAll({
            where: query,
            ...queries,
        });
        resolve({
            msg: categories ? `Got category` : 'Cannot find category',
            posts: categories
        });
    } catch (error) {
        reject(error);
    }
});

const createCategory = (body) => new Promise( async (resolve, reject) => {
    try {
        const categories = await db.Category.findOrCreate({
            where: {cate_name: body?.cate_name},
            defaults: {
                ...body
            }
        });
        resolve({
            msg: categories[1] ? 'Create new category successfully' : 'Cannot create new category',
        });
    } catch (error) {
        reject(error);
    }
});

const updateCategory = ({cate_id, ...body}) => new Promise( async (resolve, reject) => {
    try {
        const checkDuplicateName = await db.Category.findOne({
            where: {cate_name: body?.cate_name}
        });

        if (checkDuplicateName !== null) {
            resolve({
                msg: 'category name already have'
            });
        };
        const categories = await db.Category.update(body, {
            where: {cate_id}
        });
        resolve({
            msg: categories[0] > 0 ? `${categories[0]} project is updated` : 'Cannot update project/ project_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

const deleteCategory = (cate_ids) => new Promise( async (resolve, reject) => {
    try {

        const categories = await db.Category.destroy({
            where: {cate_id: cate_ids}
        });
        resolve({
            msg: categories > 0 ? `${categories} categories is deleted` : 'Cannot delete categories/ category_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

 module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory};
