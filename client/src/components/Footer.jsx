import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">🌾</span>
              AgriTrust AI
            </h3>
            <p className="text-gray-300">
              Blockchain-based agricultural supply chain transparency platform with AI-generated insights.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="/add-batch" className="text-gray-300 hover:text-white transition">Add Batch</a></li>
              <li><a href="/track-batch" className="text-gray-300 hover:text-white transition">Track Batch</a></li>
              <li><a href="/ai-dashboard" className="text-gray-300 hover:text-white transition">AI Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">
              Building transparent and trustworthy agricultural supply chains with cutting-edge technology.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AgriTrust AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;