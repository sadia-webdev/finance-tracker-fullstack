import express from "express";
import { login, register } from "../controllers/authcontroller.js";
import { validate } from "../middlewares/validate.js";
import { registerUserSchema } from "../validation/userSchema.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sadia
 *               email:
 *                 type: string
 *                 example: sadia@example.com
 *               password:
 *                 type: string
 *                 example: Sadi2020@
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

// register route
router.post("/register/", validate(registerUserSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
// login route
router.post("/login/", login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile
 *       401:
 *         description: Unauthorized
 */

// Protected routes
router.get("/me", protect, async (req, res) => {
  console.log("req.user", req.user);
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  res.json(req.user);
});

export default router;
