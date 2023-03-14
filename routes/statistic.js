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
 * /api/v1/statistic:
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
router.get("/", verifyToken, controllers.countAllProject);

/**
 * @swagger
 * /api/v1/statistic/week:
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
router.get("/week", verifyToken, controllers.countAllProjectInOneWeek);

/**
 * @swagger
 * /api/v1/statistic/month:
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
router.get("/month", verifyToken, controllers.countAllProjectInOneMonth);

/**
 * @swagger
 * /api/v1/statistic/6month:
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
router.get("/6month", verifyToken, controllers.countAllProjectInSixMonth);

/**
 * @swagger
 * /api/v1/statistic/year:
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
router.get("/year", verifyToken, controllers.countAllProjectInOneYear);

module.exports = router;