const controllers = require('../controllers');
const express = require('express');
const verifyToken = require('../middlewares/verify_token');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Deliverable:
 *       type: object
 *       required:
 *         - title
 *         - file
 *         - application_id
 *       properties:
 *         deliverable_id:
 *           type: string
 *           description: The auto-generated id of the deliverable
 *         title:
 *           type: string
 *           description: The deliverable title
 *         decription:
 *           type: string
 *           description: The deliverable decription
 *         file:
 *           type: string
 *           description: The deliverable file
 *         application_id:
 *           type: string
 *           description: The deliverable application_id
 *         status:
 *           type: string
 *           description: The deliverable status('Active', 'Pending', 'Deactive', 'Finished')
 */


/**
 * @swagger
 * /api/v1/deliverables:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the deliverables
 *     tags: [deliverable-controller]
 *     parameters:
 *       - name: application_id
 *         in: query
 *         schema:
 *           type: string
 *         description: Find deliverable by application_id
 *     responses:
 *       200:
 *         description: Get the list of the deliverables successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deliverable'
 */
router.get("/", verifyToken, controllers.getAllDeliverables);

/**
 * @swagger
 * /api/v1/deliverables/{id}:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the the deliverable by id
 *     tags: [deliverable-controller]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         description: Find deliverable by deliverable_id
 *     responses:
 *       200:
 *         description: For get the deliverable by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deliverable'
 */
router.get("/:id", verifyToken, controllers.getDeliverableById);

/**
 * @swagger
 * /api/v1/deliverables:
 *   post:
 *     security: 
 *         - BearerAuth: []
 *     summary: Create new deliverable
 *     tags: [deliverable-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Deliverable'
 *            example:
 *              title: Project File Submition
 *              description: 
 *              file: url here
 *              application_id: 5edec6cd-da82-42ca-bc9d-24401e70e1f1
 *     responses:
 *       200:
 *         description: Create new deliverable successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deliverable'

 */
router.post("/", verifyToken, controllers.createDeliverable);

/**
 * @swagger
 * /api/v1/deliverables:
 *   put:
 *     security: 
 *         - BearerAuth: []
 *     summary: Update the deliverable by id
 *     tags: [deliverable-controller]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Deliverable'
 *            example:
 *               deliverable_id: 0552fc8e-797a-4650-9777-0c9dd40ebcd7
 *               title: Project File Submition
 *               description: 
 *               file: url here
 *     responses:
 *       200:
 *         description: For update the list of the deliverables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deliverable'
 */
router.put("/", verifyToken, controllers.updateDeliverable);

/**
 * @swagger
 * /api/v1/deliverables:
 *   delete:
 *     security: 
 *         - BearerAuth: []
 *     summary: Delete the deliverables by id
 *     tags: [deliverable-controller]
 *     parameters:
 *       - name: deliverable_id
 *         in: query
 *         schema:
 *           type: string
 *         description: Input deliverable_id to delete
 *     responses:
 *       200:
 *         description: Delete the deliverable by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deliverable'
 */
router.delete("/", verifyToken, controllers.deleteDeliverable);

module.exports = router;
