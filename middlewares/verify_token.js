const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const auth = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    };
    const token = authHeader.split(' ')[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return UnauthenticatedError('Access token may be expired or invalid');
            req.user = user;
            next();
        })
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};

module.exports = auth