const db = require('../models');
const { Op } = require('sequelize');
const { response } = require('express');

const getAllRoles = ({page, limit, order, role_name, ...query}) => new Promise( async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const flimit = +limit || +process.env.LIMIT_POST;
        queries.offset = offset * flimit;
        queries.limit = flimit;
        if(order) queries.order = [order]
        if(role_name) query.role_name = {[Op.substring]: role_name}

        const roles = await db.Role.findAndCountAll({
            where: query,
            ...queries,
        });
        resolve({
            msg: roles ? `Got role` : 'Cannot find role',
            roles: roles
        });
    } catch (error) {
        reject(error);
    }
});

 module.exports = { getAllRoles};
