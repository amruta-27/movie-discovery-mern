import { env } from "../config/env.js";
import { getCached, setCached } from "./cache.js";

const image = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title || movie.name || "Untitled",
    overview: movie.overview || "No overview available.",
    posterPath: image(movie.poster_path),
    backdropPath: image(movie.backdrop_path, "w1280"),
    releaseDate: movie.release_date || movie.first_air_date || "",
    voteAverage: Number(movie.vote_average || 0),
    voteCount: Number(movie.vote_count || 0),
    genreIds: Array.isArray(movie.genre_ids) ? movie.genre_ids : [],
    popularity: Number(movie.popularity || 0),
    originalLanguage: movie.original_language || ""
  };
}

async function tmdb(path, params = {}) {
  if (!env.tmdbApiKey) {
    const error = new Error("TMDB_API_KEY is not configured.");
    error.status = 503;
    throw error;
  }

  const url = new URL(`${env.tmdbBaseUrl}${path}`);
  url.searchParams.set("api_key", env.tmdbApiKey);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  });

  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`TMDB request failed: ${response.status}`);
    error.status = response.status;
    error.details = body.slice(0, 300);
    throw error;
  }
  return response.json();
}

async function cachedRequest(key, path, params) {
  const hit = getCached(key);
  if (hit) return hit;
  const data = await tmdb(path, params);
  setCached(key, data, env.cacheTtl);
  return data;
}

export async function discoverMovies({ page = 1, sortBy = "popularity.desc", genre = "" }) {
  const data = await cachedRequest(
    `discover:${page}:${sortBy}:${genre}`,
    "/discover/movie",
    {
      page,
      sort_by: sortBy,
      with_genres: genre,
      include_adult: false,
      language: "en-US"
    }
  );
  return {
    page: data.page,
    totalPages: Math.min(data.total_pages || 1, 500),
    totalResults: data.total_results || 0,
    results: (data.results || []).map(normalizeMovie)
  };
}

export async function searchMovies({ query, page = 1 }) {
  const data = await cachedRequest(
    `search:${query.toLowerCase()}:${page}`,
    "/search/movie",
    { query, page, include_adult: false, language: "en-US" }
  );
  return {
    page: data.page,
    totalPages: Math.min(data.total_pages || 1, 500),
    totalResults: data.total_results || 0,
    results: (data.results || []).map(normalizeMovie)
  };
}

export async function getMovieDetails(id) {
  const data = await cachedRequest(
    `details:${id}`,
    `/movie/${id}`,
    { language: "en-US" }
  );

  return {
    ...normalizeMovie(data),
    runtime: data.runtime || 0,
    genres: Array.isArray(data.genres) ? data.genres.map(g => g.name) : [],
    tagline: data.tagline || "",
    status: data.status || "",
    homepage: data.homepage || ""
  };
}
