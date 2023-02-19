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
            }
        });

        const student = await db.Student.findOne({
            where: {email: email},
            raw: true,
            nest: true,
            attributes: {
                exclude: ['role_id'],
            },
            include: [{
                model: db.Role, as: 'student_role', attributes: ['role_name']
            }]
        });

        const accessToken = jwt.sign({student_id: response[0].student_id, email: response[0].email, role_name: student.student_role.role_name}, process.env.JWT_SECRET, {expiresIn: '1d'});

        // const refreshToken = jwt.sign({student_id: response[0].student_id}, process.env.JWT_SECRET, {expiresIn: '10d'});

        resolve({
            err: 0,
            mes: 'Login successfully',
            'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
            // 'refreshToken': refreshToken
        });

        // if(refreshToken) {
        //     await db.User.update({
        //         refreshToken: refreshToken,
        //     }, {where: { student_id: response[0].student_id }
        //     });
        // };

    } catch (error) {
        console.log(error);
        reject(error);
    }
});

module.exports = loginGoogle;
