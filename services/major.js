const db = require('../models');
const { Op } = require('sequelize');
const { response } = require('express');

const getAllMajors = ({page, limit, order, major_name, ...query}) => new Promise( async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const flimit = +limit || +process.env.LIMIT_POST;
        queries.offset = offset * flimit;
        queries.limit = flimit;
        if(order) queries.order = [order]
        if(major_name) query.major_name = {[Op.substring]: major_name}

        const majors = await db.Major.findAndCountAll({
            where: query,
            ...queries,
        });
        resolve({
            msg: majors ? `Got major` : 'Cannot find major',
            posts: majors
        });
    } catch (error) {
        reject(error);
    }
});

const createMajor = (body) => new Promise( async (resolve, reject) => {
    try {
        const majors = await db.Major.findOrCreate({
            where: {major_name: body?.major_name},
            defaults: {
                ...body
            }
        });
        resolve({
            msg: majors[1] ? 'Create new major successfully' : 'Cannot create new major',
        });
    } catch (error) {
        reject(error);
    }
});

const updateMajor = ({major_id, ...body}) => new Promise( async (resolve, reject) => {
    try {
        const checkDuplicateName = await db.Major.findOne({
            where: {major_name: body?.major_name}
        });

        if (checkDuplicateName !== null) {
            resolve({
                msg: 'Major name already have'
            });
        };
        const majors = await db.Major.update(body, {
            where: {major_id}
        });
        resolve({
            msg: majors[0] > 0 ? `${majors[0]} project is updated` : 'Cannot update project/ project_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

const deleteMajor = (major_ids) => new Promise( async (resolve, reject) => {
    try {

        const majors = await db.Major.destroy({
            where: {major_id: major_ids}
        });
        resolve({
            msg: majors > 0 ? `${majors} majors is deleted` : 'Cannot delete majors/ project_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

 module.exports = { getAllMajors, createMajor, updateMajor, deleteMajor};
