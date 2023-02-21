const db = require('../models');
const { Op } = require('sequelize');
const { response } = require('express');

const getAllProjects = ({page, limit, order, project_name, ...query}) => new Promise( async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const flimit = +limit || +process.env.LIMIT_POST;
        queries.offset = offset * flimit;
        queries.limit = flimit;
        if(order) queries.order = [order]
        if(project_name) query.project_name = {[Op.substring]: project_name}

        const projects = await db.Project.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['student_id'],
            },
            include: [{
                model: db.Student, as: 'project_student', attributes: ['student_id', 'student_name']
            }]
        });
        resolve({
            msg: projects ? `Got projects` : 'Cannot find projects',
            posts: projects
        });
    } catch (error) {
        reject(error);
    }
});

const createProject = (body) => new Promise( async (resolve, reject) => {
    try {
        const projects = await db.Project.findOrCreate({
            where: {project_name: body?.project_name},
            defaults: {
                ...body
            }
        });
        resolve({
            msg: projects[1] ? 'Create new project successfully' : 'Cannot create new project',
        });
    } catch (error) {
        reject(error);
    }
});

const updateProject = ({project_id, ...body}) => new Promise( async (resolve, reject) => {
    try {
        const checkDuplicateName = await db.Project.findOne({
            where: {project_name: body?.project_name}
        });

        if (checkDuplicateName !== null) {
            resolve({
                msg: 'Project name already have'
            });
        };
        const projects = await db.Project.update(body, {
            where: {project_id}
        });
        resolve({
            msg: projects[0] > 0 ? `${projects[0]} project is updated` : 'Cannot update project/ project_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

const deleteProject = (project_ids) => new Promise( async (resolve, reject) => {
    try {

        const projects = await db.Project.destroy({
            where: {project_id: project_ids}
        });
        resolve({
            msg: projects > 0 ? `${projects} projects is deleted` : 'Cannot delete projects/ project_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

 module.exports = { getAllProjects, createProject , updateProject, deleteProject};
