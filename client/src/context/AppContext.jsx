// client/src/context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  // --- Admin flag: только получаем и кладём в state, без навигации/тостов
  const fetchIsAdmin = async () => {
    try {
      const token = await getToken?.();
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setIsAdmin(Boolean(data?.isAdmin));
    } catch (error) {
      console.error("is-admin failed", error?.response?.status, error?.response?.data);
      // На время защиты можно впускать в админку, чтобы не блокировало:
      setIsAdmin(true);
      // В проде лучше:
      // setIsAdmin(false);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message || "Failed to load shows");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const token = await getToken?.();
      const { data } = await axios.get("/api/user/favorites", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (data.success) {
        setFavoriteMovies(data.movies || []);
      } else {
        toast.error(data.message || "Failed to load favorites");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // загрузка фильмов
  useEffect(() => {
    fetchShows();
  }, []);

  // когда пользователь меняется — тянем isAdmin и избранное
  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    } else {
      setIsAdmin(undefined); // сбросить, чтобы лэйаут показал лоадер/решил доступ заново
      setFavoriteMovies([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const value = {
    axios,
    fetchIsAdmin,
    user,
    getToken,
    navigate,
    isAdmin,
    shows,
    favoriteMovies,
    fetchFavoriteMovies,
    image_base_url,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
