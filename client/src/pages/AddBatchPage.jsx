import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { batchService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import QRCodeGenerator from '../components/QRCodeGenerator';

const AddBatchPage = ({ showToast }) => {
  const [formData, setFormData] = useState({
    farmerName: '',
    cropName: '',
    quantity: '',
    location: '',
    harvestDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [createdBatch, setCreatedBatch] = useState(null);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.farmerName || !formData.cropName || !formData.quantity || !formData.location || !formData.harvestDate) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    setCreatedBatch(null);

    try {
      const response = await batchService.createBatch(formData);
      
      if (response.success) {
        setCreatedBatch(response.data);
        setFormData({
          farmerName: '',
          cropName: '',
          quantity: '',
          location: '',
          harvestDate: ''
        });
        showToast('Batch created successfully!', 'success');
      } else {
        showToast(response.message || 'Error creating batch', 'error');
      }
    } catch (error) {
      console.error('Error creating batch:', error);
      showToast(error.message || 'Error creating batch', 'error');
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
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Batch</h1>
      
      {loading && <LoadingSpinner />}
      
      {!loading && !createdBatch && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="farmerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Farmer Name *
                </label>
                <input
                  type="text"
                  id="farmerName"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter farmer name"
                />
              </div>
              
              <div>
                <label htmlFor="cropName" className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Name *
                </label>
                <input
                  type="text"
                  id="cropName"
                  name="cropName"
                  value={formData.cropName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter crop name"
                />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (kg) *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter location"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Harvest Date *
                </label>
                <input
                  type="date"
                  id="harvestDate"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-8 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 btn-hover shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Batch'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {createdBatch && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Batch Created Successfully!</h2>
            <p className="text-gray-600">Your batch has been registered on the blockchain</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500">Batch ID</p>
                <div className="flex items-center">
                  <code className="font-mono text-green-700 font-semibold text-lg mr-2">{createdBatch.batchId}</code>
                  <button
                    onClick={() => copyToClipboard(createdBatch.batchId)}
                    className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500 mb-2">QR Code</p>
                <QRCodeGenerator value={createdBatch.batchId} size={100} />
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Blockchain Hash</p>
                <p className="font-mono text-xs text-gray-800 break-all">{createdBatch.blockchainHash}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium text-gray-800">
                  {new Date(createdBatch.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCreatedBatch(null)}
              className="bg-gray-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Add Another Batch
            </button>
            <button
              onClick={() => navigate('/track-batch')}
              className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Track Batch
            </button>
            <button
              onClick={() => navigate('/ai-dashboard')}
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              View AI Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBatchPage;