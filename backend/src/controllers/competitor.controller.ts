import type { FastifyInstance } from "fastify";
import type { Region } from "@market/shared";
import { StateRepository } from "../repositories/state.repository.js";
import { CompetitorRepository } from "../repositories/competitor.repository.js";
import { CompetitorService } from "../services/competitor.service.js";

const competitorService = new CompetitorService(
  new CompetitorRepository(),
  new StateRepository()
);

export async function competitorController(app: FastifyInstance) {
  app.get("/api/competitors", async (request) => {
    const { state, region } = request.query as {
      state?: string;
      region?: Region;
    };
    return competitorService.getCompetitors({ state, region });
  });
}
