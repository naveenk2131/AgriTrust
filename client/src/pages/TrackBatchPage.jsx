import React, { useState } from 'react';
import { batchService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

import QRCodeGenerator from '../components/QRCodeGenerator';

const TrackBatchPage = ({ showToast }) => {
  const [batchId, setBatchId] = useState('');
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!batchId.trim()) {
      showToast('Please enter a batch ID', 'error');
      return;
    }
    
    setLoading(true);
    setBatch(null);
    setNotFound(false);
    
    try {
      const response = await batchService.getBatchById(batchId.trim());
      
      if (response.success && response.data) {
        setBatch(response.data);
      } else {
        setNotFound(true);
        showToast('Batch not found', 'error');
      }
    } catch (error) {
      console.error('Error fetching batch:', error);
      setNotFound(true);
      showToast(error.message || 'Error fetching batch', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Track Batch</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            placeholder="Enter Batch ID"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 btn-hover shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Track Batch'}
          </button>
        </form>
      </div>
      
      {loading && <LoadingSpinner />}
      
      {notFound && !loading && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Batch Not Found</h2>
          <p className="text-gray-600 mb-6">The batch ID you entered does not exist in our system.</p>
          <button
            onClick={() => {
              setNotFound(false);
              setBatchId('');
            }}
            className="bg-gray-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Try Again
          </button>
        </div>
      )}
      
      {batch && !loading && (
        <div className="fade-in">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Batch Information</h2>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Batch ID</p>
                  <div className="flex items-center">
                    <code className="font-mono text-green-700 font-semibold">{batch.batchId}</code>
                    <button
                      onClick={() => copyToClipboard(batch.batchId)}
                      className="ml-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <QRCodeGenerator value={batch.batchId} size={64} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Farmer</p>
                <p className="font-medium text-gray-800">{batch.farmerName}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Crop</p>
                <p className="font-medium text-gray-800">{batch.cropName}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium text-gray-800">{batch.quantity} kg</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-800">{batch.location}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Harvest Date</p>
                <p className="font-medium text-gray-800">
                  {new Date(batch.harvestDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Transport Status</p>
                <p className={`font-medium ${
                  batch.transportStatus === 'Delivered' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {batch.transportStatus}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Blockchain Hash</p>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                  {batch.blockchainHash}
                </div>
              </div>
              {batch.transactionHash && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Transaction Hash</p>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm overflow-x-auto flex items-center">
                    <span className="truncate mr-2">{batch.transactionHash}</span>
                    <a 
                      href={`https://amoy.polygonscan.com/tx/${batch.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm underline ml-2"
                    >
                      View on Explorer
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setBatch(null);
                  setBatchId('');
                }}
                className="bg-gray-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                New Search
              </button>
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Print Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackBatchPage;