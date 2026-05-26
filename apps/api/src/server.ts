import { createServer } from "node:http";
import { Server } from "socket.io";
import { createApp } from "./app";
import { env } from "./config/env";
import { registerCollaboration } from "./socket/collaboration";

const app = createApp();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

registerCollaboration(io);

httpServer.listen(env.port, () => {
  console.log(`BuildForge API listening on http://localhost:${env.port}`);
});
