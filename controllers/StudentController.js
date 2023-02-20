const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {student_id, student_ids} = require('../helpers/joiSchema');

const getAllStudent = async (req, res) => {
    try {
        const response = await services.getAllStudent(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const updateStudent = async (req, res) => {
    try {
        const { error } = joi.object({student_id}).validate({student_id: req.body.student_id});
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.updateStudent(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { error } = joi.object({student_ids}).validate(req.query);
        if (error) throw new BadRequestError(error.details[0].message);
        const response = await services.deleteStudent(req.query.student_ids);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

module.exports = {getAllStudent, updateStudent, deleteStudent};