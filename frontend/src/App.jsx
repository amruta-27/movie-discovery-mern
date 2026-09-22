import { Routes, Route } from "react-router-dom";
import AppShell from "./shell/AppShell/AppShell.jsx";
import Discovery from "./microfrontends/Discovery/Discovery.jsx";
import MovieDetails from "./microfrontends/MovieDetails/MovieDetails.jsx";
import Wishlist from "./microfrontends/Wishlist/Wishlist.jsx";
import NotFound from "./shared/NotFound/NotFound.jsx";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Discovery />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}
