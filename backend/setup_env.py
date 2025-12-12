#!/usr/bin/env python
"""
Helper script to set up .env file for production deployment.
This script generates a secure SECRET_KEY and creates a .env file.
"""
import os
from pathlib import Path
from django.core.management.utils import get_random_secret_key

def main():
    # Get the backend directory
    backend_dir = Path(__file__).parent
    env_file = backend_dir / '.env'
    env_example = backend_dir / '.env.example'
    
    # Check if .env already exists
    if env_file.exists():
        response = input('.env file already exists. Overwrite? (y/N): ')
        if response.lower() != 'y':
            print('Cancelled.')
            return
    
    # Check if .env.example exists
    if not env_example.exists():
        print('Error: .env.example not found!')
        return
    
    # Read .env.example
    with open(env_example, 'r') as f:
        content = f.read()
    
    # Generate new SECRET_KEY
    new_secret_key = get_random_secret_key()
    print(f'Generated new SECRET_KEY: {new_secret_key[:20]}...')
    
    # Replace placeholder SECRET_KEY
    content = content.replace('your-secret-key-here-change-in-production', new_secret_key)
    
    # Ask for production settings
    print('\n=== Production Settings ===')
    debug = input('DEBUG mode? (False for production) [False]: ').strip() or 'False'
    content = content.replace('DEBUG=True', f'DEBUG={debug}')
    
    print('\nEnter your domain(s) for ALLOWED_HOSTS (comma-separated):')
    print('Example: your-app.railway.app,your-custom-domain.com')
    allowed_hosts = input('ALLOWED_HOSTS: ').strip()
    if allowed_hosts:
        content = content.replace('ALLOWED_HOSTS=localhost,127.0.0.1', f'ALLOWED_HOSTS={allowed_hosts}')
    
    print('\nEnter frontend URL(s) for CORS (comma-separated):')
    print('Example: https://your-app.vercel.app,https://your-custom-domain.com')
    cors_origins = input('CORS_ALLOWED_ORIGINS: ').strip()
    if cors_origins:
        content = content.replace('CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173', 
                                 f'CORS_ALLOWED_ORIGINS={cors_origins}')
        # Also update CORS_ALLOW_ALL_ORIGINS
        content = content.replace('CORS_ALLOW_ALL_ORIGINS=True', 'CORS_ALLOW_ALL_ORIGINS=False')
    
    # Write .env file
    with open(env_file, 'w') as f:
        f.write(content)
    
    print(f'\n✅ .env file created at: {env_file}')
    print('\n⚠️  IMPORTANT:')
    print('   - Never commit .env to version control!')
    print('   - Keep your SECRET_KEY secure!')
    print('   - Update DATABASE_URL if using PostgreSQL')

if __name__ == '__main__':
    # Set Django settings module (minimal)
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Portfolio_Project.settings')
    
    # Import Django (this will work if Django is installed)
    try:
        import django
        django.setup()
        main()
    except ImportError:
        print('Error: Django not found. Please install dependencies first.')
        print('Run: pip install -r requirements.txt')
    except Exception as e:
        print(f'Error: {e}')
        print('\nYou can also manually copy .env.example to .env and update values.')

