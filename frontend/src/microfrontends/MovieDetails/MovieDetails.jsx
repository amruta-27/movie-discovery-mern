import { ArrowLeft, ExternalLink, Heart, Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieApi } from "../../shared/api/api.js";
import { useWishlist } from "../../shared/hooks/useWishlist.js";
import LoadingState from "../../shared/components/LoadingState/LoadingState.jsx";
import ErrorState from "../../shared/components/ErrorState/ErrorState.jsx";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isSaved, toggle } = useWishlist();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    movieApi.details(id, controller.signal)
      .then(setMovie)
      .catch(err => { if (err.name !== "AbortError") setError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });

    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="app-page page-section"><LoadingState text="Loading movie details..." /></div>;
  if (error) return <div className="app-page page-section"><ErrorState message={error} onRetry={() => navigate(0)} /></div>;
  if (!movie) return null;

  return (
    <section className="movie-details">
      <div className="details-backdrop" style={movie.backdropPath ? { backgroundImage: `url(${movie.backdropPath})` } : {}} />
      <div className="app-page details-content">
        <Link to="/" className="back-link"><ArrowLeft size={17} /> Back to discovery</Link>

        <div className="details-layout">
          <div className="details-poster">
            {movie.posterPath ? <img src={movie.posterPath} alt={`${movie.title} poster`} /> : <div>NO IMAGE</div>}
          </div>

          <div className="details-copy">
            <span className="details-kicker">MOVIE DETAILS</span>
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}

            <div className="details-stats">
              <span><Star size={16} fill="currentColor" /> {movie.voteAverage.toFixed(1)} / 10</span>
              <span>{movie.releaseDate?.slice(0, 4) || "Unknown year"}</span>
              {movie.runtime ? <span>{movie.runtime} min</span> : null}
            </div>

            <div className="detail-genres">
              {movie.genres.map(genre => <span key={genre}>{genre}</span>)}
            </div>

            <p className="overview">{movie.overview}</p>

            <div className="detail-actions">
              <button className={`save-detail ${isSaved(movie.id) ? "saved" : ""}`} onClick={() => toggle(movie)}>
                <Heart size={18} fill={isSaved(movie.id) ? "currentColor" : "none"} />
                {isSaved(movie.id) ? "Saved to wishlist" : "Add to wishlist"}
              </button>
              {movie.homepage && (
                <a className="homepage-link" href={movie.homepage} target="_blank" rel="noreferrer">
                  Official site <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
