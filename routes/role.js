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
 *     Role:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         role_id:
 *           type: UUID
 *           description: The auto-generated id of the book
 *         role_name:
 *           type: string
 *           description: The role name
 *         status:
 *           type: enum
 *           description: The role status('active', 'deactive')
 */

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     security: 
 *         - BearerAuth: []
 *     summary: Returns the list of all the roles
 *     tags: [role-controller]
 *     parameters:
 *       - name: role_name
 *         in: query
 *         schema:
 *           type: string
 *         description: Find role by role_name
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
 *         description: Sort by (role_name/status)
 *       - name: order[1]
 *         in: query
 *         schema:
 *           type: string
 *         description: Sort ASC/DESC
 *     responses:
 *       200:
 *         description: Get the list of the roles successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get("/", controllers.getAllRoles);

module.exports = router;
