// import auth from './auth';
// import post from './post';
const auth = require('./auth');
const post = require('./post');

const initRoutes = (app) => {
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/post', post)

    return app.use('/', (req, res) => {
        return res.send('SERVER ON');
    })
}

module.exports = initRoutes;