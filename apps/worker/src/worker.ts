import dotenv from "dotenv";
import { Worker } from "bullmq";
import IORedis from "ioredis";

dotenv.config();

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const buildWorker = new Worker(
  "buildforge-builds",
  async (job) => {
    console.log(`Processing build job ${job.id}`, job.data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { status: "generated" };
  },
  { connection }
);

const deploymentWorker = new Worker(
  "buildforge-deployments",
  async (job) => {
    console.log(`Processing deployment job ${job.id}`, job.data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { status: "deployed" };
  },
  { connection }
);

buildWorker.on("completed", (job) => {
  console.log(`Build job ${job.id} completed`);
});

deploymentWorker.on("completed", (job) => {
  console.log(`Deployment job ${job.id} completed`);
});

console.log("BuildForge workers are online");
