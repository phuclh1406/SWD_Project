const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {project_name, student_id, project_id, project_ids} = require('../helpers/joi_schema');

const getAllProjects = async (req, res) => {
    try {
        const response = await services.getAllProjects(req.query);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const createProject = async (req, res) => {
    try {
        const { error } = joi.object({project_name, student_id}).validate(req.body);
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

module.exports = {getAllProjects, createProject, updateProject, deleteProject};
