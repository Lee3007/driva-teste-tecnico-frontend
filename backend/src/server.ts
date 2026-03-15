import Fastify from "fastify";
import cors from "@fastify/cors";
import { stateController } from "./controllers/state.controller.js";
import { storeController } from "./controllers/store.controller.js";
import { competitorController } from "./controllers/competitor.controller.js";
import { demandController } from "./controllers/demand.controller.js";
import { expansionController } from "./controllers/expansion.controller.js";
import { summaryController } from "./controllers/summary.controller.js";

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: "*" });
await fastify.register(stateController);
await fastify.register(storeController);
await fastify.register(competitorController);
await fastify.register(demandController);
await fastify.register(expansionController);
await fastify.register(summaryController);

fastify.get("/api/health", async () => {
  return { status: "ok" };
});

const port = Number(process.env.PORT) || 8000;

try {
  await fastify.listen({ port, host: "::" });
  console.log(`Server running on port ${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
