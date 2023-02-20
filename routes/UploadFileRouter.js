const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/VerifyToken');

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/v1/upload-file:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Upload image
 *     tags: [uploadFile-controller]
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
router.post("/", controllers.uploadFile);

module.exports = router;

