const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');

const getAllStudent = async (req, res) => {
    try {
        const response = await services.getAllStudent();
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError('Internal Server Error');
    }
};


module.exports = getAllStudent;