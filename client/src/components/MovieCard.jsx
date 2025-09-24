import React from "react";
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { image_base_url } = useAppContext();

  const handleOpen = () => {
    navigate(`/movies/${movie._id}`);
    scrollTo(0, 0);
  };

  const year = movie?.release_date ? new Date(movie.release_date).getFullYear() : "—";
  const genres = Array.isArray(movie?.genres)
    ? movie.genres.slice(0, 2).map((g) => g?.name ?? g).join(" | ")
    : "";
  const runtime = movie?.runtime ? timeFormat(movie.runtime) : "";
  const rating =
    typeof movie?.vote_average === "number" ? movie.vote_average.toFixed(1) : "—";

  // постер/бэкдроп с запасным вариантом
  const imgPath = movie?.backdrop_path || movie?.poster_path || "";
  const imgUrl = imgPath ? `${image_base_url}${imgPath}` : "";

  return (
    <div
      className="group flex flex-col justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:-translate-y-1 transition duration-300 cursor-pointer"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? handleOpen() : null)}
      aria-label={`Open movie ${movie?.title ?? ""}`}
    >
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="aspect-[16/9] w-full bg-black/30">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={movie?.title ?? "movie"}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-gray-500">
              No image
            </div>
          )}
        </div>

        {/* rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur text-sm">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />
          <span className="leading-none">{rating}</span>
        </div>
      </div>

      {/* Title */}
      <p className="font-semibold mt-3 line-clamp-2">{movie?.title}</p>

      {/* Meta */}
      <p className="text-sm text-gray-400 mt-2">
        {year} {genres && <>• {genres}</>} {runtime && <>• {runtime}</>}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pb-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium"
        >
          Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
