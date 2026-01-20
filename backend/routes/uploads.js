import express from "express";
import { protect } from "../middlewares/protect.js";
import { uploadFile } from "../controllers/uploadController.js";
import {upload} from '../middlewares/upload.js'


const router = express.Router();


/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload a profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Upload successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: https://res.cloudinary.com/.../image.jpg
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */


// uploads route
router.post('/profile-picture', protect, upload.single("file"), uploadFile)




export default router;
