const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {post_id, post_title, description, time_start, time_end, price, post_ids, cate_id, project_id, major_id} = require('../helpers/JoiSchema');

const getAllPost = async (req, res) => {
    try {
        const response = await services.getAllPost(req.query);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const createPost = async (req, res) => {
    try {
        const { error } = joi.object({post_title, description, time_start, time_end, price, cate_id, project_id, major_id}).validate(req.body);
        if (error) {
            return res.status(400).json({msg: error.details[0].message});
        }
        const response = await services.createPost(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const updatePost = async (req, res) => {
    try {
        const { error } = joi.object({post_id}).validate({post_id: req.body.post_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updatePost(req.body);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const deletePost = async (req, res) => {
    try {
        const { error } = joi.object({post_ids}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.deletePost(req.query.post_ids);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

module.exports = { getAllPost, createPost, updatePost, deletePost};
