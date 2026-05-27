import { createServer } from "node:http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { registerCollaboration } from "./socket/collaboration.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

registerCollaboration(io);

httpServer.listen(env.port, "0.0.0.0", () => {
  console.log(`BuildForge API listening on http://0.0.0.0:${env.port}`);
});
