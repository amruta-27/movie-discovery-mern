import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    movies: [
      {
        movieId: { type: Number, required: true },
        title: { type: String, required: true },
        posterPath: { type: String, default: null },
        backdropPath: { type: String, default: null },
        overview: { type: String, default: "" },
        releaseDate: { type: String, default: "" },
        voteAverage: { type: Number, default: 0 },
        genreIds: { type: [Number], default: [] }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
