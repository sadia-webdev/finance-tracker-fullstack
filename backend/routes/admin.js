import express from "express";
import { protect } from "../middlewares/protect.js";
import User from "../models/User.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();


/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 69315421c706438a79f4ad39
 *                   name:
 *                     type: string
 *                     example: Sadia Ali
 *                   email:
 *                     type: string
 *                     example: sadia@example.com
 *                   role:
 *                     type: string
 *                     example: user
 *                   profilePicture:
 *                     type: string
 *                     example: https://example.com/profile.jpg
 *                   createdAt:
 *                     type: string
 *                     example: 2025-12-04T17:01:58.925Z
 *                   updatedAt:
 *                     type: string
 *                     example: 2025-12-04T17:01:58.925Z
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       403:
 *         description: Forbidden (not an admin)
 */

// admin route
router.get("/users", protect, authorize('user'), async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

export default router;
