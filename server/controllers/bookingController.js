import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

// проверка, что выбранные места свободны
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const show = await Show.findById(showId);
    if (!show) return false;

    const taken = show.occupiedSeats || {};
    const isAnyTaken = selectedSeats.some((s) => !!taken[s]);
    return !isAnyTaken;
  } catch {
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const auth = req.auth?.();
    const userId = auth?.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { showId, selectedSeats } = req.body || {};
    if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      return res.json({ success: false, message: "Select at least one seat" });
    }

    // валидируем доступность мест
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({ success: false, message: "Selected seats are not available." });
    }

    // загрузим шоу и фильм
    const show = await Show.findById(showId).populate("movie");
    if (!show) return res.json({ success: false, message: "Show not found" });

    
    const amount = (show.showPrice || 0) * selectedSeats.length;
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount,
      bookedSeats: selectedSeats,
      isPaid: true,
    });

    // помечаем места занятыми
    const occ = show.occupiedSeats || {};
    for (const seat of selectedSeats) occ[seat] = userId;
    show.occupiedSeats = occ;
    show.markModified?.("occupiedSeats");
    await show.save();

    // если раньше возвращали session.url — теперь просто success
    return res.json({ success: true, bookingId: booking._id });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message || "Failed to create booking" });
  }
};

// оставить/уточнить вспомогательные ручки:

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const show = await Show.findById(showId);
    if (!show) return res.json({ success: false, message: "Show not found" });

    const occupiedSeats = Object.keys(show.occupiedSeats || {});
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const auth = req.auth?.();
    const userId = auth?.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const bookings = await Booking.find({ user: userId })
      .populate({ path: "show", populate: { path: "movie", model: "Movie" } })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
