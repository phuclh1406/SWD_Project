const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');
const verifyRole = require('../middlewares/verify_role');

const router = express.Router();

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
 *           type: string
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
 *           type: string
 *           description: The student status('active', 'deactive')
 *       example:
 *         student_id: V2sSC1HSLASNtTT0RhzwqDxxwri2
 *         student_name: Nhan Nguyen
 *         email: dnhan2426@gmail.com
 *         avatar: https://lh3.googleusercontent.com/a/AEdFTp4508ZdzGjVRFFIwb0ULZXYm5V5_vyRsiKq-cfA=s96-c
 */

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the students
 *     tags: [student-controller]
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
router.get("/", verifyToken, verifyRole, controllers.getAllStudent);

/**
 * @swagger
 * /api/v1/students/paging:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the students paging
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
 *         description: For get the list of the students paging
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get("/paging/", verifyToken, verifyRole, controllers.getAllStudentPaging);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the the students by id
 *     tags: [student-controller]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         description: Find student by student_id
 *     responses:
 *       200:
 *         description: For get the students by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get("/:id", verifyToken, verifyRole, controllers.getStudentById);

/**
 * @swagger
 * /api/v1/students:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Create new student
 *     tags: [student-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *            example:
 *              student_name: Nhan
 *              email: abc@gmail.com
 *              avatar: https://cdn-icons-png.flaticon.com/512/147/147144.png
 *              role_id: 5826d1d9-c33a-45c5-b93e-894e1dde10bd
 *              major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
 *     responses:
 *       200:
 *         description: Create new posts successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'

 */
router.post("/", verifyToken, verifyRole, controllers.createStudent);

/**
 * @swagger
 * /api/v1/students:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the student by id
 *     tags: [student-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *            example:
 *              student_id: V2sSC1HSLASNtTT0RhzwqDxxwri2
 *              student_name: Nhan Nguyen
 *              avatar: https://lh3.googleusercontent.com/a/AEdFTp4508ZdzGjVRFFIwb0ULZXYm5V5_vyRsiKq-cfA=s96-c
 *              portfolio: https://www.topcv.vn/xem-cv/ClRXAgQGVVRXAFACV1tZAFFXXg4EAgMOBQJWDQ95e2
 *              role_id: bd86e723-a2d5-47f5-87f2-9a4bc6fe8bb2
 *              major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
 *              status: Active
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
router.put("/", verifyToken, verifyRole, controllers.updateStudent);

/**
 * @swagger
 * /api/v1/students/profile:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the profile
 *     tags: [student-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *            example:
 *              student_name: Nhan Nguyen
 *              avatar: https://lh3.googleusercontent.com/a/AEdFTp4508ZdzGjVRFFIwb0ULZXYm5V5_vyRsiKq-cfA=s96-c
 *              portfolio: https://www.topcv.vn/xem-cv/ClRXAgQGVVRXAFACV1tZAFFXXg4EAgMOBQJWDQ95e2
 *              major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
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
router.put("/profile/", verifyToken, controllers.updateProfile);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the students by id
 *     tags: [student-controller]
 *     parameters:
 *       - name: student_ids[0]
 *         in: query
 *         schema:
 *           type: string
 *         description: Input student_id to delete
 *     responses:
 *       200:
 *         description: Delete the student by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.put("/:id", verifyToken, verifyRole, controllers.deleteStudent);

module.exports = router;
