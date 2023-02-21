const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Firebase:
 *       type: object
 *       required:
 *         - title
 *         - token
 *         - content
 *       properties:
 *         token:
 *           type: string
 *           description: The token of device
 *         title:
 *           type: string
 *           description: The title message
 *         content:
 *           type: string
 *           description: The content message
 */

/**
 * @swagger
 * /api/v1/push-notification:
 *   post:
 *     summary: Push notification
 *     tags: [firebase-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Firebase'
 *            example:
 *              token: string
 *              title: string
 *              content: string
 *     responses:
 *       200:
 *         description: Push notification
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post("/push-notification", controllers.pushNotification);

router.use(verifyToken);

/**
 * @swagger
 * /api/v1/upload-file:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Upload image
 *     tags: [firebase-controller]
 *     requestBody:
 *          required: true
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  file:
 *                    type: string
 *                    format: binary
 *     responses:
 *       200:
 *         description: Upload image
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post("/upload-file", controllers.uploadFile);


module.exports = router;

