import express from "express";
import { AppDataSource } from "./utils/db";
import { eventRoutes } from "./routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/events", eventRoutes);
app.use(cors());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Initialize DataSource and start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
