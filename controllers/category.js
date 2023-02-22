const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {cate_name, cate_ids, cate_id} = require('../helpers/joi_schema');

const getAllCategories = async (req, res) => {
    try {
        const response = await services.getAllCategories(req.query);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const createCategory = async (req, res) => {
    try {
        const { error } = joi.object({cate_name}).validate(req.body);
        if (error) {
            return res.status(400).json({msg: error.details[0].message});
        }
        const response = await services.createCategory(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const { error } = joi.object({cate_id}).validate({cate_id: req.body.cate_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updateCategory(req.body);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { error } = joi.object({cate_ids}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.deleteCategory(req.query.cate_ids);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

module.exports = {getAllCategories, createCategory, updateCategory, deleteCategory};
