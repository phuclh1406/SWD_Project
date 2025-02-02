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
 *     summary: Returns number of project in the system (1 week, 1 month, 6 month, 1 year, all)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all project in the system (1 week, 1 month, 6 month, 1 year, all)
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
 * /api/v1/statistic/finishProject:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns number of finish project in the system (1 week, 1 month, 6 month, 1 year, all)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all finish project in the system (1 week, 1 month, 6 month, 1 year, all)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/finishProject", verifyToken, controllers.countAllFinishProject);

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

/**
 * @swagger
 * /api/v1/statistic/transaction:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns sum of transaction in the system (1 week, 1 month, 6 month, 1 year, all)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: sum all transaction in the system (1 week, 1 month, 6 month, 1 year, all)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/transaction", verifyToken, controllers.summaryAllTransaction);

module.exports = router;