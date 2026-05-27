import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { healthRouter } from "./routes/health.js";
import { projectsRouter } from "./routes/projects.js";
import { generationRouter } from "./routes/generation.js";
import { deploymentsRouter } from "./routes/deployments.js";
import { adminRouter } from "./routes/admin.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "2mb" }));
  app.use(morgan("dev"));

  app.get("/", (_request, response) => {
    response.json({
      name: "BuildForge API",
      version: "0.1.0",
      docs: "/api/v1/health",
    });
  });

  app.use("/api/v1/health", healthRouter);
  app.use("/api/v1/projects", projectsRouter);
  app.use("/api/v1/generate", generationRouter);
  app.use("/api/v1/deployments", deploymentsRouter);
  app.use("/api/v1/admin", adminRouter);

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error(error);
    response.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error",
    });
  });

  return app;
}
