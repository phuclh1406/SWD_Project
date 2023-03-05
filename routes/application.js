const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       required:
 *         - student_id
 *         - project_id
 *       properties:
 *         application_id:
 *           type: string
 *           description: The auto-generated id of the application
 *         price:
 *           type: number
 *           description: The application price
 *         student_id:
 *           type: string
 *           description: The application doer
 *         project_id:
 *           type: string
 *           description: The application project
 *         status:
 *           type: string
 *           description: The application status("Active", "Pending", "Deactive", "Finished")
 */

/**
 * @swagger
 * /api/v1/applications:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the applications
 *     tags: [application-controller]
 *     parameters:
 *       - name: student_id
 *         in: query
 *         schema:
 *           type: string
 *         description: Find application by student_id
 *       - name: project_id
 *         in: query
 *         schema:
 *           type: string
 *         description: Find application by project_id
 *     responses:
 *       200:
 *         description: Get the list of the applications successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.get("/", verifyToken, controllers.getAllApplications);

/**
 * @swagger
 * /api/v1/applications/{id}:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the the application by id
 *     tags: [application-controller]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         description: Find application by application_id
 *     responses:
 *       200:
 *         description: For get the application by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.get("/:id", verifyToken, controllers.getApplicationById);

/**
 * @swagger
 * /api/v1/applications:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Apply to project
 *     tags: [application-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Application'
 *            example:
 *              project_id: b84a02a8-1b39-4ebf-bc5b-4255df846818
 *     responses:
 *       200:
 *         description: Apply to project successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'

 */
router.post("/", verifyToken, controllers.createApplication);

/**
 * @swagger
 * /api/v1/applications/accept:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Poster accept new application
 *     tags: [application-controller]
 *     parameters:
 *       - name: application_id
 *         in: query
 *         schema:
 *           type: string
 *         description: Accept application by application_id
 *     responses:
 *       200:
 *         description: Poster accept new application successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.post("/accept/", verifyToken, controllers.acceptApplication);

/**
 * @swagger
 * /api/v1/applications:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update change project by id
 *     tags: [application-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Application'
 *            example:
 *               application_id: 8c382e13-8620-460a-bd95-96b1152c1368
 *               project_id: b84a02a8-1b39-4ebf-bc5b-4255df846818
 *               status: Active
 *     responses:
 *       200:
 *         description: Update change project successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.put("/", verifyToken, controllers.updateApplication);

/**
 * @swagger
 * /api/v1/applications/{id}:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the applications by id
 *     tags: [application-controller]
 *     parameters:
 *       - name: application_ids[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Input application_id to delete
 *     responses:
 *       200:
 *         description: Delete the applications by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.put("/:id", verifyToken, controllers.deleteApplication);

module.exports = router;