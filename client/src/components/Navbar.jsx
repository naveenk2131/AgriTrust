import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-700 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl font-bold flex items-center">
            <span className="mr-2">🌾</span>
            AgriTrust AI
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-300 transition duration-300 btn-hover">
              Home
            </Link>
            <Link to="/add-batch" className="hover:text-green-300 transition duration-300 btn-hover">
              Add Batch
            </Link>
            <Link to="/track-batch" className="hover:text-green-300 transition duration-300 btn-hover">
              Track Batch
            </Link>
            <Link to="/ai-dashboard" className="hover:text-green-300 transition duration-300 btn-hover">
              AI Dashboard
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;