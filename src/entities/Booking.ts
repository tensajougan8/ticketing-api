import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Event } from "./Event";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column("text", { array: true })
  seatLabels?: string[];

  @ManyToOne(() => Event)
  event?: Event;

  @Column("timestamp")
  createdAt?: Date;
}
