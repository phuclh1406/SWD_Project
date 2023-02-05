// import db from '../models';
const db = require('../models');

const register = () => new Promise((resolve, reject) => {
    try {
        resolve({
            err: 0,
            mes: 'register service'
        });
    } catch (error) {
        reject(error);
    }
});

module.exports = register;