import type { FastifyInstance } from "fastify";
import { expansionZones } from "../data/expansion-zones.js";

export async function expansionRoutes(app: FastifyInstance) {
  app.get("/api/expansion-zones", async (request) => {
    const { priority } = request.query as { priority?: string };

    if (priority) {
      return expansionZones.filter((z) => z.priority === priority);
    }

    return expansionZones;
  });
}
