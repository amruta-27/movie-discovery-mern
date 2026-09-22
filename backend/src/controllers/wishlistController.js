import Wishlist from "../models/Wishlist.js";

function userId(req) {
  return String(req.header("x-user-id") || "").trim();
}

export async function getWishlist(req, res, next) {
  try {
    const id = userId(req);
    if (!id) return res.status(400).json({ message: "x-user-id header is required." });

    const wishlist = await Wishlist.findOne({ userId: id }).lean();
    res.json({ movies: wishlist?.movies || [] });
  } catch (error) {
    next(error);
  }
}

export async function addWishlist(req, res, next) {
  try {
    const id = userId(req);
    if (!id) return res.status(400).json({ message: "x-user-id header is required." });

    const movie = req.body;
    if (!movie?.movieId || !movie?.title) {
      return res.status(400).json({ message: "movieId and title are required." });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: id },
      { $setOnInsert: { userId: id }, $addToSet: { movies: movie } },
      { new: true, upsert: true }
    ).lean();

    res.status(201).json({ movies: wishlist.movies });
  } catch (error) {
    next(error);
  }
}

export async function removeWishlist(req, res, next) {
  try {
    const id = userId(req);
    if (!id) return res.status(400).json({ message: "x-user-id header is required." });

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: id },
      { $pull: { movies: { movieId: Number(req.params.movieId) } } },
      { new: true }
    ).lean();

    res.json({ movies: wishlist?.movies || [] });
  } catch (error) {
    next(error);
  }
}
