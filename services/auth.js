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

        const token = jwt.sign({id: response[0].user_id, email: response[0].email}, process.env.JWT_SECRET, {expiresIn: '2d'});

        resolve({
            err: 0,
            mes: 'Login successfully',
            'access_token': token ? `Bearer ${token}` : token
        });

    } catch (error) {
        console.log(error);
        reject(error);
    }
});

module.exports = loginGoogle;
