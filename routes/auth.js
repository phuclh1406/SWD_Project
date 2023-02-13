const controllers = require('../controllers');
const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/loginGoogle:
 *   post:
 *     summary: For login with google returns the token
 *     tags: [auth-controller]
 *     responses:
 *       200:
 *         description: For login with google returns the token
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.post('/loginGoogle', controllers.loginGoogle);

module.exports = router;




// *     parameters:
// *       - in: header
// *         name: auth
// *         schema:
// *           type: string
// *         required: true
// *         description: an authorization header