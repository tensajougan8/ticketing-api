// import { MigrationInterface, QueryRunner } from "typeorm";

// export class SeedExtendedEventData1701234567892 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`
//             INSERT INTO events (id, name, datetime, "totalSeats") VALUES 
//             (
//                 uuid_generate_v4(), 
//                 'Summer Music Festival', 
//                 '2024-07-15 19:00:00', 
//                 200
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'Broadway Musical Night', 
//                 '2024-08-20 20:00:00', 
//                 150
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'Comedy Show Extravaganza', 
//                 '2024-09-10 18:30:00', 
//                 100
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'International Jazz Concert', 
//                 '2024-10-05 21:00:00', 
//                 180
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'Tech Innovation Summit', 
//                 '2024-11-15 09:00:00', 
//                 250
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'Classical Orchestra Performance', 
//                 '2024-12-22 19:30:00', 
//                 120
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'Electronic Dance Music Night', 
//                 '2025-01-18 23:00:00', 
//                 300
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'Shakespeare Theater Festival', 
//                 '2025-02-14 20:00:00', 
//                 160
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'World Cinema Awards', 
//                 '2025-03-30 19:00:00', 
//                 220
//             ),
//             (
//                 uuid_generate_v4(), 
//                 'Stand-up Comedy Marathon', 
//                 '2025-04-25 18:00:00', 
//                 140
//             )
//         `);

//      await queryRunner.query(`
//             WITH events_cte AS (
//                 SELECT id FROM events
//             )
//             INSERT INTO seats ("eventId", label, "isAvailable")
//             SELECT 
//                 e.id, 
//                 'R' || (row_num / 10 + 1)::text || 
//                 'S' || (row_num % 10 + 1)::text,
//                 true
//             FROM events_cte e, 
//             generate_series(0, 299) AS row_num
//         `);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`DELETE FROM seats`);
//         await queryRunner.query(`DELETE FROM events`);
//     }
// }
