const services = require('../services');
const {BadRequestError, InternalServerError} = require('../errors');
const joi = require('joi');
const {student_id, student_ids, student_name, email, avatar, role_id, major_id} = require('../helpers/joi_schema');

const getAllStudent = async (req, res) => {
    try {
        const response = await services.getAllStudent();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const getAllStudentPaging = async (req, res) => {
    try {
        const response = await services.getAllStudentPaging(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const getAllStudentByAdmin = async (req, res) => {
    try {
        const response = await services.getAllStudentByAdmin(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
};

const createStudent = async (req, res) => {
    try {
        const { error } = joi.object({student_name, email, avatar, role_id, major_id}).validate(req.body);
        if (error) {
            return res.status(400).json({msg: error.details[0].message});
        }
        const response = await services.createStudent(req.body);
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

const getStudentById = async (req, res) => {
    try {
        const { id: student_id } = req.params;
        const response = await services.getStudentById(student_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error.message);
    }
};

module.exports = {getAllStudent, updateStudent, deleteStudent, getStudentById, createStudent, getAllStudentByAdmin, getAllStudentPaging};