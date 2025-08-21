## SmartSyllabus (MERN + OpenAI)

A study assistant where students upload syllabus and exam details. The AI generates a personalized roadmap with daily goals, curated resources, and tracks progress. Uses RAG on syllabus chunks stored with embeddings.

### Tech Stack

- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB + Mongoose
- AI: OpenAI API (chat + embeddings)
- Auth: Google OAuth (Passport.js)

### Monorepo Structure

- `client/` Vite + React
- `server/` Express + Mongoose

### Server: Setup

1. Create `.env` in `server/`:

```
PORT=3000
NODE_ENV=development
DATABASE_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
ACCESS_TOKEN_SECRET=replace_me
REFRESH_TOKEN_SECRET=replace_me
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
GOOGLE_CALLBACK_URL=http://localhost:3000/api/user/google/callback
GOOGLE_CLIENT_ID=replace_me
GOOGLE_CLIENT_SECRET=replace_me
OPENAI_API_KEY=replace_me
```

2. Install and run:

```
cd server
npm install
npm run build && npm start
# or during development
npm run dev
```

### API Overview

All routes are prefixed from `server/src/app/index.ts`:

- `GET /api/user/me` (auth required)
- `GET /api/user/google` → OAuth start
- `GET /api/user/google/callback` → OAuth callback
- `DELETE /api/user/logout`

#### Chat

- `POST /api/chat` → create chat: `{ title, syllabusType, syllabusText?, syllabusPdfLink? }`
- `GET /api/chat` → list chats for current user
- `POST /api/chat/:chatId/messages` → append message `{ role, content }`

#### Syllabus

- `POST /api/syllabus/:chatId` → upload syllabus chunks `{ chunks: string[] }` (embeds each chunk)
- `GET /api/syllabus/:chatId` → list chunks for chat

#### Roadmap

- `POST /api/roadmap/:chatId` → generate roadmap `{ query }` (deducts 1 credit)
- `GET /api/roadmap/:roadmapId` → fetch roadmap

#### Progress

- `POST /api/progress/:roadmapId/:day` → mark a day complete
- `GET /api/progress/:roadmapId` → get progress entries

#### Transaction

- `POST /api/transaction` → add credits after payment `{ amount, creditsAdded, paymentProvider }`
- `GET /api/transaction` → list transactions for current user

### Credits

- Default user credits: 10
- Cost per roadmap: 1 credit
- Logic: `server/src/app/services/credit.service.ts`

### RAG Flow

1. Upload syllabus as text chunks → embeddings stored in `syllabuschunks`
2. During roadmap generation, we embed the query and do vector similarity over chunks
3. We pass the retrieved context to OpenAI to produce a structured plan

### Dev Notes

- Routers under `server/src/app/routes/*` and controllers under `server/src/app/controllers/*`
- Business logic in `server/src/app/services/*`
- Models in `server/src/app/models/*`
- OpenAI helpers in `server/src/app/libs/*`
- Error responses use `ApiError`/`ApiResponse`
