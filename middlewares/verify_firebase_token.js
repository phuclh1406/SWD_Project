const {admin} = require('../config/firebase_config');
const {InternalServerError} = require('../errors');

const decodeToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(decodeValue) {
            req.user = decodeValue;
            return next();
        }
        return res.status(401).json({ msg: 'Unauthorize' });
    } catch (error) {
        console.log(error);
        throw new InternalServerError("Internal Server Error");
    }
}

module.exports = decodeToken;