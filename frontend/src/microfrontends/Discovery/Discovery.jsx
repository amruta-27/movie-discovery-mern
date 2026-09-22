import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { movieApi } from "../../shared/api/api.js";
import { useDebounce } from "../../shared/hooks/useDebounce.js";
import { useWishlist } from "../../shared/hooks/useWishlist.js";
import LoadingState from "../../shared/components/LoadingState/LoadingState.jsx";
import ErrorState from "../../shared/components/ErrorState/ErrorState.jsx";
import EmptyState from "../../shared/components/EmptyState/EmptyState.jsx";
import MovieGrid from "../../shared/components/MovieGrid/MovieGrid.jsx";
import Pagination from "../../shared/components/Pagination/Pagination.jsx";
import "./Discovery.css";

const genres = [
  { id: "", label: "All genres" },
  { id: "28", label: "Action" },
  { id: "35", label: "Comedy" },
  { id: "18", label: "Drama" },
  { id: "27", label: "Horror" },
  { id: "878", label: "Sci-Fi" },
  { id: "10749", label: "Romance" },
  { id: "53", label: "Thriller" }
];

const sorts = [
  { value: "popularity.desc", label: "Most popular" },
  { value: "vote_average.desc", label: "Highest rated" },
  { value: "primary_release_date.desc", label: "Newest releases" },
  { value: "revenue.desc", label: "Top revenue" }
];

export default function Discovery() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], totalPages: 1, totalResults: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query);
  const { isSaved, toggle } = useWishlist();

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");
        const result = debouncedQuery.trim()
          ? await movieApi.search(debouncedQuery.trim(), page, controller.signal)
          : await movieApi.discover({ page, sortBy, genre }, controller.signal);
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [debouncedQuery, page, sortBy, genre]);

  useEffect(() => { setPage(1); }, [debouncedQuery, sortBy, genre]);

  const isSearch = Boolean(debouncedQuery.trim());

  return (
    <section className="app-page page-section discovery">
      <div className="discovery-hero">
        <div>
          <div className="eyebrow"><Sparkles size={15} /> DISCOVER SOMETHING NEW</div>
          <h1>Find your next <span>favorite movie.</span></h1>
          <p>Browse popular titles, filter by genre, or search the world's movie catalog.</p>
        </div>

        <div className="search-box">
          <Search size={19} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search"><X size={17} /></button>
          )}
        </div>
      </div>

      <div className="toolbar">
        <div className="genre-scroll">
          {genres.map(item => (
            <button
              key={item.id}
              className={genre === item.id && !isSearch ? "selected" : ""}
              onClick={() => { setGenre(item.id); setQuery(""); }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="sort-control">
          <SlidersHorizontal size={16} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} disabled={isSearch}>
            {sorts.map(sort => <option key={sort.value} value={sort.value}>{sort.label}</option>)}
          </select>
        </label>
      </div>

      <div className="results-heading">
        <div>
          <h2>{isSearch ? `Results for “${debouncedQuery}”` : "Trending picks"}</h2>
          {!loading && <span>{data.totalResults?.toLocaleString?.() || 0} titles</span>}
        </div>
      </div>

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={() => setPage(page)} />}
      {!loading && !error && data.results.length === 0 && (
        <EmptyState title="No movies found" text="Try a different title, genre, or search term." />
      )}
      {!loading && !error && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} isSaved={isSaved} onToggle={toggle} />
          <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
        </>
      )}
    </section>
  );
}
