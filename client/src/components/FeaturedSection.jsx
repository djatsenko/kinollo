import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { shows } = useAppContext();

  const items = (shows || []).slice(0, 4);
  if (!items.length) return null;

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-6">
        <BlurCircle top="0" right="-80px" size={220} opacity={0.25} />
        <h2 className="text-gray-300 font-medium text-lg">Now Showing</h2>

        <button
          onClick={() => {
            navigate("/movies");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white focus:outline-none"
          aria-label="View all movies"
        >
          View All
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* компактная ровная сетка карточек */}
      <div className="grid gap-6 sm:gap-7 grid-cols-2 md:grid-cols-4">
        {items.map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <button
          onClick={() => {
            navigate("/movies");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium"
        >
          Show more
        </button>
      </div>
    </section>
  );
};

export default FeaturedSection;
