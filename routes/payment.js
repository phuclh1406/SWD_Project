require("dotenv").config();
const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');
const router = express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Deliverable_stripe:
 *        type: object
 *        properties:
 *          deliverable_id:
 *            type: string
 *            example: "1e1e1106-abb8-442d-b8b6-86f5d074bbbc"
 *          title:
 *            type: string
 *            example: "Project File Submition"
 *          deliverable_application:
 *            type: object
 *            properties:
 *              application_id:
 *                type: string
 *                example: "a3cba015-3737-4b04-85ef-b5b877d13ce2"
 *              price:
 *                type: integer
 *                example: 200000
 *              student_id:
 *                type: string
 *                example: "UqS5MbD2RtPxJ83LWCgapm8tXBj2"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         transaction_id:
 *           type: string
 *           description: The auto-generated id of the transaction
 *         price:
 *           type: number
 *           description: The transaction total price
 *         poster_id:
 *           type: string
 *           description: The poster who pay money 
 *         doer_id:
 *           type: string
 *           description: The doer who receive money
 *         deliverable_id:
 *           type: string
 *           description: The transaction of deliverable
 *         status:
 *           type: string
 *           description: The transaction status
 */

/**
 * @swagger
 * /api/v1/stripe/create-checkout-session:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Payment
 *     tags: [payment-controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deliverables:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Deliverable_stripe'
 *     responses:
 *       '200':
 *         description: Payment successfully
 *       '400':
 *         description: Invalid request data
 */
router.post('/create-checkout-session', verifyToken, controllers.payment);

/**
 * @swagger
 * /api/v1/stripe:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the transactions
 *     tags: [payment-controller]
 *     parameters:
 *       - name: poster_id
 *         in: query
 *         schema:
 *           type: string
 *         description: Find transactions by poster_id
 *     responses:
 *       200:
 *         description: Get the list of the transactions successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get("/", verifyToken, controllers.getAllTransactions);

module.exports = router;