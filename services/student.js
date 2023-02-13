const db = require('../models');

const getAllStudent = () => new Promise( async (resolve, reject) => {
    try {
        const students = await db.Student.findAll({
            raw: true,
            nest: true
        });
        resolve({students});
    } catch (error) {
        reject(error);
    }
});

module.exports = getAllStudent;