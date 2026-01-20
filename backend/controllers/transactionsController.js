import Transaction from "../models/Transaction.js";

// create transaction
export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(200).json({
      message: "Transaction created successfuly",
      success: true,
      count: transaction.length,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// get my all transactions
export const getAllMyTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      createdBy: req.user._id,
    });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

// update Transaction
export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

// delete Transaction
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "transaction not found" });
    }

    res.status(200).json('transaction deleted successfuly');
  } catch (error) {
    next(error);
  }
};



export const getMonthlySummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // 1. Get current date
    const now = new Date();

    // 2. Find the first day of this month (e.g., 2025-12-01)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 3. Find the last day of this month (e.g., 2025-12-31)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // 4. Fetch transactions created this month
    const transactions = await Transaction.find({
      createdBy: userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // 5. Calculate totals
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else if (t.type === "expense") expense += t.amount;
    });

    const balance = income - expense;

    res.status(200).json({
      income,
      expense,
      balance,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

