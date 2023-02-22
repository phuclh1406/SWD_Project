require('express-async-errors');
const auth = require('./auth');
const post = require('./post');
const student = require('./student');
const firebaseService = require('./firebaseService');
const project = require('./project')
const major = require('./major')
const category = require('./category')
const notFoundMiddleware = require('../middlewares/not-found');
const errorHandlerMiddleware = require('../middlewares/error_handler');

const initRoutes = (app) => {
    
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/posts', post);
    app.use('/api/v1/students', student);
    app.use('/api/v1', firebaseService);
    app.use('/api/v1/projects', project);
    app.use('/api/v1/majors', major);
    app.use('/api/v1/categories', category);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}

module.exports = initRoutes;
