const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {deliverable_id} = require('../helpers/joi_schema');

const getAllDeliverables = async (req, res) => {
    try {
        const { role_name } = req.user;
        const response = await services.getAllDeliverables(req.query, role_name);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const createDeliverable = async (req, res) => {
    try {
        const {student_id} = req.user;
        const {title: title, file: file, application_id: application_id} = req.body;
        if(!title) {
            throw new BadRequestError('Please provide title');
        }
        if(!file) {
            throw new BadRequestError('Please provide file');
        }
        if(!application_id) {
            throw new BadRequestError('Please provide application_id');
        }
        const response = await services.createDeliverable(req.body, student_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const updateDeliverable = async (req, res) => {
    try {
        const { error } = joi.object({deliverable_id}).validate({deliverable_id: req.body.deliverable_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updateDeliverable(req.body);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const deleteDeliverable = async (req, res) => {
    try {
        const { error } = joi.object({deliverable_id}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        // console.log(req.query);
        const response = await services.deleteDeliverable(req.query.deliverable_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const getDeliverableById = async (req, res) => {
    try {
        const { id: deliverable_id } = req.params;
        const response = await services.getDeliverableById(deliverable_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error.message);
    }
};

module.exports = {getAllDeliverables, createDeliverable, updateDeliverable, deleteDeliverable, getDeliverableById};
