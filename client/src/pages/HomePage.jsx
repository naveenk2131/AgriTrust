import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              AgriTrust AI
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-green-100 max-w-2xl mx-auto">
              Self-Healing AI-Powered Agricultural Supply Chain
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/add-batch" 
                className="bg-white text-green-800 hover:bg-green-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 btn-hover shadow-lg"
              >
                Add Batch
              </Link>
              <Link 
                to="/track-batch" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 font-bold py-3 px-8 rounded-full text-lg transition duration-300 btn-hover"
              >
                Track Batch
              </Link>
              <Link 
                to="/ai-dashboard" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 font-bold py-3 px-8 rounded-full text-lg transition duration-300 btn-hover"
              >
                AI Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-green-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Blockchain Verification</h3>
              <p className="text-gray-600">
                Immutable records of agricultural product journey from farm to consumer with SHA256 hashing.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-green-600 text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Predictive analytics for demand forecasting, risk assessment, and fraud detection.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-green-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Real-Time Tracking</h3>
              <p className="text-gray-600">
                Complete visibility into the agricultural supply chain with QR code scanning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold text-gray-800">Register Batch</h3>
                <p className="text-gray-600 mt-2">Farmers input crop details and harvest information</p>
              </div>
              
              <div className="hidden md:block text-green-600 text-4xl">→</div>
              
              <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold text-gray-800">Verify & Track</h3>
                <p className="text-gray-600 mt-2">Blockchain hash ensures authenticity and enables tracking</p>
              </div>
              
              <div className="hidden md:block text-green-600 text-4xl">→</div>
              
              <div className="md:w-1/3 text-center">
                <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold text-gray-800">AI Analysis</h3>
                <p className="text-gray-600 mt-2">Advanced algorithms provide insights and recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;