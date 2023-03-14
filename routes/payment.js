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
 *                example: 20
 *              student_id:
 *                type: string
 *                example: "UqS5MbD2RtPxJ83LWCgapm8tXBj2"
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

module.exports = router;