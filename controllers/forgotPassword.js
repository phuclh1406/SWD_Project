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

module.exports = {sendMail};
