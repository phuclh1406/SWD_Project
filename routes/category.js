const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

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
 *           type: string
 *           description: The auto-generated id of the category
 *         category_name:
 *           type: string
 *           description: The category name
 *         status:
 *           type: string
 *           description: The category status('Active', 'Deactive')
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
router.get("/", verifyToken, controllers.getAllCategories);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the the category by id
 *     tags: [category-controller]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         description: Find category by cate_id
 *     responses:
 *       200:
 *         description: For get the category by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/:id", verifyToken, controllers.getCategoryById);

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
 *              cate_name: Design Pattern 
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
router.post("/", verifyToken, controllers.createCategory);

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
 *               cate_id: ec4b9413-cb91-473b-b80b-c6beaf1a420c
 *               cate_name: Design Pattern
 *               status: Active
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
router.put("/", verifyToken, controllers.updateCategory);

/**
 * @swagger
 * /api/v1/categories/delete:
 *   put:
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
router.put("/delete", verifyToken, controllers.deleteCategory);

module.exports = router;
