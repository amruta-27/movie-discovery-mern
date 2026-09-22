const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const movieApi = {
  discover: (params, signal) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/movies/discover?${query}`, { signal });
  },
  search: (query, page, signal) => {
    const params = new URLSearchParams({ query, page }).toString();
    return apiFetch(`/movies/search?${params}`, { signal });
  },
  details: (id, signal) => apiFetch(`/movies/${id}`, { signal })
};

export const wishlistApi = {
  list: (userId) => apiFetch("/wishlist", { headers: { "x-user-id": userId } }),
  add: (userId, movie) => apiFetch("/wishlist", {
    method: "POST",
    headers: { "x-user-id": userId },
    body: JSON.stringify(movie)
  }),
  remove: (userId, movieId) => apiFetch(`/wishlist/${movieId}`, {
    method: "DELETE",
    headers: { "x-user-id": userId }
  })
};
