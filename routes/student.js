const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');
const verifyRole = require('../middlewares/verify_role');

const router = express.Router();

router.use(verifyToken);
router.use(verifyRole);

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         student_id:
 *           type: UUID
 *           description: The auto-generated id of the student
 *         student_name:
 *           type: string
 *           description: The student name
 *         email:
 *           type: string
 *           description: The student email
 *         avatar:
 *           type: string
 *           description: The student avatar
 *         status:
 *           type: enum
 *           description: The post status('active', 'deactive')
 *       example:
 *         student_id: 797f8f86-a54f-4c84-9ea7-9b34d2364d20
 *         student_name: Nhân
 *         email: dnhan2426@gmail.com
 *         avatar: https://lh3.googleusercontent.com/a/AEdFTp4508ZdzGjVRFFIwb0ULZXYm5V5_vyRsiKq-cfA=s96-c
 *         status: active
 */

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the students
 *     tags: [student-controller]
 *     parameters:
 *       - name: student_name
 *         in: query
 *         schema:
 *           type: string
 *         description: Find student by student_name
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
 *         description: Sort by (student_name/createdAt)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: For get the list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get("/", controllers.getAllStudent);

// /**
//  * @swagger
//  * /api/v1/students:
//  *   get:
//  *     security: 
//  *         - BearerAuth: []
//  *     summary: Returns the list of all the students
//  *     tags: [student-controller]
//  *     parameters:
//  *       - name: email
//  *         in: query
//  *         schema:
//  *           type: string
//  *         description: Find student by email
//  *     responses:
//  *       200:
//  *         description: For get the list of the students
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Student'
//  */
// router.get("/", controllers.getStudentByEmail);

module.exports = router;
