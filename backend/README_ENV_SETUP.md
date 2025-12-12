# Environment Variables Setup

## Quick Setup

### Option 1: Automated Setup Script

Run the setup script to automatically generate a secure SECRET_KEY and create your `.env` file:

```bash
cd backend
python setup_env.py
```

The script will:
- Generate a secure SECRET_KEY
- Ask for your production settings
- Create a `.env` file with all required variables

### Option 2: Manual Setup

1. **Create `.env` file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Generate SECRET_KEY:**
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

3. **Edit `.env` file** and update:
   - `SECRET_KEY` - Paste the generated key
   - `DEBUG=False` - For production
   - `ALLOWED_HOSTS` - Your domain(s), comma-separated
   - `CORS_ALLOWED_ORIGINS` - Your frontend URL(s), comma-separated
   - `CORS_ALLOW_ALL_ORIGINS=False` - For production security
   - `DATABASE_URL` - Leave empty for SQLite, or PostgreSQL connection string

## Example `.env` for Production

```env
SECRET_KEY=django-insecure-your-generated-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-app.railway.app,your-custom-domain.com
DATABASE_URL=postgresql://user:password@host:5432/dbname
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-custom-domain.com
FRONTEND_URL=https://your-app.vercel.app
```

## Example `.env` for Development

```env
SECRET_KEY=django-insecure-dev-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=
CORS_ALLOW_ALL_ORIGINS=True
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
FRONTEND_URL=http://localhost:3000
```

## Important Notes

⚠️ **NEVER commit `.env` to version control!**

- The `.env` file is already in `.gitignore`
- Only commit `.env.example` as a template
- Each environment (dev, staging, production) should have its own `.env` file

## For Cloud Deployment

When deploying to Railway, Render, or other platforms:

1. **Don't create a `.env` file** - use platform environment variables instead
2. Set all variables in the platform's dashboard
3. The platform will inject them as environment variables
4. Your Django settings will automatically read them

### Railway Example:
- Go to your service → Variables tab
- Add each variable from `.env.example`
- Railway automatically provides `DATABASE_URL` when you add PostgreSQL

### Render Example:
- Go to your service → Environment tab
- Add each variable
- Render provides `DATABASE_URL` automatically

