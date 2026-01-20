import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllMyTransactions,
  updateTransaction,
  getMonthlySummary,
} from "../controllers/transactionsController.js";
import { validate } from "../middlewares/validate.js";
import { createTransactionSchema } from "../validation/transactionSchema.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();


/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Groceries
 *               amount:
 *                 type: number
 *                 example: 45
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 example: 2025-01-04
 *     responses:
 *       201:
 *         description: Transaction created
 */


// create new transaction route
router.post("/", protect, validate(createTransactionSchema), createTransaction);


/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions created by the logged-in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all user's transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6931be4606241cb07780f18f
 *                   title:
 *                     type: string
 *                     example: Groceries
 *                   amount:
 *                     type: number
 *                     example: 45
 *                   type:
 *                     type: string
 *                     example: expense
 *                   category:
 *                     type: string
 *                     example: Food
 *                   date:
 *                     type: string
 *                     example: 2025-01-04T00:00:00.000Z
 *                   createdBy:
 *                     type: string
 *                     example: 69315421c706438a79f4ad39
 *                   createdAt:
 *                     type: string
 *                     example: 2025-12-04T17:00:54.396Z
 *                   updatedAt:
 *                     type: string
 *                     example: 2025-12-04T17:00:54.396Z
 *       401:
 *         description: Unauthorized (no or invalid token)
 */

// get all my transactions route
router.get("/", protect, getAllMyTransactions);


/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated groceries
 *               amount:
 *                 type: number
 *                 example: 50
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 example: 2025-01-05
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 */

// update transaction route
router.put("/:id", protect,  updateTransaction);


/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */

// delete transaction route
router.delete("/:id", protect,  deleteTransaction);


/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Get monthly income, expense, balance and transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *         description: Month number (1-12)
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         example: 2025
 *         description: Full year (e.g., 2025)
 *     responses:
 *       200:
 *         description: Monthly summary data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 income:
 *                   type: number
 *                   example: 2000
 *                 expense:
 *                   type: number
 *                   example: 500
 *                 balance:
 *                   type: number
 *                   example: 1500
 *                 transactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 */

router.get("/monthly-summary", protect, getMonthlySummary);

export default router;
