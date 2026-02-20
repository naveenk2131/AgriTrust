# AgriTrust AI

A blockchain-based agricultural supply chain transparency platform integrated with AI-generated insights. This is a hackathon prototype version (Round 1), with blockchain simulated using database hashing.

## Features

- **Home Page**: Hero section with project name and tagline, along with navigation buttons
- **Add Batch**: Form to register new agricultural batches with blockchain hash generation
- **Track Batch**: Search and view batch details with QR code generation
- **AI Dashboard**: AI-generated insights including demand forecast, risk detection, fraud detection, and recommendations
- **QR Code Generation**: Each batch gets a QR code for easy tracking
- **Copy Batch ID**: One-click copy functionality for batch IDs
- **Export Reports**: Simulated PDF export for AI reports
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router
- Chart.js for analytics
- UUID for unique batch ID
- QRCode React for QR code generation

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- UUID for unique batch ID
- Crypto (for blockchain hash simulation)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```env
MONGODB_URI=mongodb://localhost:27017/agritrust
PORT=5000
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `POST /api/batches` - Create a new batch
- `GET /api/batches/:id` - Get batch details by ID

## Folder Structure

```
AgriTrust/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── .env
├── .gitignore
└── README.md
```

## Error Handling

- Backend: Try-catch blocks in all async operations
- Backend: Centralized error middleware
- Frontend: Error boundaries and toast notifications
- Fallback to mock data if MongoDB unavailable

## Development

The application is built with a modular structure for easy maintenance and scalability. All components are reusable and follow clean coding practices.

## Deployment

The application is ready for deployment. The backend serves the frontend build directly in production.

### Environment Variables

For production deployment, set these environment variables:

- `PORT`: Port number for the server (defaults to 5000)
- `OPENAI_API_KEY`: OpenAI API key for real AI insights (optional, uses fallback if not provided)
- `POLYGON_RPC_URL`: Polygon RPC URL for blockchain integration (optional, uses fallback if not provided)
- `PRIVATE_KEY`: Private key for blockchain transactions (optional)
- `BLOCKCHAIN_CONTRACT_ADDRESS`: Deployed smart contract address (optional)

### Render Deployment

See RENDER_DEPLOYMENT_GUIDE.md for detailed instructions on deploying to Render.

### Build for Production

To build the frontend for production:

```bash
cd client
npm run build
```

Then start the server:

```bash
cd server
npm start
```

The server will serve the built frontend automatically.