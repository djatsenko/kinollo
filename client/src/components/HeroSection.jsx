// client/src/components/HeroSection.jsx
import React from "react";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[92vh] min-h-[640px] flex items-center bg-[url('/backgroundImage.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" aria-hidden="true" />

      <div className="relative z-10 px-6 md:px-16 lg:px-36">
        {/* STAR WARS logo (yellow SVG) */}
        <img
          src={assets.marvellogo}          // <-- твой жёлтый SVG
          alt="Star Wars"
          className="h-12 md:h-16 w-auto"
          style={{ filter: "drop-shadow(0 0 14px rgba(255,215,0,0.35))" }} // мягкое свечение
        />

        <p className="mt-3 text-primary/90 text-sm tracking-[0.25em]">A NEW HOPE COMES</p>

        {/* Титры можно убрать, если лого достаточно — оставляю компактно */}
        <h1 className="sr-only">A New Hope</h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-gray-300">
          <span>Sci-Fi • Adventure • Fantasy</span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" /> 1977
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" /> 2h 1m
          </span>
        </div>

        <p className="mt-4 max-w-[55ch] text-gray-300">
          A farm boy joins forces with a smuggler, a Wookiee, and a princess to
          challenge the Empire and its planet-killing superweapon, but everything goes wrong. How will good forces win this time?
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="mt-6 inline-flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium"
        >
          Book Tickets
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
