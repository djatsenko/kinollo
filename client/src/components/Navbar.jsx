import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const { favoriteMovies } = useAppContext();

  const closeMenu = () => setIsOpen(false);

  const linkBase =
    "relative px-2 py-1 rounded-md transition focus:outline-none focus:ring-2 focus:ring-white/20";
  const linkActive =
    "text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary";

  const LinkBtn = ({ children, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="px-2 py-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {children}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
        <Link to="/" className="max-md:flex-1" onClick={closeMenu} aria-label="Home">
          {/* bigger logo */}
          <img src={assets.logo} alt="KINNO" className="w-[120px] md:w-[160px] h-auto" />
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8 px-6 py-3 rounded-full backdrop-blur bg-black/40 border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
          <NavLink
            to="/"
            end // <- важно: иначе Home активен везде
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : "text-white/80 hover:text-white"}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : "text-white/80 hover:text-white"}`
            }
            onClick={closeMenu}
          >
            Movies
          </NavLink>

          {/* placeholders that don't change URL */}
          <LinkBtn onClick={() => toast("Theaters page coming soon")}>Theaters</LinkBtn>
          <LinkBtn onClick={() => toast("Coming soon")}>Coming Soon</LinkBtn>

          {favoriteMovies.length > 0 && (
            <NavLink
              to="/favorite"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : "text-white/80 hover:text-white"}`
              }
              onClick={closeMenu}
            >
              Favorites
            </NavLink>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="max-md:hidden p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Search"
            onClick={() => navigate("/movies")}
          >
            <SearchIcon className="w-6 h-6" />
          </button>

          {!user ? (
            <button
              onClick={openSignIn}
              className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium"
            >
              Sign in
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus width={15} />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            className="max-md:ml-2 md:hidden p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <MenuIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed top-0 left-0 z-40 h-screen bg-black/70 backdrop-blur transition-[width] duration-300 overflow-hidden border-r border-white/10 ${
          isOpen ? "w-full" : "w-0"
        }`}
      >
        <div className="relative h-full flex flex-col items-center justify-center gap-8 text-lg">
          <button
            type="button"
            className="absolute top-6 right-6 p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <XIcon className="w-6 h-6" />
          </button>

          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : "text-white/90 hover:text-white"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : "text-white/90 hover:text-white"}`
            }
          >
            Movies
          </NavLink>

          <LinkBtn onClick={() => { closeMenu(); toast("Theaters page coming soon"); }}>
            Theaters
          </LinkBtn>
          <LinkBtn onClick={() => { closeMenu(); toast("Coming soon"); }}>
            Coming Soon
          </LinkBtn>

          {favoriteMovies.length > 0 && (
            <NavLink
              to="/favorite"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : "text-white/90 hover:text-white"}`
              }
            >
              Favorites
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
