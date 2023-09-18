import express from "express";
import cors from "cors";

const server = express();

server.use(
  cors({
    origin: process.env.LAUNCH_CORS_WEBSITE_URLS?.split(",") != null || [
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    optionsSuccessStatus: 200
  })
);

server.use(express.json());
export default server;
