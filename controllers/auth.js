const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');

const loginGoogle = async (req, res) => {
    try {
        const {email: email} = req.user;
        if(!email) {
            throw new BadRequestError('Please provide email');
        }
        const response = await services.loginGoogle(req.user);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError('Internal Server Error');
    }
};

module.exports = loginGoogle;
