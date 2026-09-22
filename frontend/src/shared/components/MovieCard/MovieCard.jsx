import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const year = (date) => date ? date.slice(0, 4) : "—";

export default function MovieCard({ movie, saved, onToggle }) {
  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id || movie.movieId}`} className="movie-poster-wrap">
        {movie.posterPath ? (
          <img src={movie.posterPath} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div className="poster-fallback">NO IMAGE</div>
        )}
        <span className="movie-rating"><Star size={13} fill="currentColor" /> {movie.voteAverage?.toFixed?.(1) || "—"}</span>
      </Link>

      <div className="movie-card-body">
        <Link to={`/movie/${movie.id || movie.movieId}`} className="movie-title" title={movie.title}>
          {movie.title}
        </Link>
        <div className="movie-meta">
          <span>{year(movie.releaseDate)}</span>
          <button
            className={`heart-button ${saved ? "saved" : ""}`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onToggle?.(movie);
            }}
            aria-label={saved ? `Remove ${movie.title} from wishlist` : `Add ${movie.title} to wishlist`}
          >
            <Heart size={18} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
