const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');

const getAllApplications = async (req, res) => {
    try {
        const { role_name } = req.user;
        const response = await services.getAllApplications(req.query, role_name);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const getAllApplicationsByStudentId = async (req, res) => {
    try {
        const response = await services.getAllApplicationsHome(req.query);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const acceptApplication = async (req, res) => {
    try {
        const response = await services.getAllApplicationsHome(req.query);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const createApplication = async (req, res) => {
    try {
        const {student_id} = req.user
        const {application_name: application_name, description: description, url: url, price: price, cate_id: cate_id, major_id: major_id} = req.body;
        if(!application_name) {
            throw new BadRequestError('Please provide application_name');
        }
        if(!description) {
            throw new BadRequestError('Please provide description');
        }
        if(!price) {
            throw new BadRequestError('Please provide price');
        }
        if(!cate_id) {
            throw new BadRequestError('Please provide cate_id');
        }
        if(!major_id) {
            throw new BadRequestError('Please provide major_id');
        }

        const response = await services.createApplication(req.body, student_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const updateApplication = async (req, res) => {
    try {
        const { error } = joi.object({application_id}).validate({application_id: req.body.application_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updateApplication(req.body);
        return res.status(200).json(response);
    } catch (error) {
        throw new InternalServerError(error);
    }
};

const deleteApplication = async (req, res) => {
    try {
        const { error } = joi.object({application_ids}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.deleteApplication(req.query.application_ids);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const getApplicationById = async (req, res) => {
    try {
        const { id: application_id } = req.params;
        const response = await services.getApplicationById(application_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error.message);
    }
};

module.exports = {getAllApplications, createApplication, updateApplication, deleteApplication, getApplicationById, getAllApplicationsByStudentId, acceptApplication};
