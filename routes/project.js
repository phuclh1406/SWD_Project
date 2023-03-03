const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');
const router = express.Router();

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
 *           type: string
 *           description: The auto-generated id of the book
 *         project_name:
 *           type: string
 *           description: The project name
 *         description:
 *           type: string
 *           description: The project description
 *         price:
 *           type: number
 *           description: The project price
 *         url:
 *           type: string
 *           description: The project url 
 *         poster_id:
 *           type: string
 *           description: The poster who posts project 
 *         doer_id:
 *           type: string
 *           description: The doer who apply project
 *         cate_id:
 *           type: string
 *           description: The project category
 *         major_id:
 *           type: string
 *           description: The project major
 *         status:
 *           type: string
 *           description: The project status('active', 'pending', 'deactive')
 */

/**
 * @swagger
 * /api/v1/projects/home:
 *   get:
 *     summary: Returns the list of all the projects to home page
 *     tags: [home-controller]
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
router.get("/home/", controllers.getAllProjectsHome);


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
 *       - name: poster_id
 *         in: query
 *         schema:
 *           type: string
 *         description: Find project by poster_id
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
router.get("/", verifyToken, controllers.getAllProjects);

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
router.get("/:id", verifyToken, controllers.getProjectById);

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
 *              project_name: Football Field Booking Management System
 *              description: The system to manage field of the field owner and the field booking schedule of customer in Ho Chi Minh city
 *              price: 20
 *              url: https://github.com/nhannguyen24/math-util-live.git
 *              cate_id: b84a02a8-1b39-4ebf-bc5b-4255df846818
 *              major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
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
router.post("/", verifyToken, controllers.createProject);

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
 *               project_name: Football Field Booking Management System
 *               description: The system to manage field of the field owner and the field booking schedule of customer in Ho Chi Minh city
 *               price: 20
 *               url: https://github.com/nhannguyen24/math-util-live.git
 *               cate_id: b84a02a8-1b39-4ebf-bc5b-4255df846818
 *               major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
 *               status: Active
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
router.put("/", verifyToken, controllers.updateProject);

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
router.put("/:id", verifyToken, controllers.deleteProject);

module.exports = router;
