import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || "",
  tmdbApiKey: process.env.TMDB_API_KEY || "",
  tmdbBaseUrl: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  cacheTtl: Number(process.env.CACHE_TTL_MS || 120000)
};
