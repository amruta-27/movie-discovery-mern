# ReelVault Backend

Express API that abstracts TMDB and persists wishlists in MongoDB.

Routes:
- `GET /api/health`
- `GET /api/movies/discover?page=1&sortBy=popularity.desc&genre=`
- `GET /api/movies/search?query=batman&page=1`
- `GET /api/movies/:id`
- `GET /api/wishlist` with `x-user-id`
- `POST /api/wishlist` with `x-user-id`
- `DELETE /api/wishlist/:movieId` with `x-user-id`
