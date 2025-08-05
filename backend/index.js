import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import systemRoutes from "./routes/system.js";
import developerRoutes from "./routes/developer.js";
import challengeRoutes from "./routes/challenge.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", systemRoutes);
app.use("/api", developerRoutes);
app.use("/api", challengeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
