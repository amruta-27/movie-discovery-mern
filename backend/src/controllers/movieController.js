import {
  discoverMovies,
  searchMovies,
  getMovieDetails
} from "../services/tmdbService.js";

export async function discover(req, res, next) {
  try {
    const data = await discoverMovies({
      page: Math.max(Number(req.query.page) || 1, 1),
      sortBy: req.query.sortBy || "popularity.desc",
      genre: req.query.genre || ""
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function search(req, res, next) {
  try {
    const query = String(req.query.query || "").trim();
    if (!query) return res.status(400).json({ message: "Search query is required." });

    const data = await searchMovies({
      query,
      page: Math.max(Number(req.query.page) || 1, 1)
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function details(req, res, next) {
  try {
    const data = await getMovieDetails(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
