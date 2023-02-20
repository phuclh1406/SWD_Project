require('express-async-errors');
const auth = require('./authRouter');
const post = require('./postRouter');
const student = require('./studentRouter');
const uploadFile = require('./uploadFileRouter');
const notFoundMiddleware = require('../middlewares/routeNotFound');
const errorHandlerMiddleware = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/posts', post);
    app.use('/api/v1/students', student);
    app.use('/api/v1/upload-file', uploadFile);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}

module.exports = initRoutes;
