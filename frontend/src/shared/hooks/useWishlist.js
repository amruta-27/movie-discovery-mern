import { useCallback, useEffect, useMemo, useState } from "react";
import { wishlistApi } from "../api/api.js";

const KEY = "reelvault-user-id";

function getUserId() {
  const existing = localStorage.getItem(KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(KEY, id);
  return id;
}

export function useWishlist() {
  const userId = useMemo(getUserId, []);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await wishlistApi.list(userId);
      setMovies(data.movies || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { refresh(); }, [refresh]);

  const isSaved = useCallback(
    (movieId) => movies.some(movie => movie.movieId === Number(movieId)),
    [movies]
  );

  const toggle = useCallback(async (movie) => {
    const saved = isSaved(movie.id || movie.movieId);
    const data = saved
      ? await wishlistApi.remove(userId, movie.id || movie.movieId)
      : await wishlistApi.add(userId, {
          movieId: movie.id || movie.movieId,
          title: movie.title,
          posterPath: movie.posterPath,
          backdropPath: movie.backdropPath,
          overview: movie.overview,
          releaseDate: movie.releaseDate,
          voteAverage: movie.voteAverage,
          genreIds: movie.genreIds || []
        });

    setMovies(data.movies || []);
  }, [isSaved, userId]);

  return { movies, loading, isSaved, toggle, refresh };
}
