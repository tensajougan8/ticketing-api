# Ticket Booking API
#### The Ticket Booking API is a RESTful API built with Node.js, TypeScript, and TypeORM. It allows users to view events, check seat availability, and book seats for events. The API uses PostgreSQL for data storage and Redis for caching seat availability.

### Features

1. View all events with basic details.

2. Check seat availability for a specific event.

3. Book one or more seats for an event.

4. Handle concurrent seat bookings to prevent double-booking.

5. Cache seat availability using Redis for improved performance.

### Tech Stack
Backend: Node.js with TypeScript

Framework: Express.js

Database: PostgreSQL

ORM: TypeORM

Caching: Redis

API Documentation: Swagger (OpenAPI)

### Setup Instructions
#### Prerequisites
1. Node.js (v16 or higher)

2. PostgreSQL

3. Redis

4. npm or yarn

#### Clone the Repository
 
``` 
$> git clone https://github.com/your-username/ticket-booking-api.git 

$> cd ticket-booking-api
```

#### Install Dependencies
```
npm install
```
#### Configure Environment Variables
Create a .env file in the root directory and add the following variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=ticket_booking
REDIS_URL=redis://localhost:6379
PORT=3000
```

#### Run Migrations
Uncomment the code lines in the migration folder

Set up the database schema by running migrations:

```
npm run migrate
```

#### Start the Server
```
npm run build
npm start
```

The API will be available at http://localhost:3000.

### API Endpoints
#### Get All Events
Endpoint: GET /events

Description: Retrieve a list of all events with basic details.

Response:
```json
[
  {
    "id": "c65a56ba-365d-46e8-acb0-2ad23cadb93d",
    "name": "World Cinema Awards",
    "datetime": "2025-03-30T13:30:00.000Z",
    "totalSeats": 220
  }
]
```

#### Get Seats for an Event
Endpoint: GET /events/:eventId/seats

Description: Retrieve seat availability for a specific event.

Response:

```json
[
  {
    "id": "68785ece-ad91-4ee1-bfc6-43880c4abdb0",
    "label": "R1S1",
    "isAvailable": true
  }
]
```
#### Book Seats
Endpoint: POST /events/:eventId/book

Description: Book one or more seats for a specific event.

Request Body:

```json
{
  "userId": "user-123",
  "seats": ["R1S1", "R1S2"]
}
```
Response:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "userId": "user-123",
  "seatLabels": ["R1S1", "R1S2"],
  "createdAt": "2023-10-01T12:00:00Z"
}
```
### Concurrency Handling
The API uses database transactions and pessimistic locking to handle concurrent seat bookings and prevent double-booking.

### Caching

Seat availability is cached using Redis to optimize read operations. The cache is invalidated whenever a booking is made.

### API Documentation
The API documentation is available with swagger.yaml


#### Docker Setup
You can run the application and its dependencies (PostgreSQL and Redis) using Docker.

### Run Migrations
```bash
npm run migrate
```
### Access the API
The API will be available at http://localhost:3000.
