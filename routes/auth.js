const controllers = require('../controllers');
const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/loginGoogle:
 *   post:
 *     summary: For login with google returns the token
 *     security: 
 *         - BearerAuth: []
 *     tags: [auth-controller]
 *     responses:
 *       200:
 *         description: For login with google returns the token
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post('/loginGoogle', controllers.loginGoogle);

module.exports = router;
