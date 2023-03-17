const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Mail_send:
 *       type: object
 *       required:
 *         - mailTo
 *       properties:
 *         mailTo:
 *           type: string
 *           description: Send to email
 *       example:
 *         mailTo: dnhan2426@gmail.com
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OTP_send:
 *       type: object
 *       required:
 *         - OTP
 *         - otp_id
 *       properties:
 *         OTP:
 *           type: string
 *           description: OTP for verify forgot password
 *         otp_id:
 *           type: string
 *           description: otp_id for find OTP
 *       example:
 *         OTP: "123456"
 *         otp_id: "some_otp_id"
 */

/**
 * @swagger
 * /api/v1/forgotpass/send_recovery_email:
 *   post:
 *     summary: Send mail with otp for forgot password
 *     tags: [forgot-password-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Mail_send'
 *            example:
 *              mailTo: dnhan2426@gmail.com
 *     responses:
 *       200:
 *         description: Send mail successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mail_send'

 */
router.post("/send_recovery_email", controllers.sendMail);

/**
 * @swagger
 * /api/v1/forgotpass/verify_otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [forgot-password-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OTP_send'
 *            example:
 *              OTP: "123456"
 *              otp_id: e3f85679-af22-45fe-946f-2d9cdd7c3884
 *     responses:
 *       200:
 *         description: Verify OTP successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OTP_send'

 */
router.post("/verify_otp", controllers.verifyOtp);


module.exports = router;
