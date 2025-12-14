#!/usr/bin/env bash
# Build script for Render deployment

set -o errexit  # Exit on error

echo "Starting build process..."

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Collect static files
python Portfolio_Project/manage.py collectstatic --noinput

# Run migrations
python Portfolio_Project/manage.py migrate --noinput

echo "Build completed successfully!"
