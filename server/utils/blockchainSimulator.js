const crypto = require('crypto');

/**
 * Generates a SHA256 hash simulating blockchain functionality
 * @param {string} data - Data to be hashed
 * @returns {Promise<string>} - The generated hash
 */
const generateBlockchainHash = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('sha256');
      hash.update(data);
      const hashedData = hash.digest('hex');
      resolve(hashedData);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateBlockchainHash
};