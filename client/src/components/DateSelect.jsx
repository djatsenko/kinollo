import React, { useEffect, useMemo, useRef, useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime = {}, id }) => {
  const navigate = useNavigate();
  const scrollerRef = useRef(null);

  // отсортированные даты (YYYY-MM-DD / ISO)
  const dates = useMemo(
    () =>
      Object.keys(dateTime)
        .filter(Boolean)
        .sort((a, b) => new Date(a) - new Date(b)),
    [dateTime]
  );

  const [selected, setSelected] = useState(null);

  // автоселект ближайшей даты
  useEffect(() => {
    if (dates.length) setSelected(dates[0]);
  }, [dates]);

  const onBookHandler = () => {
    if (!selected) {
      return toast("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollBy = (dx) => {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 p-8 bg-primary/10 border border-primary/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="w-full">
          <p className="text-lg font-semibold">Choose Date</p>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-240)}
              className="p-2 rounded hover:bg-white/10"
              aria-label="Scroll dates left"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <div
              ref={scrollerRef}
              className="flex gap-3 overflow-x-auto no-scrollbar md:max-w-lg"
            >
              {dates.map((date) => {
                const d = new Date(date);
                const day = d.getDate();
                const month = d.toLocaleDateString("en-US", {
                  month: "short",
                });
                const weekday = d.toLocaleDateString("en-US", {
                  weekday: "short",
                });

                const isActive = selected === date;

                return (
                  <button
                    key={date}
                    onClick={() => setSelected(date)}
                    aria-pressed={isActive}
                    className={`flex flex-col items-center justify-center h-16 w-16 rounded transition
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "border border-primary/60 hover:bg-primary/10"
                      }`}
                    title={d.toLocaleDateString()}
                  >
                    <span className="text-[10px] uppercase">{weekday}</span>
                    <span className="text-base leading-none">{day}</span>
                    <span className="text-[10px]">{month}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollBy(240)}
              className="p-2 rounded hover:bg-white/10"
              aria-label="Scroll dates right"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <button
          onClick={onBookHandler}
          disabled={!selected}
          className={`px-8 py-2 rounded font-medium transition
            ${
              selected
                ? "bg-primary text-white hover:bg-primary-dull"
                : "bg-white/10 text-gray-400 cursor-not-allowed"
            }`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
