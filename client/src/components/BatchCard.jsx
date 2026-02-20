import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const BatchCard = ({ batch }) => {
  if (!batch) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-gray-800">Batch Details</h3>
          <p className="text-gray-600">Blockchain-verified agricultural product</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Batch ID</p>
            <p className="font-mono text-green-700 font-semibold">{batch.batchId}</p>
          </div>
          <QRCodeGenerator value={batch.batchId} size={64} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2">Blockchain Hash</p>
        <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm overflow-x-auto">
          {batch.blockchainHash}
        </div>
      </div>
    </div>
  );
};

export default BatchCard;