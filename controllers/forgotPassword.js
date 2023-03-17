const services = require("../services");
const { BadRequestError, InternalServerError } = require("../errors");

const sendMail = async (req, res) => {
    try {
        const {mailTo: mailTo} = req.body;
        if(!mailTo) {
            throw new BadRequestError('Please provide mailTo');
        }
        const response = await services.sendMails(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
}

const verifyOtp = async (req, res) => {
    try {
        const {OTP: OTP, otp_id: otp_id} = req.body;
        if(!OTP) {
            throw new BadRequestError('Please provide OTP');
        }
        if(!otp_id) {
            throw new BadRequestError('Please provide otp_id');
        }
        const response = await services.verifyOtp(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
}

const changePassword = async (req, res) => {
    try {
        const {email: email, new_password: new_password, confirm_password: confirm_password } = req.body;
        if(!new_password) {
            throw new BadRequestError('Please provide new password');
        }
        if(!confirm_password) {
            throw new BadRequestError('Please provide confirm password');
        }
        if(!email) {
            throw new BadRequestError('Please provide email');
        }
        const response = await services.changePassword(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(error);
    }
}

module.exports = {sendMail, verifyOtp, changePassword};
