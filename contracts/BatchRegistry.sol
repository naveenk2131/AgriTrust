// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BatchRegistry {
    mapping(string => string) private batchHashes;
    mapping(string => bool) private batchExists;
    
    event BatchStored(string indexed batchId, string hash, uint256 timestamp);
    
    function storeBatch(string calldata batchId, string calldata hash) external {
        require(bytes(batchId).length > 0, "Batch ID cannot be empty");
        require(bytes(hash).length > 0, "Hash cannot be empty");
        
        batchHashes[batchId] = hash;
        batchExists[batchId] = true;
        
        emit BatchStored(batchId, hash, block.timestamp);
    }
    
    function getBatchHash(string calldata batchId) external view returns (string memory) {
        require(batchExists[batchId], "Batch does not exist");
        return batchHashes[batchId];
    }
    
    function verifyBatch(string calldata batchId, string calldata expectedHash) external view returns (bool) {
        return keccak256(bytes(batchHashes[batchId])) == keccak256(bytes(expectedHash));
    }
}