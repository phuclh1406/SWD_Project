const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');
const verifyRole = require('../middlewares/verify_role');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Statistic:
 *       type: object
 *       required:
 *         - title
 *         - author
 */

/**
 * @swagger
 * /api/v1/statistic/projects:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns number of project in the system (1 week, 1 month, 6 month, 1 year, all in one api)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all project in the system (1 week, 1 month, 6 month, 1 year, all in one api)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/projects", verifyToken, controllers.countAllProjectInOneAPI);

/**
 * @swagger
 * /api/v1/statistic/accounts:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns number of accounts registered in the system (1 week, 1 month, 6 month, 1 year, all)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all accounts registered in the system (1 week, 1 month, 6 month, 1 year, all)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/accounts", verifyToken, controllers.countAllAccount);

module.exports = router;