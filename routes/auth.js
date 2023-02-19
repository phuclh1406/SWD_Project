const controllers = require('../controllers');
const express = require('express');
const firebase_auth = require('../middlewares/verify_firebase_token');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         refresh_token:
 *           type: String
 *           description: The auto-generated id of the book
 */

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
router.post('/loginGoogle', firebase_auth, controllers.loginGoogle);

/**
 * @swagger
 * /api/v1/auth/refreshToken:
 *   post:
 *     summary: For refresh new token
 *     security: 
 *         - BearerAuth: []
 *     tags: [auth-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Token'
 *            example:
 *              refresh_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiVjJzU0MxSFNMQVNOdFRUMFJoendxRHh4d3JpMiIsImlhdCI6MTY3NjgyOTMzMiwiZXhwIjoxNjc3MjYxMzMyfQ.8LfwVJoW5hPcw1rR9-sOWlhQBT83xhQAYJXFUAE2Z9k
 *     responses:
 *       200:
 *         description: For refresh new token
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post('/refreshToken', controllers.refreshAccessToken);

module.exports = router;
