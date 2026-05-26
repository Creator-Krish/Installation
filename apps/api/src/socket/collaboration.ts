import type { Server } from "socket.io";

export function registerCollaboration(io: Server) {
  io.on("connection", (socket) => {
    socket.on("project:join", (projectId: string) => {
      socket.join(projectId);
      socket.emit("presence:joined", { projectId, userId: socket.id });
    });

    socket.on("editor:update", (payload: { projectId: string; componentId: string; changes: Record<string, unknown> }) => {
      socket.to(payload.projectId).emit("editor:remote-update", payload);
    });

    socket.on("cursor:move", (payload: { projectId: string; x: number; y: number }) => {
      socket.to(payload.projectId).emit("cursor:remote-move", { userId: socket.id, ...payload });
    });
  });
}
