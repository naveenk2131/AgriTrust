const Batch = require('../models/Batch');
const aiSimulation = require('../utils/aiSimulation');
const blockchainService = require('../utils/blockchainService');
const { generateBlockchainHash } = require('../utils/blockchainSimulator');
const { v4: uuidv4 } = require('uuid');

// Create a new batch
const createBatch = async (req, res, next) => {
  try {
    const { farmerName, cropName, quantity, location, harvestDate } = req.body;

    // Validate required fields
    if (!farmerName || !cropName || !quantity || !location || !harvestDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Generate unique batch ID
    const batchId = uuidv4();

    // Generate blockchain-like hash
    const dataToHash = `${farmerName}${cropName}${quantity}${location}${harvestDate}${batchId}`;
    const blockchainHash = await generateBlockchainHash(dataToHash);

    // Create initial batch object
    let batchData = {
      farmerName,
      cropName,
      quantity,
      location,
      harvestDate: new Date(harvestDate),
      batchId,
      blockchainHash
    };

    // Store on blockchain (async, don't wait for response)
    const blockchainResult = await blockchainService.storeBatchOnChain(batchId, blockchainHash);
    batchData.transactionHash = blockchainResult.transactionHash;

    // Create new batch
    const batch = new Batch(batchData);

    // Save to file storage
    const savedBatch = await batch.save();

    res.status(201).json({
      success: true,
      message: 'Batch created successfully',
      data: savedBatch
    });
  } catch (error) {
    next(error);
  }
};

// Get batch by ID
const getBatchById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find batch by batchId
    const batch = await Batch.findOne({ batchId: id });

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    res.status(200).json({
      success: true,
      data: batch
    });
  } catch (error) {
    next(error);
  }
};

// Generate AI dashboard insights
const getAIDashboard = async (req, res, next) => {
  try {
    // You can pass batch data or use general agricultural data
    const batchData = {
      farmerName: 'Agricultural Analysis',
      cropName: 'General Produce',
      quantity: 1000,
      location: 'Global Market',
      harvestDate: new Date().toISOString()
    };

    // Generate AI report using simulation
    const aiReport = aiSimulation.generateAIReport(batchData);

    res.status(200).json({
      success: true,
      data: aiReport
    });
  } catch (error) {
    // Never crash the server - return safe fallback
    console.error('AI Dashboard error:', error.message);
      
    const fallbackData = {
      demandForecast: 'Market demand analysis temporarily unavailable. Please try again later.',
      riskAnalysis: 'Risk assessment data unavailable at this time.',
      fraudDetection: 'Supply chain verification temporarily unavailable.',
      logisticsRecommendation: 'Logistics recommendations currently unavailable.'
    };

    res.status(200).json({
      success: true,
      data: fallbackData,
      message: 'Using fallback data due to service temporary unavailability'
    });
  }
};

module.exports = {
  createBatch,
  getBatchById,
  getAIDashboard
};