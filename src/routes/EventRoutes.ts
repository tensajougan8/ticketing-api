import express from "express";
import { EventController } from "../controllers/EventController";
import { EventService } from "../services/EventService";
import { AppDataSource } from "../utils/db";

const router = express.Router();
const eventService = new EventService(AppDataSource);
const eventController = new EventController(eventService);

router.get("/", eventController.getEvents);
router.get("/:eventId/seats", eventController.getEventSeats);
router.post("/:eventId/book", eventController.bookSeats);

export { router as eventRoutes };
