import { DataSource } from "typeorm";
import { Event } from "../entities/Event";
import { Seat } from "../entities/Seat";
import { Booking } from "../entities/Booking";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "ticket_booking",
  entities: [Event, Seat, Booking],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
  logging: true,
});

export { AppDataSource };
