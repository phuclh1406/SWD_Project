// import * as controllers from "../controllers";
// import express from "express";
const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
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
 *         status:
 *           type: enum
 *           description: The post status('active', 'pending', 'deactive')
 *       example:
 *         id: 797f8f86-a54f-4c84-9ea7-9b34d2364d20
 *         decription: Cần tìm người
 *         post_title: React project
 *         timeStart: 2022-12-20
 *         timeEnd: 2023-01-30
 *         status: active
 */

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the posts
 *     tags: [post-controller]
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
router.get("/", controllers.getAllPost);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Returns the posts by id
 *     security: 
 *         - BearerAuth: []
 *     tags: [post-controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: For get the posts by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobPost'
 */
router.get("/:id", controllers.getPostById);

module.exports = router;
