import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";

const ListShows = () => {
  const { axios, getToken, image_base_url } = useAppContext();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const token = await getToken?.();
      const { data } = await axios.get("/api/admin/shows", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (data?.success) {
        setShows(data.shows || []);
        // если пусто — это НЕ ошибка, просто покажем “No active shows.”
      } else {
        toast.error(data?.message || "Failed to load shows");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load shows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Shows</h2>

      {!shows.length ? (
        <p className="text-gray-400">No active shows.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {shows.map((s) => (
            <div key={s._id} className="w-55 rounded-lg overflow-hidden bg-primary/10 border border-primary/20">
              <img
                src={image_base_url + s.movie?.poster_path}
                alt={s.movie?.title || "Show"}
                className="h-60 w-full object-cover"
              />
              <div className="p-2">
                <p className="font-medium truncate">{s.movie?.title || "—"}</p>
                <p className="text-sm text-gray-400">
                  {new Date(s.showDateTime).toLocaleString()}
                </p>
                <p className="text-sm mt-1">Price: {import.meta.env.VITE_CURRENCY}{s.showPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListShows;
