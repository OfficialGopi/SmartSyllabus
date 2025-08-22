# SmartSyllabus Setup Guide

This guide will help you set up the environment variables for both the client and server applications.

## 🚀 Quick Setup

### 1. Server Environment Setup

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Create the `.env` file:**

   ```bash
   # Copy the template
   cp env.template .env

   # Or create manually
   touch .env
   ```

3. **Configure your `.env` file with the following content:**

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   DATABASE_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority

   # Client URL
   CLIENT_URL=http://localhost:5173

   # JWT Secrets (Generate strong random strings)
   ACCESS_TOKEN_SECRET=your_access_token_secret_here_replace_with_strong_random_string
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here_replace_with_strong_random_string
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d

   # Google OAuth
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/user/google/callback
   GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret_here

   # Google AI API
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   ```

### 2. Client Environment Setup

1. **Navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Create the `.env` file:**

   ```bash
   # Copy the template
   cp env.template .env

   # Or create manually
   touch .env
   ```

3. **Configure your `.env` file with the following content:**

   ```env
   # Client Environment Variables
   # Copy this file to .env and configure the values

   # Server URL for API calls
   VITE_SERVER_URL=http://localhost:3000/api/v1

   # Note: All Vite environment variables must be prefixed with VITE_
   # This file is for development. For production, set these values in your hosting environment.
   ```

## 🔧 Required Configuration

### Server Environment Variables

| Variable               | Description                   | Example                                             |
| ---------------------- | ----------------------------- | --------------------------------------------------- |
| `PORT`                 | Server port number            | `3000`                                              |
| `NODE_ENV`             | Environment mode              | `development`                                       |
| `DATABASE_URI`         | MongoDB connection string     | `mongodb+srv://user:pass@cluster/db`                |
| `CLIENT_URL`           | Frontend application URL      | `http://localhost:5173`                             |
| `ACCESS_TOKEN_SECRET`  | JWT access token secret       | Generate a strong random string                     |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret      | Generate a strong random string                     |
| `ACCESS_TOKEN_EXPIRY`  | Access token expiration time  | `15m`                                               |
| `REFRESH_TOKEN_EXPIRY` | Refresh token expiration time | `7d`                                                |
| `GOOGLE_CALLBACK_URL`  | Google OAuth callback URL     | `http://localhost:3000/api/v1/user/google/callback` |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID        | From Google Cloud Console                           |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret    | From Google Cloud Console                           |
| `GOOGLE_AI_API_KEY`    | Google AI API key             | From Google AI Studio                               |

### Client Environment Variables

| Variable          | Description          | Example                        |
| ----------------- | -------------------- | ------------------------------ |
| `VITE_SERVER_URL` | Backend API base URL | `http://localhost:3000/api/v1` |

## 🔑 How to Get Required Credentials

### 1. MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your values

### 2. Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URIs to: `http://localhost:3000/api/v1/user/google/callback`
6. Copy the Client ID and Client Secret

### 3. Google AI API

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Get your API key
3. The system uses OpenAI SDK compatible endpoints

### 4. JWT Secrets

Generate strong random strings for JWT secrets:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use an online generator
# https://generate-secret.vercel.app/64
```

## 🚀 Starting the Application

### Option 1: Use the Batch File (Windows)

```bash
# Simply double-click the start.bat file
start.bat
```

### Option 2: Manual Start

```bash
# Terminal 1: Start Backend
cd server
npm run dev

# Terminal 2: Start Frontend
cd client
npm run dev
```

## 🌍 Production Configuration

For production deployment, update the environment variables:

### Server Production

```env
NODE_ENV=production
CLIENT_URL=https://yourdomain.com
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/v1/user/google/callback
```

### Client Production

```env
VITE_SERVER_URL=https://yourdomain.com/api/v1
```

## 🔍 Troubleshooting

### Common Issues

1. **"Cannot connect to database"**

   - Check your MongoDB connection string
   - Ensure your IP is whitelisted in MongoDB Atlas

2. **"Google OAuth error"**

   - Verify OAuth credentials
   - Check callback URL matches exactly

3. **"AI API error"**

   - Verify Google AI API key
   - Check rate limiting (10 requests per 15 minutes)

4. **"Frontend can't connect to backend"**
   - Verify `VITE_SERVER_URL` in client `.env`
   - Ensure backend is running on the correct port

### Environment File Locations

- **Server**: `server/.env`
- **Client**: `client/.env`

### Validation

The server will validate all required environment variables on startup. If any are missing, you'll see an error message indicating which variables need to be set.

## 📝 Notes

- Never commit `.env` files to version control
- Keep your API keys and secrets secure
- Use different credentials for development and production
- The client automatically falls back to `http://localhost:3000/api/v1` if `VITE_SERVER_URL` is not set
