require('express-async-errors');
const auth = require('./AuthRouter');
const post = require('./PostRouter');
const student = require('./StudentRouter');
const uploadFile = require('./UploadFileRouter');
const notFoundMiddleware = require('../middlewares/RouteNotFound');
const errorHandlerMiddleware = require('../middlewares/ErrorHandler');

const initRoutes = (app) => {
    
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/posts', post);
    app.use('/api/v1/students', student);
    app.use('/api/v1/upload-file', uploadFile);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}

module.exports = initRoutes;
