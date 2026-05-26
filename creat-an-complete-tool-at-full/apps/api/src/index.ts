import "dotenv/config";
import { buildApp } from "./app";

async function main() {
  const app = buildApp();
  const port = Number(process.env.PORT ?? 4010);
  const host = "127.0.0.1";

  try {
    await app.listen({ port, host });
    app.log.info(`EVONA API listening on http://${host}:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void main();
