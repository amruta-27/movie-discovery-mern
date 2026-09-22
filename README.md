# ReelVault — MERN Movie Discovery App

A responsive dark-themed movie discovery application built for the Full-Stack Intern Assignment.

## Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB / Mongoose
- **Third-party API:** TMDB
- **Architecture:** Shell + feature micro-frontends (`Discovery`, `MovieDetails`, `Wishlist`) with isolated JSX/CSS folders and shared API/UI primitives.

## Assignment coverage

The application supports:
- Movie discovery without requiring an initial search
- Search with frontend debounce and request cancellation
- Genre exploration
- Sorting
- Pagination for large result sets
- Movie detail pages
- Persistent wishlist stored in MongoDB
- Loading, empty and error states
- Responsive layouts for desktop, tablet and mobile
- Backend abstraction between React and TMDB
- Server-side short-lived caching to reduce repeated TMDB calls
- Normalized movie data exposed by the backend rather than leaking TMDB response shapes

These requirements come directly from the assignment, including the backend-as-abstraction requirement, repeated-request handling, fast-changing searches, persistence, responsive behavior and README deliverables. See the supplied assignment: fileciteturn0file0L29-L41 and fileciteturn0file0L113-L128.

## Architecture

```text
movie-discovery-mern/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── services/
└── frontend/
    └── src/
        ├── shell/
        │   └── AppShell/
        ├── microfrontends/
        │   ├── Discovery/
        │   ├── MovieDetails/
        │   └── Wishlist/
        └── shared/
            ├── api/
            ├── components/
            └── hooks/
```

Each feature/component has its own `.jsx` and `.css` file where styling is needed. The feature modules are intentionally isolated so they can be extracted into separately deployed remotes later if the project grows.

## Why the backend sits between React and TMDB

The assignment specifically asks the client to communicate with the Node.js backend rather than the external movie service. The backend therefore:
1. Owns the TMDB API key.
2. Normalizes external data into the application's movie model.
3. Adds a small TTL cache for repeated requests.
4. Provides a stable API for the React client.
5. Centralizes external-service error handling.

## Wishlist persistence

A browser-generated anonymous `userId` is stored in `localStorage`. The ID is sent as `x-user-id` to the backend. MongoDB stores one wishlist document per user ID.

This avoids requiring authentication for the assignment while still allowing a wishlist to survive browser restarts on the same browser profile.

## Setup

### 1. Backend

```bash
cd backend
npm install
copy .env.example .env
```

For macOS/Linux:

```bash
cp .env.example .env
```

Fill in:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_v3_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
CLIENT_URL=http://localhost:5173
CACHE_TTL_MS=120000
```

Start:

```bash
npm run dev
```

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

For macOS/Linux:

```bash
cp .env.example .env
```

The frontend defaults to:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Open the Vite URL shown in the terminal.

## TMDB setup

Create a TMDB account and create an API key from the TMDB API settings. Put the key only in `backend/.env`.

Do not put the TMDB secret in frontend code.

## Production considerations

For a production version I would:
- Add authentication and user accounts.
- Replace the in-memory cache with Redis.
- Add rate limiting and request timeouts.
- Add structured logging and monitoring.
- Add tests for controllers, services and critical UI behavior.
- Add an image CDN / optimized image transformation.
- Add a proper API gateway or BFF if the micro-frontends become separately deployed.
- Use Module Federation when independent deployment/versioning becomes a real requirement rather than adding its operational overhead prematurely.

## Known limitations

- The assignment uses anonymous browser-level identity rather than account authentication.
- The cache is process-local, so it resets when the backend restarts.
- TMDB API availability and rate limits remain external dependencies.
- No automated test suite is included in this submission package.

## AI transparency

AI assistance was used to understand the assignment requirements, generate initial boilerplate, reason about API error handling and caching, and review the application structure. The final application structure and behavior were selected to satisfy the assignment requirements, and the implementation should be reviewed and understood before submission.

## Suggested interview explanation

**Data flow**

```text
React micro-frontend
      ↓
Express REST API
      ↓
TMDB service + short TTL cache
      ↓
Normalized movie response
      ↓
React UI

Wishlist:
React → Express → MongoDB → Express → React
```

**Fast search behavior:** the frontend debounces typing and aborts stale requests. The backend also caches identical requests briefly.

**Why MongoDB:** the wishlist is document-shaped, small, and naturally represented as a user document containing movie snapshots.

**Why feature micro-frontends:** Discovery, Details and Wishlist are isolated feature boundaries. This makes ownership and future extraction clearer while avoiding unnecessary deployment complexity for a small assignment.
