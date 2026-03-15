import type { FastifyInstance } from "fastify";
import { stores } from "../data/stores.js";
import { competitors } from "../data/competitors.js";
import { states } from "../data/states.js";

export async function summaryRoutes(app: FastifyInstance) {
  app.get("/api/summary", async () => {
    const statesCovered = new Set(stores.map((s) => s.state)).size;
    const totalRevenue = stores.reduce((sum, s) => sum + s.revenue, 0);

    return {
      totalStores: stores.length,
      statesCovered,
      statesUncovered: states.length - statesCovered,
      totalRevenue,
      totalCompetitors: competitors.length,
    };
  });
}
