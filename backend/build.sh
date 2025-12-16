#!/usr/bin/env bash
# Build script for Render deployment

set -o errexit  # Exit on error

echo "Starting build process..."

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Collect static files
python Portfolio_Project/manage.py collectstatic --noinput

# Run migrations (only if DATABASE_URL is set, otherwise skip for build)
if [ -n "$DATABASE_URL" ]; then
    echo "Running database migrations..."
    python Portfolio_Project/manage.py migrate --noinput || {
        echo "Warning: Migrations failed. This may be normal if database is not yet connected."
        echo "Migrations will run automatically on first request if database is linked."
    }
else
    echo "No DATABASE_URL set. Skipping migrations (will use SQLite in development)."
fi

echo "Build completed successfully!"
