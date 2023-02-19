const db = require('../models');
const { Op } = require('sequelize');

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
                exclude: ['role_id', 'major_id', 'createAt', 'updateAt'],
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

// const getStudentByEmail = ({ email }) => new Promise( async (resolve, reject) => {
//     try {

//         const students = await db.Student.findAll({
//             where: {email},
//             raw: true,
//             nest: true,
//             attributes: {
//                 exclude: ['role_id', 'major_id', 'createAt', 'updateAt'],
//             },
//             include: [{
//                 model: db.Role, as: 'student_role', attributes: ['role_id', 'role_name'],
//             }]
//         });
//         resolve({
//             msg: students ? `Got student` : 'Cannot find student',
//             posts: students
//         });
//     } catch (error) {
//         reject(error);
//     }
// });

module.exports =  {getAllStudent};