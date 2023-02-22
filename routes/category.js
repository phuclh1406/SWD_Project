const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         category_id:
 *           type: UUID
 *           description: The auto-generated id of the book
 *         category_name:
 *           type: string
 *           description: The category name
 *         status:
 *           type: enum
 *           description: The category status('active', 'pending', 'deactive')
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the categories
 *     tags: [category-controller]
 *     parameters:
 *       - name: category_name
 *         in: query
 *         schema:
 *           type: string
 *         description: Find category by category_name
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
 *         description: Sort by (category_name/status)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: Get the list of the categories successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", controllers.getAllCategories);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Create new category
 *     tags: [category-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *            example:
 *              category_name: Design Pattern 
 *     responses:
 *       200:
 *         description: Create new category successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'

 */
router.post("/", controllers.createCategory);

/**
 * @swagger
 * /api/v1/categories:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the category by id
 *     tags: [category-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *            example:
 *               category_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
 *               category_name: Design Pattern
 *               status: active
 *     responses:
 *       200:
 *         description: For get the list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.put("/", controllers.updateCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the categories by id
 *     tags: [category-controller]
 *     parameters:
 *       - name: cate_ids[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Input cate_id to delete
 *     responses:
 *       200:
 *         description: Delete the categories by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.delete("/:id", controllers.deleteCategory);

module.exports = router;
