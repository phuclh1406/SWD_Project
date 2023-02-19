require("dotenv").config();
const db = require('../models');
const jwt = require('jsonwebtoken');

const loginGoogle = ({name, picture, user_id, email}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Student.findOrCreate({
            where: {email},
            defaults: {
                student_id: user_id,
                student_name: name,
                email: email,
                avatar: picture,
                role_id: "5826d1d9-c33a-45c5-b93e-894e1dde10bd",
            }
        });

        const student = await db.Student.findOne({
            where: {email: email},
            raw: true,
            nest: true,
            attributes: {
                exclude: ['role_id', 'status', 'createdAt', 'updatedAt', 'major_id', 'refresh_token'],
            },
            include: [{
                model: db.Role, as: 'student_role', attributes: ['role_id', 'role_name']
            }]
        });

        const [accessToken, refreshToken] = await Promise.all([
            jwt.sign({student_id: response[0].student_id, email: response[0].email, role_name: student.student_role.role_name}, process.env.JWT_SECRET, {expiresIn: '10s'}),
            jwt.sign({student_id: response[0].student_id}, process.env.JWT_SECRET_REFRESH, {expiresIn: '5d'}),
        ]);

        if(refreshToken) {
            await db.Student.update({
                refresh_token: refreshToken,
            }, {where: { student_id: response[0].student_id }
            });
        };

        resolve({
            mes: 'Login successfully',
            'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
            'refresh_token': refreshToken,
            'student': student
        });
    } catch (error) {
        console.log(error);
        reject(error);
    }
});

const refreshAccessToken = (refresh_token) => new Promise(async (resolve, reject) => {
    try {
        const student = await db.Student.findOne({
            where: {refresh_token},
            raw: true,
            nest: true,
            attributes: {
                exclude: ['role_id', 'status', 'createdAt', 'updatedAt', 'major_id'],
            },
            include: [{
                model: db.Role, as: 'student_role', attributes: ['role_name']
            }]
        });
        if (student) {
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH, (err) => {
                if (err) {
                resolve({
                    mes: 'Refresh token expired',
                })}
                else {
                    const accessToken = jwt.sign({student_id: student.student_id, email: student.email, role_name: student.student_role.role_name}, process.env.JWT_SECRET, {expiresIn: '1h'});
                    resolve({
                        mes: accessToken ? 'Create refresh token successfully' : 'Create refresh token unsuccessfully',
                        'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
                        'refresh_token': refresh_token,
                    })
                }
            })
        }
    } catch (error) {
        console.log(error);
        reject(error);
    }
});

module.exports = {loginGoogle, refreshAccessToken};
