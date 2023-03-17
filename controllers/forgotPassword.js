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

module.exports = {sendMail, verifyOtp};
