const {UnauthenticatedError} = require('../errors/unauthenticated');

const isAdmin = (req, res, next) => {
    const { role_id } = req.user;
    if (role_id !== 'Admin') return notAuth('Require role Admin', res);
    next();
};

module.exports = isAdmin;