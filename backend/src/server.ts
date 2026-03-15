import Fastify from "fastify";
import cors from "@fastify/cors";
import { statesRoutes } from "./routes/states.js";
import { storesRoutes } from "./routes/stores.js";
import { competitorsRoutes } from "./routes/competitors.js";
import { demandRoutes } from "./routes/demand.js";
import { expansionRoutes } from "./routes/expansion.js";
import { summaryRoutes } from "./routes/summary.js";

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: "*" });
await fastify.register(statesRoutes);
await fastify.register(storesRoutes);
await fastify.register(competitorsRoutes);
await fastify.register(demandRoutes);
await fastify.register(expansionRoutes);
await fastify.register(summaryRoutes);

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
