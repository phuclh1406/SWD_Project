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

/**
 * @swagger
 * /api/v1/students/{id}:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the the students by id
 *     tags: [student-controller]
 *     parameters:
 *       - name: student_id
 *         in: params
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
router.get("/:id", controllers.getStudentById);

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
 *              student_id: eade5e05-c27e-4fc8-96f2-50af09b7924d
 *              student_name: Nhan Nguyen
 *              avatar: https://storage.googleapis.com/react-auth-bc0a4.appspot.com/web.jpg?GoogleAccessId=firebase-adminsdk-c5k74%40react-auth-bc0a4.iam.gserviceaccount.com&Expires=1678986000&Signature=IWWYMwdwfrzEiteVuS3VURcm3zsHUu0wm0RD1nLapblU3CPOaXB1Srbs2iqN2fIA3zQ8jpprHYNHoASp7XdzAS3KiT4ufnHgxQrPFkSsno9Mh3IoqbLAzAosRlYiCjv91D84wqGW2nQJ3GyqeqrBsxt2cTZ%2B%2BGIaZUAtPyXUv%2FOVPKwC8amCl1DL%2F%2BRlO%2F65wXRxvuvukLz49v9B%2BOuXQjeWZq04t6OYyokYXMGTekMTADQls0I9vw%2FczFgjKA%2FXgN6P9XyrazdkqFMHWxEJV%2ByUp3CD%2BH%2Bu%2BjliezcJ%2B%2FlLhYKm2OuQryJAmhHLxYkadwb74I82T1%2FCzHAn%2BCcLAw%3D%3D
 *              role_id: 5826d1d9-c33a-45c5-b93e-894e1dde10bd
 *              major_id: 9a3dbef2-a705-45aa-9dcd-b23b3d7c12f9
 *              status: active
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
router.put("/", controllers.updateStudent);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   delete:
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
router.put("/:id", controllers.deleteStudent);

module.exports = router;
