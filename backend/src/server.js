import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: env.clientUrl.split(",").map(v => v.trim()) }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "movie-discovery-api" });
});

app.use("/api/movies", movieRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Backend running at http://localhost:${env.port}`);
    });
  })
  .catch(error => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
