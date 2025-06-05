#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Deploy to Firebase hosting
echo "Deploying to Firebase hosting..."
npx firebase deploy --only hosting

echo "Deployment complete!"