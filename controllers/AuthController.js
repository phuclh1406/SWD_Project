const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {refresh_token, student_id} = require('../helpers/joiSchema');

const loginGoogle = async (req, res) => {
    try {
        const {email: email} = req.user;
        if(!email) {
            throw new BadRequestError('Please provide email');
        }
        const response = await services.loginGoogle(req.user);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        const { error } = joi.object({refresh_token}).validate(req.body);
        if (error) {
            return res.status(400).json({msg: error.details[0].message});
        }
        const response = await services.refreshAccessToken(req.body.refresh_token);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const logout = async (req, res) => {
    try {
        const { error } = joi.object({student_id}).validate(req.query);
        if (error) {
            return res.status(400).json({msg: error.details[0].message});
        }
        console.log(req.query.student_id);
        const response = await services.logout(req.query.student_id);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError('Internal Server Error');
    }
};

module.exports = {loginGoogle, refreshAccessToken, logout};
