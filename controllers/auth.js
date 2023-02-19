const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {refresh_token} = require('../helpers/joi_schema');

const loginGoogle = async (req, res) => {
    try {
        const {email: email} = req.user;
        if(!email) {
            throw new BadRequestError('Please provide email');
        }
        const response = await services.loginGoogle(req.user);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError('Internal Server Error');
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
        throw new InternalServerError('Internal Server Error');
    }
};

module.exports = {loginGoogle, refreshAccessToken};
