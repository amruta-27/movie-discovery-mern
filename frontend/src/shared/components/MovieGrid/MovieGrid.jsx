import MovieCard from "../MovieCard/MovieCard.jsx";
import "./MovieGrid.css";

export default function MovieGrid({ movies, isSaved, onToggle }) {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id || movie.movieId}
          movie={movie}
          saved={isSaved?.(movie.id || movie.movieId)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
