const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');

const getAllPost = async (req, res) => {
    try {
        const response = await services.getAllPost();
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError('Internal Server Error');
    }
};

const getPostById = async (req, res) => {
    try {
        const { id: id } = req.params;
        const response = await services.getPostById(id);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError('Internal Server Error');
    }
};

module.exports = { getAllPost, getPostById };
