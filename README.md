# SmartSyllabus - AI-Powered Study Assistant

A comprehensive study assistant where students upload syllabus and exam details. The AI generates personalized study roadmaps with daily goals, curated resources, and tracks progress. Uses RAG (Retrieval-Augmented Generation) on syllabus chunks stored with embeddings.

## 🚀 Features

- **AI-Powered Study Planning**: Generate personalized study roadmaps using Google's AI
- **Syllabus Management**: Upload and manage syllabus content (text or PDF)
- **Progress Tracking**: Track daily study progress with visual indicators
- **Credit System**: Manage AI usage with a credit-based system
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **State Management**: Robust state management with Zustand
- **Real-time Updates**: Live updates for all study activities

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Axios** for API communication
- **React Router** for navigation
- **Lucide React** for icons

### Backend

- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **Google AI API** (OpenAI SDK compatible)
- **Passport.js** for Google OAuth authentication
- **Rate Limiting** for AI endpoints
- **JWT** for secure authentication

## 📁 Project Structure

```
smartsyllabus/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── app/           # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── store/         # Zustand state management
│   │   ├── services/      # API services
│   │   └── router/        # Routing configuration
│   └── package.json
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── app/
│   │   │   ├── controllers/  # Route handlers
│   │   │   ├── services/     # Business logic
│   │   │   ├── models/       # Database models
│   │   │   ├── routes/       # API routes
│   │   │   └── libs/         # External integrations
│   │   └── env.ts
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB database
- Google AI API key
- Google OAuth credentials

### 1. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp env.template .env
```

**📋 Important**: See [SETUP.md](./SETUP.md) for detailed environment configuration instructions.

Configure your `.env` file:

```env
PORT=3000
NODE_ENV=development
DATABASE_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/user/google/callback
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

Start the backend:

```bash
# Development mode
npm run dev

# Production build
npm run build && npm start
```

### 2. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file
cp env.template .env
```

Configure your `.env` file:

```env
VITE_SERVER_URL=http://localhost:3000/api/v1
```

Start the frontend:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔐 Authentication

SmartSyllabus uses Google OAuth for authentication:

1. Users click "Login with Google"
2. Redirected to Google OAuth
3. After successful authentication, redirected back to dashboard
4. JWT tokens are stored securely in cookies

## 💰 Credit System

- New users start with **10 credits**
- Each roadmap generation costs **1 credit**
- Credits can be purchased through the transaction system
- Rate limiting prevents abuse of AI endpoints

## 🤖 AI Integration

### Google AI Setup

1. Get your API key from [Google AI Studio](https://aistudio.google.com/)
2. Configure the `GOOGLE_AI_API_KEY` in your environment
3. The system uses OpenAI SDK compatible endpoints

### Rate Limiting

- AI endpoints are rate-limited to **10 requests per 15 minutes**
- Prevents abuse and ensures fair usage
- Configurable in `server/src/app/index.ts`

## 📊 API Endpoints

### Authentication

- `POST /api/v1/user/google` - Start Google OAuth
- `GET /api/v1/user/google/callback` - OAuth callback
- `GET /api/v1/user/me` - Get current user info
- `DELETE /api/v1/user/logout` - Logout user

### Chats

- `POST /api/v1/chat` - Create new chat
- `GET /api/v1/chat` - List user's chats
- `POST /api/v1/chat/:chatId/messages` - Add message to chat

### Roadmaps

- `POST /api/v1/roadmap/:chatId` - Generate roadmap (costs 1 credit)
- `GET /api/v1/roadmap` - List user's roadmaps
- `GET /api/v1/roadmap/:roadmapId` - Get specific roadmap

### Progress

- `POST /api/v1/progress/:roadmapId/:day` - Mark day as complete
- `GET /api/v1/progress` - List all progress entries
- `GET /api/v1/progress/:roadmapId` - Get progress for specific roadmap

### Transactions

- `POST /api/v1/transaction` - Add credits after payment
- `GET /api/v1/transaction` - List user's transactions

## 🎯 Usage Flow

1. **Login**: User authenticates with Google
2. **Create Chat**: Upload syllabus (text or PDF)
3. **Generate Roadmap**: AI creates personalized study plan
4. **Track Progress**: Mark daily goals as complete
5. **Monitor Credits**: Manage AI usage and purchase more if needed

## 🔧 Development

### Frontend Development

```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development

```bash
cd server
npm run dev          # Start with nodemon and TypeScript watch
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
```

### Database Models

The system includes several key models:

- **User**: Authentication and credit management
- **Chat**: Syllabus and conversation management
- **Roadmap**: AI-generated study plans
- **Progress**: Daily study progress tracking
- **Transaction**: Credit purchase history

## 🚀 Deployment

### Frontend Deployment

```bash
cd client
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment

```bash
cd server
npm run build
# Deploy the dist/ folder to your hosting service
```

### Environment Variables

Ensure all environment variables are properly configured in production, especially:

- Database connection strings
- JWT secrets
- Google OAuth credentials
- Google AI API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the documentation
- Review the API endpoints
- Check the console for error messages
- Ensure all environment variables are set correctly

## 🔮 Future Enhancements

- [ ] PDF text extraction
- [ ] Advanced progress analytics
- [ ] Study group features
- [ ] Mobile app
- [ ] Integration with learning management systems
- [ ] Advanced AI models and fine-tuning
