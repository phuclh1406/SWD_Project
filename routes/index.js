require('express-async-errors');
const auth = require('./auth');
const post = require('./post');
const student = require('./student');
const firebaseService = require('./firebaseService');
const notFoundMiddleware = require('../middlewares/not-found');
const errorHandlerMiddleware = require('../middlewares/error_handler');

const initRoutes = (app) => {
    
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/posts', post);
    app.use('/api/v1/students', student);
    app.use('/api/v1', firebaseService);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}

module.exports = initRoutes;
