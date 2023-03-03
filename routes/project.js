const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         project_id:
 *           type: UUID
 *           description: The auto-generated id of the book
 *         project_name:
 *           type: string
 *           description: The project name
 *         student_id:
 *           type: UUID
 *           description: student id
 *         status:
 *           type: enum
 *           description: The project status('active', 'pending', 'deactive')
 */

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the projects
 *     tags: [project-controller]
 *     parameters:
 *       - name: project_name
 *         in: query
 *         schema:
 *           type: string
 *         description: Find project by project_name
 *       - name: page
 *         in: query
 *         schema:
 *           type: int
 *         description: Paging page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: int
 *         description: Paging limit row to get in 1 page
 *       - name: order[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort by (project_name/status)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: Get the list of the projects successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get("/", controllers.getAllProjects);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the the project by id
 *     tags: [project-controller]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         description: Find project by student_id
 *     responses:
 *       200:
 *         description: For get the project by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get("/:id", controllers.getProjectById);


/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Create new project
 *     tags: [project-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *            example:
 *              student_id: V2sSC1HSLASNtTT0RhzwqDxxwri2
 *              project_name: Football Field Booking Management System
 *              description: The system to manage field of the field owner and the field booking schedule of customer in Ho Chi Minh city
 *              url: https://github.com/nhannguyen24/math-util-live.git
 *     responses:
 *       200:
 *         description: Create new project successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'

 */
router.post("/", controllers.createProject);

/**
 * @swagger
 * /api/v1/projects:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the project by id
 *     tags: [project-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *            example:
 *               project_id: 8c382e13-8620-460a-bd95-96b1152c1368
 *               project_name: Design Pattern
 *               status: active
 *     responses:
 *       200:
 *         description: For get the list of the projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.put("/", controllers.updateProject);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the projects by id
 *     tags: [project-controller]
 *     parameters:
 *       - name: project_ids[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Input project_id to delete
 *     responses:
 *       200:
 *         description: Delete the projects by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.put("/:id", controllers.deleteProject);

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the projects
 *     tags: [project-controller]
 *     parameters:
 *       - name: project_name
 *         in: query
 *         schema:
 *           type: string
 *         description: Find project by project_name
 *       - name: page
 *         in: query
 *         schema:
 *           type: int
 *         description: Paging page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: int
 *         description: Paging limit row to get in 1 page
 *       - name: order[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort by (project_name/status)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: Get the list of the projects successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get("/poster/", controllers.getProjectsByPosterId);

module.exports = router;
