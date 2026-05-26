import { createServer } from "node:http";
import { Server } from "socket.io";
import { App } from "./app.js";
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
