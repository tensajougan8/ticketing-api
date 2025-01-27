import { DataSource, Repository } from "typeorm";
import { Event } from "../entities/Event";
import { Seat } from "../entities/Seat";
import { Booking } from "../entities/Booking";
import { RedisCache } from "../utils/RedisCache";
import { stringify } from "querystring";

export class EventService {
  private eventRepository: Repository<Event>;
  private seatRepository: Repository<Seat>;
  private bookingRepository: Repository<Booking>;
  private redisCache: RedisCache;

  constructor(private dataSource: DataSource) {
    this.eventRepository = this.dataSource.getRepository(Event);
    this.seatRepository = this.dataSource.getRepository(Seat);
    this.bookingRepository = this.dataSource.getRepository(Booking);
    this.redisCache = new RedisCache();
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find({
      select: ["id", "name", "datetime", "totalSeats"],
    });
  }

  async getEventSeats(eventId: string): Promise<Seat[]> {
    const cacheKey = `event_seats:${eventId}`;

    const cachedSeats = await this.redisCache.get(cacheKey);
    if (cachedSeats) return JSON.parse(cachedSeats);

    const seats = await this.seatRepository.find({
      where: { event: { id: eventId } },
      relations: ["event"],
    });

    await this.redisCache.set(cacheKey, JSON.stringify(seats), 300);

    return seats;
  }

  async bookSeats(
    eventId: string,
    userId: string,
    seatLabels: string[]
  ): Promise<Booking> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      // Log requested seat labels
      console.log("Requested seat labels:", seatLabels);

      // Fetch seats
      const seats = await transactionalEntityManager
        .getRepository(Seat)
        .createQueryBuilder("seat")
        .where("seat.label IN (:...seatLabels)", { seatLabels })
        .andWhere("seat.isAvailable = true")
        .andWhere("seat.eventId = :eventId", { eventId }) // Add this line
        .setLock("pessimistic_write")
        .getMany();

      // Log fetched seats
      console.log("Fetched seats:", seats);

      // Check if all requested seats are available
      if (seats.length !== seatLabels.length) {
        const unavailableSeats = seatLabels.filter(
          (label) => !seats.some((seat) => seat.label === label)
        );
        console.log("Unavailable seats:", unavailableSeats);
        throw new Error("Some seats are already booked");
      }

      // Mark seats as booked
      await transactionalEntityManager
        .createQueryBuilder()
        .update(Seat)
        .set({ isAvailable: false })
        .where("id IN (:...seatIds)", { seatIds: seats.map((seat) => seat.id) })
        .execute();

      // Fetch the event
      const event = await transactionalEntityManager.findOne(Event, {
        where: { id: eventId },
      });

      if (!event) {
        throw new Error("Event not found");
      }
console.log(seatLabels)
      // Create a new booking
      const booking = new Booking();
      booking.userId = userId;
      booking.seatLabels = Array.isArray(seatLabels)
        ? seatLabels
        : [seatLabels];;
      booking.event = event;
      booking.createdAt = new Date();
      console.log(JSON.stringify(booking));

      // Save the booking
      const savedBooking = await transactionalEntityManager.save(booking);

      // Invalidate cache
      await this.redisCache.del(`event_seats:${eventId}`);

      return savedBooking;
    });
  }
}
