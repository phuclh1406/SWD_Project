const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Major:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         major_id:
 *           type: UUID
 *           description: The auto-generated id of the book
 *         major_name:
 *           type: string
 *           description: The major name
 *         status:
 *           type: enum
 *           description: The major status('active', 'pending', 'deactive')
 */

/**
 * @swagger
 * /api/v1/majors:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the majors
 *     tags: [major-controller]
 *     parameters:
 *       - name: major_name
 *         in: query
 *         schema:
 *           type: string
 *         description: Find major by major_name
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
 *         description: Sort by (major_name/status)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: Get the list of the majors successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Majors'
 */
router.get("/", controllers.getAllMajors);

/**
 * @swagger
 * /api/v1/majors:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Create new major
 *     tags: [major-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Major'
 *            example:
 *              major_name: Design Pattern 
 *     responses:
 *       200:
 *         description: Create new major successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Major'

 */
router.post("/", controllers.createMajor);

/**
 * @swagger
 * /api/v1/majors:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the major by id
 *     tags: [major-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Major'
 *            example:
 *               major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
 *               major_name: Design Pattern
 *               status: active
 *     responses:
 *       200:
 *         description: For get the list of the majors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Major'
 */
router.put("/", controllers.updateMajor);

/**
 * @swagger
 * /api/v1/majors/{id}:
 *   delete:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the majors by id
 *     tags: [major-controller]
 *     parameters:
 *       - name: major_ids[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Input major_id to delete
 *     responses:
 *       200:
 *         description: Delete the majors by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Major'
 */
router.delete("/:id", controllers.deleteMajor);

module.exports = router;