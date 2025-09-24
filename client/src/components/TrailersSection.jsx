import React, { useEffect, useMemo, useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

const TrailersSection = () => {
  const trailers = useMemo(() => dummyTrailers || [], []);
  const [currentTrailer, setCurrentTrailer] = useState(trailers[0] || null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Автоплей при смене трейлера
    if (currentTrailer?.videoUrl) setPlaying(true);
  }, [currentTrailer]);

  const selectTrailer = (tr) => {
    if (!tr?.videoUrl) {
      toast.error("Нет ссылки на видео");
      return;
    }
    setCurrentTrailer(tr);
  };

  const onThumbKey = (e, tr) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectTrailer(tr);
    }
  };

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-120px" right="-120px" size={280} opacity={0.25} />
        <div className="relative mx-auto w-full max-w-5xl rounded-xl overflow-hidden border border-white/10 aspect-video">
          {currentTrailer?.videoUrl ? (
            <ReactPlayer
              url={currentTrailer.videoUrl}
              playing={playing}
              controls
              muted
              width="100%"
              height="100%"
              className="absolute inset-0"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-gray-400">
              Видео недоступно
            </div>
          )}
        </div>
      </div>

      <div className="group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mt-8 max-w-5xl mx-auto">
        {trailers.map((tr) => {
          const isActive = tr === currentTrailer;
          return (
            <div
              key={tr.image || tr.videoUrl}
              role="button"
              tabIndex={0}
              onClick={() => selectTrailer(tr)}
              onKeyDown={(e) => onThumbKey(e, tr)}
              className={`relative overflow-hidden rounded-lg border transition 
                cursor-pointer h-40 sm:h-44 md:h-48
                ${isActive ? "border-primary ring-1 ring-primary" : "border-white/10 group-hover:not-hover:opacity-50 hover:-translate-y-1"}`
              }
            >
              {tr.image ? (
                <img
                  src={tr.image}
                  alt={tr.title || "trailer"}
                  className="w-full h-full object-cover brightness-75"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-gray-400">
                  no image
                </div>
              )}
              <PlayCircleIcon
                strokeWidth={1.6}
                className={`absolute top-1/2 left-1/2 w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 -translate-y-1/2
                  ${isActive ? "text-primary" : "text-white"}`}
              />
              {tr.title && (
                <div className="absolute bottom-0 inset-x-0 p-2 text-xs text-white/90 bg-black/30 backdrop-blur">
                  {tr.title}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrailersSection;
