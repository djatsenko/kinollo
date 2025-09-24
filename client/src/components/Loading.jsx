import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const pretty = (slug) => {
  switch (slug) {
    case "my-bookings":
      return "My bookings";
    case "movies":
      return "Movies";
    case "admin":
      return "Admin";
    default:
      return slug?.replaceAll("-", " ") || "Home";
  }
};

const Loading = () => {
  const { nextUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const target = nextUrl ? `/${nextUrl}` : "/";
    const timer = setTimeout(() => {
      navigate(target, { replace: true });
    }, 1200); // быстрее и приятнее

    return () => clearTimeout(timer);
  }, [nextUrl, navigate]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[80vh] text-center">
      <div
        className="animate-spin rounded-full h-14 w-14 border-2 border-white/20 border-t-primary"
        aria-label="Loading"
      />
      {nextUrl && (
        <p className="text-sm text-gray-400">
          Redirecting to <span className="text-white">{pretty(nextUrl)}</span>…
        </p>
      )}
    </div>
  );
};

export default Loading;
