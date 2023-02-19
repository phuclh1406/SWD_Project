require('express-async-errors');
const auth = require('./auth');
const post = require('./post');
const student = require('./student');
const uploadFile = require('./uploadFile');
const notFoundMiddleware = require('../middlewares/not-found');
const errorHandlerMiddleware = require('../middlewares/error-handler');

const initRoutes = (app) => {
    
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/posts', post);
    app.use('/api/v1/students', student);
    app.use('/api/v1/uploadFile', uploadFile);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}

module.exports = initRoutes;
