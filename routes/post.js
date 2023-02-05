// import * as controllers from "../controllers";
// import express from "express";
const controllers = require('../controllers');
const express = require('express');

const router = express.Router();

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
 *         id:
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
 *           description: The post status('active', 'pending', 'delete')
 *       example:
 *         id: 797f8f86-a54f-4c84-9ea7-9b34d2364d20
 *         decription: Cần tìm người
 *         post_title: React project
 *         timeStart: 2022-12-20
 *         timeEnd: 2023-01-30
 */

/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", controllers.getAllPost);

module.exports = router;
