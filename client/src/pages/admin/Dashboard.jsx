import React, { useEffect, useMemo, useState } from 'react';
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from 'lucide-react';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();

  // валюта с дефолтом
  const currency =
    import.meta.env.VITE_CURRENCY && import.meta.env.VITE_CURRENCY.trim()
      ? import.meta.env.VITE_CURRENCY
      : '$';

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });
  const [loading, setLoading] = useState(true);

  // аккуратное форматирование сумм
  const fmtMoney = (val) => `${currency}${Number(val || 0).toLocaleString()}`;

  const dashboardCards = useMemo(
    () => [
      { title: 'Total Bookings', value: `${dashboardData.totalBookings}`, icon: ChartLineIcon },
      { title: 'Total Revenue', value: fmtMoney(dashboardData.totalRevenue), icon: CircleDollarSignIcon },
      { title: 'Active Shows', value: `${dashboardData.activeShows.length}`, icon: PlayCircleIcon },
      { title: 'Total Users', value: `${dashboardData.totalUser}`, icon: UsersIcon },
    ],
    [dashboardData, currency]
  );

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.success) {
        setDashboardData(data.dashboardData || {});
      } else {
        toast.error(data?.message || 'Failed to load dashboard data');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]); // достаточно дождаться авторизованного пользователя

  if (loading) return <Loading />;

  return (
    <>
      <Title text1="Admin" text2="Dashboard" />

      {/* cards */}
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>

      {/* active shows */}
      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10%" />
        {dashboardData.activeShows.length === 0 ? (
          <p className="text-gray-400">No active shows right now.</p>
        ) : (
          dashboardData.activeShows.map((show) => (
            <div
              key={show._id}
              className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
            >
              <img
                src={
                  show?.movie?.poster_path
                    ? `${image_base_url}${show.movie.poster_path}`
                    : '/placeholder.png'
                }
                alt={show?.movie?.title || 'Movie'}
                className="h-60 w-full object-cover"
              />
              <p className="font-medium p-2 truncate">{show?.movie?.title || '—'}</p>
              <div className="flex items-center justify-between px-2">
                <p className="text-lg font-medium">{fmtMoney(show?.showPrice)}</p>
                <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                  <StarIcon className="w-4 h-4 text-primary fill-primary" />
                  {Number(show?.movie?.vote_average || 0).toFixed(1)}
                </p>
              </div>
              <p className="px-2 pt-2 text-sm text-gray-500">
                {dateFormat(show?.showDateTime)}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Dashboard;
