import { Queue } from "bullmq";
import IORedis from "ioredis";
import { env } from "../config/env";

const connection = new IORedis(env.redisUrl, { maxRetriesPerRequest: null });

export const buildQueue = new Queue("buildforge-builds", { connection });
export const deploymentQueue = new Queue("buildforge-deployments", { connection });
