import type { FastifyInstance } from "fastify";
import { ExpansionRepository } from "../repositories/expansion.repository.js";
import { ExpansionService } from "../services/expansion.service.js";

const expansionService = new ExpansionService(new ExpansionRepository());

export async function expansionController(app: FastifyInstance) {
  app.get("/api/expansion-zones", async (request) => {
    const { priority } = request.query as { priority?: string };
    return expansionService.getExpansionZones(priority);
  });
}
