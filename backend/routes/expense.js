const express = require('express');
const router = express.Router();
const Expense = require('/models/Expense');

// Add expense
router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const saved = await newExpense.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all expenses
router.get('/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.params.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;