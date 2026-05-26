import { Router } from "express";

export const adminRouter = Router();

adminRouter.get("/overview", (_request, response) => {
  response.json({
    data: {
      totalProjects: 1284,
      aiGenerationsToday: 8940,
      deploymentsQueued: 27,
      marketplaceSubmissions: 113,
      planMix: {
        free: 820,
        pro: 329,
        enterprise: 135,
      },
    },
  });
});
