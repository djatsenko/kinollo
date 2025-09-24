import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBookings = () => {
  const { axios, getToken } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/list-bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data?.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error(data?.message || "Failed to load bookings");
        setBookings([]);
      }
    } catch (e) {
      toast.error("Failed to load bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-400">
        Loading…
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        <p className="text-gray-400">No bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Bookings</h2>
      <div className="space-y-3">
        {bookings.map((b) => {
          const dt = b.show?.showDateTime ? new Date(b.show.showDateTime) : null;
          const dateStr = dt ? dt.toLocaleDateString() : "—";
          const timeStr = dt
            ? dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "—";

          return (
            <div key={b._id} className="border border-white/10 rounded-lg p-4">
              <div className="text-sm text-gray-300">
                <div>
                  <b>User:</b> {b.user?.firstName || b.user || "—"}
                </div>
                <div>
                  <b>Show:</b>{" "}
                  {b.show?.movie?.title || b.show?.movieTitle || "—"}
                </div>
                <div>
                  <b>Date:</b> {dateStr} &nbsp; <b>Time:</b> {timeStr}
                </div>
                <div>
                  <b>Seats:</b> {(b.bookedSeats || []).join(", ")}
                </div>
                <div>
                  <b>Amount:</b> {b.amount}
                </div>
                <div>
                  <b>Paid:</b> {b.isPaid ? "Yes" : "No"}
                </div>
                <div>
                  <b>ID:</b> {b._id}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListBookings;