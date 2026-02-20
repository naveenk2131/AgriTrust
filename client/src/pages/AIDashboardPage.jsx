import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  generateDemandTrendData 
} from '../utils/aiUtils';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AIDashboardPage = () => {
  const [aiData, setAiData] = useState({
    demandForecast: '',
    riskAnalysis: '',
    fraudDetection: '',
    logisticsRecommendation: '',
    demandTrendData: {}
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Initialize AI data
  useEffect(() => {
    refreshAIInsights();
  }, []);

  const refreshAIInsights = async () => {
    try {
      setLoading(true);
      // Fetch AI insights from backend
      const response = await axios.get('/api/batches/dashboard/ai');
      
      if (response.data.success && response.data.data) {
        setAiData({
          demandForecast: response.data.data.demandForecast,
          riskAnalysis: response.data.data.riskAnalysis,
          fraudDetection: response.data.data.fraudDetection,
          logisticsRecommendation: response.data.data.logisticsRecommendation,
          demandTrendData: generateDemandTrendData()
        });
      } else {
        // Fallback to mock data if API fails
        setAiData({
          demandForecast: 'Unable to fetch real-time data. Please try again later.',
          riskAnalysis: 'Risk data unavailable',
          fraudDetection: 'Verification temporarily unavailable',
          logisticsRecommendation: 'Logistics recommendations unavailable',
          demandTrendData: generateDemandTrendData()
        });
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      // Fallback to mock data on error
      setAiData({
        demandForecast: 'Service temporarily unavailable. Please try again later.',
        riskAnalysis: 'Risk data unavailable',
        fraudDetection: 'Verification temporarily unavailable',
        logisticsRecommendation: 'Logistics recommendations unavailable',
        demandTrendData: generateDemandTrendData()
      });
    } finally {
      setLoading(false);
    }
    setLastUpdated(new Date());
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Demand Trend Prediction (7 Days)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Demand Index'
        }
      }
    }
  };

  // Function to export report as PDF
  const exportPDF = async () => {
    try {
      // Dynamically import jspdf and html2canvas
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      
      // Create a new jsPDF instance
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(22);
      doc.text('AgriTrust AI - Supply Chain Intelligence Report', 20, 20);
      
      // Add date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 35);
      
      // Add AI insights
      doc.setFontSize(16);
      doc.text('AI Insights Summary', 20, 50);
      
      doc.setFontSize(12);
      doc.text(`Demand Forecast: ${aiData.demandForecast}`, 20, 65);
      doc.text(`Risk Assessment: ${aiData.riskProbability}% Spoilage Probability`, 20, 75);
      doc.text(`Fraud Detection: ${aiData.fraudDetection}`, 20, 85);
      doc.text(`Recommendation: ${aiData.recommendation}`, 20, 95);
      
      // Add a note about the chart
      doc.text('Demand Trend Analysis Chart:', 20, 110);
      
      // Save the PDF
      doc.save('agritrust-ai-report.pdf');
      
      // Optionally show success message
      alert('PDF report generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">AI Insights Dashboard</h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={refreshAIInsights}
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Refresh Insights
          </button>
          <button
            onClick={exportPDF}
            className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Export Report (PDF)
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-8">Last updated: {lastUpdated.toLocaleString()}</p>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading AI insights...</span>
        </div>
      )}
      
      {/* AI Insight Cards Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Demand Forecast Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <span className="text-green-600 text-xl">📈</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Demand Forecast</h2>
          </div>
          <p className="text-gray-700">{aiData.demandForecast}</p>
          <div className="mt-4 text-sm text-gray-500 italic">
            AI prediction based on market trends, seasonal patterns, and historical data.
          </div>
        </div>
        
        {/* Risk Analysis Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <span className="text-yellow-600 text-xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Risk Analysis</h2>
          </div>
          <p className="text-gray-700">{aiData.riskAnalysis}</p>
          <div className="mt-4 text-sm text-gray-500 italic">
            Comprehensive risk assessment based on storage conditions, transportation time, and environmental factors.
          </div>
        </div>
        
        {/* Fraud Detection Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <span className="text-red-600 text-xl">🔍</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Fraud Detection</h2>
          </div>
          <div className={`text-lg font-semibold ${
            aiData.fraudDetection.includes("No anomalies") ? "text-green-600" : "text-red-600"
          }`}>
            {aiData.fraudDetection}
          </div>
          <div className="mt-4 text-sm text-gray-500 italic">
            Real-time monitoring of supply chain integrity and verification of product authenticity.
          </div>
        </div>
        
        {/* Logistics Recommendation Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <span className="text-blue-600 text-xl">💡</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Logistics Recommendation</h2>
          </div>
          <p className="text-gray-700">{aiData.logisticsRecommendation}</p>
          <div className="mt-4 text-sm text-gray-500 italic">
            Actionable logistics insights generated from analysis of market conditions and operational data.
          </div>
        </div>
      </div>
      )}
      
      {/* Demand Trend Chart */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Demand Trend Analysis</h2>
        <div className="h-80">
          <Line options={chartOptions} data={aiData.demandTrendData} />
        </div>
        <div className="mt-4 text-sm text-gray-500 italic">
          Predictive analysis showing expected demand fluctuations over the next week.
        </div>
      </div>
      )}
      
      {/* Additional AI Insights */}
      {!loading && (
        <div className="mt-8 bg-gradient-to-r from-green-700 to-blue-800 text-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Supply Chain Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="text-2xl font-bold">98.7%</div>
            <div className="text-sm">Traceability Score</div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="text-2xl font-bold">2.3%</div>
            <div className="text-sm">Quality Degradation</div>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="text-2xl font-bold">12h</div>
            <div className="text-sm">Avg. Transit Time</div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default AIDashboardPage;