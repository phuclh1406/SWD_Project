const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     JobPost:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         post_id:
 *           type: UUID
 *           description: The auto-generated id of the book
 *         decription:
 *           type: string
 *           description: The post decription
 *         post_title:
 *           type: string
 *           description: The post title
 *         time_start:
 *           type: date
 *           description: The post start time(YYYY-MM-DD)
 *         time_end:
 *           type: date
 *           description: The post start end(YYYY-MM-DD)
 *         project_id:
 *           type: string
 *           description: The post start end(YYYY-MM-DD)
 *         cate_id:
 *           type: string
 *           description: The post start end(YYYY-MM-DD)
 *         major_id:
 *           type: string
 *           description: The post start end(YYYY-MM-DD)
 *         status:
 *           type: enum
 *           description: The post status('active', 'pending', 'deactive')
 */

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the posts
 *     tags: [post-controller]
 *     parameters:
 *       - name: post_title
 *         in: query
 *         schema:
 *           type: string
 *         description: Find post by post_title
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
 *         description: Sort by (post_title/price/time_start/time_end/createdAt)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: Get the list of the posts successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobPost'
 */
router.get("/", controllers.getAllPost);

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Create new post
 *     tags: [post-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/JobPost'
 *            example:
 *              post_title: Tìm người làm cùng
 *              description: Làm chức năng quản lý tiền bạc
 *              time_start: 2000-12-01
 *              time_end: 2000-12-02
 *              price: 10
 *              project_id: 7bedd70c-deb9-429a-821f-064bff37129a
 *              cate_id: ec4b9413-cb91-473b-b80b-c6beaf1a420c
 *              major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
 *     responses:
 *       200:
 *         description: Create new posts successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobPost'

 */
router.post("/", controllers.createPost);

/**
 * @swagger
 * /api/v1/posts:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the post by id
 *     tags: [post-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/JobPost'
 *            example:
 *              post_id: eade5e05-c27e-4fc8-96f2-50af09b7924d
 *              post_title: Tìm người làm cùng
 *              description: Làm chức năng quản lý tiền bạc
 *              time_start: 2000-12-01
 *              time_end: 2000-12-02
 *              price: 10
 *              project_id: 7bedd70c-deb9-429a-821f-064bff37129a
 *              cate_id: ec4b9413-cb91-473b-b80b-c6beaf1a420c
 *              major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
 *              status: active
 *     responses:
 *       200:
 *         description: For get the list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobPost'
 */
router.put("/", controllers.updatePost);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the posts by id
 *     tags: [post-controller]
 *     parameters:
 *       - name: post_ids[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Input post_id to delete
 *     responses:
 *       200:
 *         description: Delete the posts by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobPost'
 */
router.put("/:id", controllers.deletePost);

module.exports = router;
