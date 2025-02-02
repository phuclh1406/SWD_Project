const db = require('../models');
const { Op } = require('sequelize');

const getAllCategories = ({page, limit, order, cate_name, ...query}, role_name) => new Promise( async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        if(order) queries.order = [['updatedAt', 'DESC']];
        if(cate_name) query.cate_name = {[Op.substring]: cate_name};
        if (role_name !== 'Admin') {query.status = { [Op.ne]: "Deactive" }};

        const categories = await db.Category.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
        resolve({
            msg: categories ? `Got category` : 'Cannot find category',
            categories: categories
        });
    } catch (error) {
        reject(error);
    }
});

const getCategoryById = async (cate_id) => {
    try {
  
      const cate = await db.Category.findOne({
        where: { cate_id: cate_id },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
  
      if (!cate) {
        return { msg: 'Cannot find category' };
      }
  
      return { msg: 'Got category', cate };
    } catch (error) {
      throw error;
    }
  };

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
        const categories = await db.Category.update(body, {
            where: {cate_id}
        });
        resolve({
            msg: categories[0] > 0 ? `${categories[0]} category is updated` : 'Cannot update category/ cate_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

const deleteCategory = (cate_ids) => new Promise( async (resolve, reject) => {
    try {

        const categories = await db.Category.update({status: 'Deactive'}, {
            where: {cate_id: cate_ids}
        });
        resolve({
            msg: categories > 0 ? `${categories} categories is deleted` : 'Cannot delete categories/ category_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

 module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById};
