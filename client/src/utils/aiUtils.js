// AI Simulation Functions for AgriTrust AI

// Generate mock demand forecast
export const generateDemandForecast = () => {
  const trends = [
    "Market demand for organic produce continues to rise with 15% growth expected in the next quarter",
    "Seasonal demand peaks for wheat crops anticipated in the coming month due to export orders",
    "Consumer preference shifting toward locally-sourced vegetables, showing 22% demand increase",
    "Weather patterns indicate early harvest may boost supply, creating potential oversupply situation",
    "Export markets showing strong interest in premium rice varieties, indicating 18% price appreciation potential"
  ];
  
  const randomIndex = Math.floor(Math.random() * trends.length);
  return trends[randomIndex];
};

// Generate mock risk probability
export const generateRiskProbability = () => {
  // Generate a random percentage between 1-15%
  return Math.floor(Math.random() * 15) + 1;
};

// Generate mock fraud detection status
export const generateFraudDetection = () => {
  const alerts = [
    "No anomalies detected",
    "No anomalies detected",
    "No anomalies detected",
    "No anomalies detected",
    "No anomalies detected",
    "Minor discrepancy detected in shipping logs",
    "Potential irregularity in quality certification",
    "Alert: Unexpected temperature fluctuation in transit detected"
  ];
  
  const randomIndex = Math.floor(Math.random() * alerts.length);
  return alerts[randomIndex];
};

// Generate mock recommendations
export const generateRecommendation = () => {
  const recommendations = [
    "Optimize transportation routes to reduce delivery time by 12% and maintain freshness. Consider partnering with local distributors to improve last-mile efficiency.",
    "Implement IoT sensors in storage facilities to monitor temperature and humidity, reducing spoilage risk by up to 25%.",
    "Consider diversifying crop portfolio based on market predictions showing increased demand for legumes and specialty grains.",
    "Schedule preventive maintenance for harvesting equipment to avoid delays during peak season and ensure optimal yield quality.",
    "Establish direct partnerships with retailers to reduce middleman costs and increase profit margins by approximately 8%.",
    "Invest in sustainable farming practices to meet growing consumer demand for environmentally conscious products and access premium markets."
  ];
  
  const randomIndex = Math.floor(Math.random() * recommendations.length);
  return recommendations[randomIndex];
};

// Generate mock demand trend data for chart
export const generateDemandTrendData = () => {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [];
  
  // Generate random data points with some trend
  let baseValue = 50 + Math.random() * 20; // Random starting point
  
  for (let i = 0; i < 7; i++) {
    // Add some variation to create a realistic trend
    const variation = (Math.random() - 0.5) * 20;
    baseValue += variation;
    
    // Ensure values stay within reasonable bounds
    if (baseValue < 30) baseValue = 30 + Math.random() * 10;
    if (baseValue > 80) baseValue = 80 - Math.random() * 10;
    
    data.push(Math.round(baseValue));
  }
  
  return {
    labels,
    datasets: [
      {
        label: 'Demand Trend (7 Days)',
        data,
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
};