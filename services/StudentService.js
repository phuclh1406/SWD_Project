const db = require('../models/Index');
const { Op } = require('sequelize');
const multer = require("multer");
const firebase = require("../config/FirebaseConfig");
const {NotFoundError} = require("../errors/Index")

const getAllStudent = ({page, limit, order, student_name, ...query}) => new Promise( async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const flimit = +limit || +process.env.LIMIT_POST;
        queries.offset = offset * flimit;
        queries.limit = flimit;
        if(order) queries.order = [order]
        if(student_name) query.student_name = {[Op.substring]: student_name}

        const students = await db.Student.findAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['role_id', 'major_id', 'createAt', 'updateAt', 'refresh_token'],
            },
            include: [{
                model: db.Role, as: 'student_role', attributes: ['role_id', 'role_name'],
            }]
        });
        resolve({
            msg: students ? `Got student` : 'Cannot find student',
            posts: students
        });
    } catch (error) {
        reject(error);
    }
});

const updateStudent = ({student_id, ...body}) => new Promise( async (resolve, reject) => {
    try {
        const students = await db.Student.update(body, {
            where: {student_id}
        });
        resolve({
            msg: students[0] > 0 ? `${students[0]} student update` : 'Cannot update student/ student_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

const deleteStudent = (student_ids) => new Promise( async (resolve, reject) => {
    try {
        const students = await db.Student.destroy({
            where: {student_id: student_ids}
        });
        resolve({
            msg: students > 0 ? `${students} student delete` : 'Cannot delete student/ student_id not found',
        });
    } catch (error) {
        reject(error);
    }
});

module.exports =  {getAllStudent, updateStudent, deleteStudent};