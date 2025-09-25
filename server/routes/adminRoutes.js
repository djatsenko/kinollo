import express from "express";
import { isAdmin, getDashboardData, getAllShows, getAllBookings } from "../controllers/adminController.js";

const router = express.Router();

router.get("/is-admin", isAdmin);
router.get("/dashboard", getDashboardData);
router.get("/shows", getAllShows);          // <-- ВАЖНО: /shows
router.get("/list-bookings", getAllBookings);

export default router;
