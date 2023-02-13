require('express-async-errors');
const auth = require('./auth');
const post = require('./post');
const student = require('./student');
const firebase_auth = require('../middlewares/verify_firebase_token');
const notFoundMiddleware = require('../middlewares/not-found');
const errorHandlerMiddleware = require('../middlewares/error-handler');

const initRoutes = (app) => {
    app.use('/api/v1/auth', firebase_auth, auth);
    app.use('/api/v1/posts', post);
    app.use('/api/v1/students', student);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}

module.exports = initRoutes;
