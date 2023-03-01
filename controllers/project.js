const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {project_name, student_id, project_id, project_ids, description, url} = require('../helpers/joi_schema');

const getAllProjects = async (req, res) => {
    try {
        const { role_name } = req.user;
        const response = await services.getAllProjects(req.query, role_name);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const createProject = async (req, res) => {
    try {
        const { error } = joi.object({project_name, student_id, description, url}).validate(req.body);
        if (error) {
            return res.status(400).json({msg: error.details[0].message});
        }
        const response = await services.createProject(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const updateProject = async (req, res) => {
    try {
        const { error } = joi.object({project_id}).validate({project_id: req.body.project_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updateProject(req.body);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const deleteProject = async (req, res) => {
    try {
        const { error } = joi.object({project_ids}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.deleteProject(req.query.project_ids);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const getProjectById = async (req, res) => {
    try {
        const { id: project_id } = req.params;
        const response = await services.getProjectById(project_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error.message);
    }
};

module.exports = {getAllProjects, createProject, updateProject, deleteProject, getProjectById};
