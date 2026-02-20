const express = require('express');
const { createBatch, getBatchById, getAIDashboard } = require('../controllers/batchController');

const router = express.Router();

// @route   GET /api/batches/dashboard/ai
// @desc    Get AI dashboard insights
// @access  Public
router.get('/dashboard/ai', getAIDashboard);

// @route   POST /api/batches
// @desc    Create a new batch
// @access  Public
router.post('/', createBatch);

// @route   GET /api/batches/:id
// @desc    Get batch by ID
// @access  Public
router.get('/:id', getBatchById);

module.exports = router;