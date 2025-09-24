import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
    favoriteMovies,
    image_base_url,
  } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data?.success) setShow(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load movie");
    }
  };

  const handleFavorite = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");
      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data?.success) {
        await fetchFavoriteMovies();
        toast.success(data.message || "Updated favorites");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update favorites");
    }
  };

  const watchTrailer = () => {
    toast("Trailer coming soon");
  };

  useEffect(() => {
    getShow();
  }, [id]);

  if (!show) return <Loading />;

  const m = show.movie || {};
  const posterPath = m.poster_path || m.backdrop_path || "";
  const posterUrl = posterPath ? image_base_url + posterPath : "";
  const year = m.release_date ? new Date(m.release_date).getFullYear() : "—";
  const genres = Array.isArray(m.genres)
    ? m.genres.map((g) => g?.name ?? g).join(", ")
    : "";
  const runtime = m.runtime ? timeFormat(m.runtime) : "";
  const rating =
    typeof m.vote_average === "number" ? m.vote_average.toFixed(1) : "—";
  const lang = (m.original_language || "en").toUpperCase();

  const isFav = !!favoriteMovies.find((mv) => mv._id === id);

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Poster */}
        <img
          src={posterUrl}
          alt={m.title || "Movie poster"}
          className="max-md:mx-auto rounded-xl h-[26rem] w-auto max-w-[280px] object-cover"
        />

        {/* Details */}
        <div className="relative flex flex-col gap-3 flex-1">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary tracking-wider text-xs">{lang}</p>

          <h1 className="text-3xl md:text-4xl font-semibold max-w-[26rem] text-balance">
            {m.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {rating} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {m.overview || "No overview available."}
          </p>

          <p className="text-sm text-gray-300">
            {runtime && `${runtime} • `}
            {genres || "—"} • {year}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button
              onClick={watchTrailer}
              className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium active:scale-95"
            >
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium active:scale-95"
            >
              Buy Tickets
            </a>

            <button
              onClick={handleFavorite}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              className="bg-gray-700 p-2.5 rounded-full transition active:scale-95"
              title={isFav ? "In Favorites" : "Add to Favorites"}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav ? "fill-primary text-primary" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Cast */}
      <p className="text-lg font-medium mt-20">Top Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {(m.casts || []).slice(0, 12).map((cast, index) => {
            const castImg = cast?.profile_path
              ? image_base_url + cast.profile_path
              : null;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                {castImg ? (
                  <img
                    src={castImg}
                    alt={cast?.name || "cast"}
                    className="rounded-full h-20 aspect-square object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="rounded-full h-20 aspect-square grid place-items-center bg-white/10 text-xs text-gray-400">
                    {cast?.name?.split(" ").map((n) => n[0]).join("") || "—"}
                  </div>
                )}
                <p className="font-medium text-xs mt-3">{cast?.name || "—"}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Date selector */}
      <div id="dateSelect" className="scroll-mt-28">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      {/* Recommendations */}
      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
