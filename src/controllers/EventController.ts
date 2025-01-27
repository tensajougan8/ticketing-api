import { Request, Response } from "express";
import { EventService } from "../services/EventService";

export class EventController {
  constructor(private eventService: EventService) {}

  getEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await this.eventService.getAllEvents();
      res.json({ events });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getEventSeats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId } = req.params;
      const seats = await this.eventService.getEventSeats(eventId);
      res.json({ seats });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  bookSeats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { eventId } = req.params;
      const { userId, seats } = req.body;

      if (!userId || !seats || !Array.isArray(seats)) {
        res.status(400).json({ error: "Invalid booking request" });
        return;
      }

      const booking = await this.eventService.bookSeats(eventId, userId, seats);
      res.status(201).json({ booking });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
