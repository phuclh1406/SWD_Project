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
 *         - title
 *         - author
 *       properties:
 *         mailTo:
 *           type: string
 *           description: The email is sended
 *       example:
 *         mailTo: dnhan2426@gmail.com
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

module.exports = router;
