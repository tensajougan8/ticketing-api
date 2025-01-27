// import { MigrationInterface, QueryRunner } from "typeorm";

// export class CreateEventSchema1701234567890 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`
//             CREATE TABLE events (
//                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//                 name VARCHAR(255) NOT NULL,
//                 datetime TIMESTAMP NOT NULL,
//                 "totalSeats" INTEGER NOT NULL
//             )
//         `);

//     await queryRunner.query(`
//             CREATE TABLE seats (
//                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//                 label VARCHAR(10) NOT NULL,
//                 "isAvailable" BOOLEAN DEFAULT TRUE,
//                 "eventId" UUID REFERENCES events(id)
//             )
//         `);

//     await queryRunner.query(`
//             CREATE TABLE bookings (
//                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//                 "userId" VARCHAR(255) NOT NULL,
//                 "seatLabels" TEXT[] NOT NULL,
//                 "eventId" UUID REFERENCES events(id),
//                 "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             )
//         `);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`DROP TABLE bookings`);
//     await queryRunner.query(`DROP TABLE seats`);
//     await queryRunner.query(`DROP TABLE events`);
//   }
// }
