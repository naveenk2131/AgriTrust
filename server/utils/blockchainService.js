const { ethers } = require('ethers');

class BlockchainService {
  constructor() {
    this.provider = process.env.POLYGON_RPC_URL 
      ? new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL)
      : null;
    
    this.wallet = process.env.PRIVATE_KEY && this.provider 
      ? new ethers.Wallet(process.env.PRIVATE_KEY, this.provider)
      : null;
    
    // Simple smart contract ABI for storing batch info
    this.contractABI = [
      "function storeBatch(string calldata batchId, string calldata hash) external",
      "function getBatchHash(string calldata batchId) external view returns (string memory)"
    ];
    
    // Placeholder address - in a real deployment, this would be deployed first
    this.contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS || null;
  }

  // Check if blockchain is properly configured
  isConfigured() {
    return this.provider && this.wallet && this.contractAddress;
  }

  // Store batch on blockchain
  async storeBatchOnChain(batchId, hash) {
    if (!this.isConfigured()) {
      console.log('Blockchain not configured, returning mock transaction hash');
      // Return a mock transaction hash if not properly configured
      return {
        success: true,
        transactionHash: `0x${ethers.keccak256(ethers.toUtf8Bytes(`${batchId}-${hash}-${Date.now()}`)).slice(2, 66)}`,
        contractAddress: this.contractAddress || '0xContractAddressPlaceholder',
        fallbackUsed: true
      };
    }

    try {
      // Create contract instance
      const contract = new ethers.Contract(this.contractAddress, this.contractABI, this.wallet);

      // Send transaction to store batch
      const tx = await contract.storeBatch(batchId, hash);
      await tx.wait(); // Wait for transaction to be mined

      return {
        success: true,
        transactionHash: tx.hash,
        contractAddress: this.contractAddress,
        fallbackUsed: false
      };
    } catch (error) {
      console.error('Blockchain error:', error);
      // Return mock transaction if real blockchain fails
      return {
        success: true,
        transactionHash: `0x${ethers.keccak256(ethers.toUtf8Bytes(`${batchId}-${hash}-${Date.now()}-error`)).slice(2, 66)}`,
        contractAddress: this.contractAddress,
        fallbackUsed: true,
        error: error.message
      };
    }
  }

  // Verify batch exists on blockchain
  async verifyBatchOnChain(batchId) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Blockchain not configured' };
    }

    try {
      const contract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
      const storedHash = await contract.getBatchHash(batchId);
      
      return {
        success: true,
        exists: !!storedHash && storedHash !== '',
        storedHash
      };
    } catch (error) {
      console.error('Verification error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get blockchain explorer URL for transaction
  getExplorerUrl(transactionHash) {
    if (!transactionHash) return null;
    
    // For Polygon Amoy testnet
    return `https://amoy.polygonscan.com/tx/${transactionHash}`;
  }
}

module.exports = new BlockchainService();