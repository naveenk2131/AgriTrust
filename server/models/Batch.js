const fs = require('fs');
const path = require('path');

// File-based storage for batches
const dataFilePath = path.join(__dirname, '../data/batches.json');

// Ensure data directory exists
const dataDir = path.dirname(dataFilePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper functions for file operations
const readData = () => {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Define Batch class for file-based operations
class Batch {
  constructor(data) {
    this.farmerName = data.farmerName;
    this.cropName = data.cropName;
    this.quantity = data.quantity;
    this.location = data.location;
    this.harvestDate = new Date(data.harvestDate);
    this.batchId = data.batchId;
    this.blockchainHash = data.blockchainHash;
    this.transactionHash = data.transactionHash || null; // New field for blockchain transaction
    this.transportStatus = data.transportStatus || 'In Transit';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Static methods for file-based operations
  static async create(data) {
    const batch = new Batch(data);
    const batches = readData();
    batches.push(batch);
    writeData(batches);
    return batch;
  }

  static async findOne(query) {
    const batches = readData();
    if (query.batchId) {
      const batch = batches.find(b => b.batchId === query.batchId);
      return batch || null;
    }
    return null;
  }

  static async find(query = {}) {
    const batches = readData();
    if (Object.keys(query).length === 0) {
      return batches;
    }
    // Basic filtering implementation
    return batches.filter(batch => {
      for (const [key, value] of Object.entries(query)) {
        if (batch[key] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  // Method to save updates
  async save() {
    const batches = readData();
    const index = batches.findIndex(b => b.batchId === this.batchId);
    if (index !== -1) {
      this.updatedAt = new Date();
      batches[index] = this;
      writeData(batches);
    }
    return this;
  }
}

module.exports = Batch;