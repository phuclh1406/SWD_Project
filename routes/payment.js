require("dotenv").config();
const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');
const router = express.Router();

// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      Student_stripe:
//  *        type: object
//  *        properties:
//  *          student_id:
//  *            type: string
//  *
//  *      Project_stripe:
//  *        type: object
//  *        properties:
//  *          project_id:
//  *            type: string
//  *          project_name:
//  *            type: string
//  *          price:
//  *            type: number
//  *          image:
//  *            type: string
//  *
//  *      Application_stripe:
//  *        type: array,
//  *        properties:
//  *          application_id:
//  *            type: string
//  *          application_student:
//  *            $ref: '#/components/schemas/Student_stripe'
//  *          application_project:
//  *            $ref: '#/components/schemas/Project_stripe'
//  */

// /**
//  * @swagger
//  * /api/v1/stripe/create-checkout-session:
//  *   post:
//  *     security: 
//  *         - BearerAuth: []
//  *     summary: Create a new application
//  *     tags: [payment-controller]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Application_stripe'
//  *     responses:
//  *       '201':
//  *         description: Application created successfully
//  *       '400':
//  *         description: Invalid request data
//  *   get:
//  *     summary: Get all applications
//  *     responses:
//  *       '200':
//  *         description: List of applications
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Application_stripe'
//  */
// router.post('/create-checkout-session', controllers.payment);


// router.post('/webhook', express.raw({type: "*/*"}), controllers.stripeWebhook);

module.exports = router;