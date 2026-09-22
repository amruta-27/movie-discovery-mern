# 🎬 Movie Discovery App

A full-stack movie discovery application built with **React, Node.js, Express, MongoDB, and TMDB API**.

The application allows users to discover movies, search for movies, explore movie details, navigate through paginated results, and maintain a persistent wishlist.

The project was developed as a Full-Stack Intern assignment with a focus on product-like UX, clean frontend architecture, backend API abstraction, persistence, performance, error handling, and responsive design.

---

## 🚀 Live Application

### Frontend
https://movie-discovery-mern.netlify.app

### Backend API
https://movie-discovery-mern.onrender.com

### GitHub Repository
https://github.com/amruta-27/movie-discovery-mern

---

# ✨ Features

## 🎥 Movie Discovery

- Browse movies through the discovery page.
- Explore popular/discoverable movies.
- Search movies by title.
- Pagination for continued exploration.
- Movie cards with poster, title, release date and rating.
- Graceful handling of missing poster images.

## 🔎 Search

- Search movies using the TMDB API.
- Search requests are debounced to avoid unnecessary API calls.
- Rapid search changes are handled using request cancellation.
- Empty search results are handled with a user-friendly empty state.

## 🎬 Movie Details

Users can open a movie and view additional information such as:

- Movie title
- Poster
- Overview
- Release date
- Rating
- Additional movie information returned by the API

The movie detail page can be opened without losing the application's overall navigation context.

## ❤️ Wishlist

Users can add and remove movies from their wishlist.

Wishlist data is persisted using:

- MongoDB
- A browser-generated anonymous user ID stored in `localStorage`

This allows the wishlist to remain available when the user revisits the application from the same browser.

## 📱 Responsive UI

The application is designed to work across different screen sizes:

- Desktop
- Laptop
- Tablet
- Mobile

The movie grid adapts based on available screen width.

The UI also handles:

- Long movie titles
- Different poster dimensions
- Large result sets
- Empty results
- Loading states
- API failures
- Slow network conditions

## ⚡ Performance & Request Handling

The application includes several mechanisms to reduce unnecessary requests and improve user experience:

- Debounced movie search
- `AbortController` for cancelling outdated search requests
- Backend caching
- Pagination
- Centralized API communication
- Loading states
- Error states
- Empty states

---

# 🏗️ Architecture

The application follows a full-stack architecture:

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    Node.js + Express │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
      ┌──────────────────┐             ┌──────────────────┐
      │     TMDB API     │             │     MongoDB      │
      │  Movie Data      │             │    Wishlist      │
      └──────────────────┘             └──────────────────┘
