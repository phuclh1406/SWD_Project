const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {major_name, major_id, major_ids} = require('../helpers/joi_schema');

const getAllMajors = async (req, res) => {
    try {
        const response = await services.getAllMajors(req.query);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const createMajor = async (req, res) => {
    try {
        const { error } = joi.object({major_name}).validate(req.body);
        if (error) {
            return res.status(400).json({msg: error.details[0].message});
        }
        const response = await services.createMajor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const updateMajor = async (req, res) => {
    try {
        const { error } = joi.object({major_id}).validate({major_id: req.body.major_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updateMajor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const deleteMajor = async (req, res) => {
    try {
        const { error } = joi.object({major_ids}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.deleteMajor(req.query.major_ids);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

module.exports = {getAllMajors, createMajor, updateMajor, deleteMajor};
