import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddBatchPage from './pages/AddBatchPage';
import TrackBatchPage from './pages/TrackBatchPage';
import AIDashboardPage from './pages/AIDashboardPage';
import ToastNotification from './components/ToastNotification';

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-batch" element={<AddBatchPage showToast={showToast} />} />
            <Route path="/track-batch" element={<TrackBatchPage showToast={showToast} />} />
            <Route path="/ai-dashboard" element={<AIDashboardPage />} />
          </Routes>
        </main>
        
        <Footer />
        
        {toast && (
          <ToastNotification 
            message={toast.message} 
            type={toast.type} 
            onClose={hideToast} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;