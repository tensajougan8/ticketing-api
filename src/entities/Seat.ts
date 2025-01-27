import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Event } from "./Event";

@Entity("seats")
export class Seat {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  label?: string;

  @Column("boolean", { default: true })
  isAvailable!: boolean;

  @ManyToOne(() => Event, (event) => event.seats)
  event!: Event;
}
