import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import transactionsRoutes from "./routes/transactions.js";
import uploadRoutes from "./routes/uploads.js";
import adminRoutes from "./routes/admin.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import helmet from "helmet";
import morgan from "morgan";
import { swaggerSpec } from "./utils/swagger.js";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api", (req, res) => {
  res.send("API is running... 😊");
});

// server frontend in production

if (process.env.NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // serve index.html for all unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.statusCode = 404;
  next(error);
});

// Error handler
app.use(errorHandler);

// connect database
const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
