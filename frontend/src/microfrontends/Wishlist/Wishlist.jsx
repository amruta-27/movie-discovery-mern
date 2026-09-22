import { Heart } from "lucide-react";
import { useWishlist } from "../../shared/hooks/useWishlist.js";
import LoadingState from "../../shared/components/LoadingState/LoadingState.jsx";
import EmptyState from "../../shared/components/EmptyState/EmptyState.jsx";
import MovieGrid from "../../shared/components/MovieGrid/MovieGrid.jsx";
import "./Wishlist.css";

export default function Wishlist() {
  const { movies, loading, isSaved, toggle } = useWishlist();

  return (
    <section className="app-page page-section wishlist-page">
      <div className="wishlist-heading">
        <div className="wishlist-icon"><Heart size={24} fill="currentColor" /></div>
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h1>Wishlist</h1>
          <p>Movies you want to remember and watch later.</p>
        </div>
      </div>

      {loading && <LoadingState text="Loading your wishlist..." />}
      {!loading && movies.length === 0 && (
        <EmptyState
          title="Your wishlist is empty"
          text="Save movies while browsing and they will stay here after you close the app."
        />
      )}
      {!loading && movies.length > 0 && (
        <>
          <div className="wishlist-count">{movies.length} saved {movies.length === 1 ? "movie" : "movies"}</div>
          <MovieGrid movies={movies} isSaved={isSaved} onToggle={toggle} />
        </>
      )}
    </section>
  );
}
