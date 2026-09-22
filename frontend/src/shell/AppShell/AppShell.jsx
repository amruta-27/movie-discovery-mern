import { NavLink } from "react-router-dom";
import { Clapperboard, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import "./AppShell.css";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark"><Clapperboard size={20} /></span>
            <span>Reel<span>Vault</span></span>
          </NavLink>

          <nav className={`main-nav ${open ? "open" : ""}`}>
            <NavLink to="/" end onClick={() => setOpen(false)}>Discover</NavLink>
            <NavLink to="/wishlist" onClick={() => setOpen(false)}>
              <Heart size={16} /> Wishlist
            </NavLink>
          </nav>

          <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="app-page footer-inner">
          <span>ReelVault</span>
          <span>Movie data powered by TMDB</span>
        </div>
      </footer>
    </div>
  );
}
