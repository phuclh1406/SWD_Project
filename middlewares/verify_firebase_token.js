const admin = require('../config/firebase_config');

const decodeToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(decodeValue) {
            req.user = decodeValue;
            return next();
        }
        return res.json({ message: 'Unauthorize' });
    } catch (error) {
        return res.json({ message: 'Internal Error' });
    }
}

module.exports = decodeToken;