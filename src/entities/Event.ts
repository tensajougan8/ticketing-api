import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Seat } from "./Seat";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column("timestamp")
  datetime?: Date;

  @Column("int")
  totalSeats?: number;

  @OneToMany(() => Seat, (seat) => seat.event)
  seats!: Seat[];
}
