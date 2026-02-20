# AgriTrust AI - Render Deployment Guide

## Overview
This guide explains how to deploy the AgriTrust AI application to Render, a cloud hosting platform.

## Prerequisites
- Render account (https://render.com)
- OpenAI API key (optional, for enhanced AI features)
- Polygon RPC URL (optional, for blockchain features)
- Private key for blockchain transactions (optional)

## Deployment Steps

### 1. Fork the Repository
- Fork this repository to your GitHub account

### 2. Create a New Web Service on Render
- Go to https://dashboard.render.com/select-repo
- Connect your GitHub account
- Select your forked repository

### 3. Configure the Web Service
- **Environment**: `Node`
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 4. Set Environment Variables
In the Render dashboard, go to your service settings and add the following environment variables:

#### Required:
- `PORT`: Leave as default (Render sets this automatically)

#### Optional (for enhanced features):
- `OPENAI_API_KEY`: Your OpenAI API key for real AI insights
- `POLYGON_RPC_URL`: Polygon Amoy testnet RPC URL (e.g., `https://rpc-amoy.polygon.technology/`)
- `PRIVATE_KEY`: Your Ethereum-compatible private key for blockchain transactions
- `BLOCKCHAIN_CONTRACT_ADDRESS`: Address of deployed BatchRegistry contract

### 5. Deploy
- Click "Create Web Service"
- Render will automatically build and deploy your application

## Post-Deployment Configuration

### Smart Contract Deployment
If you want to use real blockchain features:

1. Deploy the BatchRegistry.sol contract to Polygon Amoy testnet
2. Update the `BLOCKCHAIN_CONTRACT_ADDRESS` environment variable with the deployed contract address

### API Endpoints
After deployment, your API will be available at:
- `https://[your-service-name.onrender.com]/api/batches`

### Frontend Access
The frontend will be served at:
- `https://[your-service-name.onrender.com]/`

## Troubleshooting

### Common Issues:

1. **Application won't start**: Check that the start command is `npm start`
2. **Build fails**: Ensure all dependencies are properly declared in package.json
3. **API calls fail**: Make sure API calls use relative paths (`/api/...`) in production
4. **Blockchain features not working**: Verify RPC URL, private key, and contract address are correctly set

### Logs
Check the Render dashboard for application logs to troubleshoot any issues.

## Security Notes
- Never commit actual API keys to the repository
- Use Render's secure environment variable system
- The application is configured to use relative API calls in production for security

## Scaling
Render automatically handles scaling based on traffic. Monitor your application performance in the dashboard and adjust instance type if needed.

## Updates
To update your deployed application:
1. Push changes to your connected GitHub repository
2. Render will automatically rebuild and redeploy