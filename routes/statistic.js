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
 *     summary: Returns number of project in the system
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all project in the system
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/projects", verifyToken, controllers.countAllProject);

/**
 * @swagger
 * /api/v1/statistic/projects/week:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns number of project in the system (1 week)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all project in the system (1 week)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/projects/week", verifyToken, controllers.countAllProjectInOneWeek);

/**
 * @swagger
 * /api/v1/statistic/projects/month:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns number of project in the system (1 month)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all project in the system (1 month)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/projects/month", verifyToken, controllers.countAllProjectInOneMonth);

/**
 * @swagger
 * /api/v1/statistic/projects/6month:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns number of project in the system (6 month)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all project in the system (6 month)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/projects/6month", verifyToken, controllers.countAllProjectInSixMonth);

/**
 * @swagger
 * /api/v1/statistic/projects/year:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns number of project in the system (1 year)
 *     tags: [statistic-controller]
 *     responses:
 *       200:
 *         description: count all project in the system (1 year)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/projects/year", verifyToken, controllers.countAllProjectInOneYear);

/**
 * @swagger
 * /api/v1/statistic/projects/allIn:
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
router.get("/projects/allIn", verifyToken, controllers.countAllProjectInOneAPI);

module.exports = router;