#!/bin/bash

# Log in to Firebase (interactive)
echo "Logging in to Firebase..."
npx firebase login

# Initialize Firebase project
echo "Initializing Firebase project..."
npx firebase init hosting

echo "Firebase initialization complete!"