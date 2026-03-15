import type { FastifyInstance } from "fastify";
import { StoreRepository } from "../repositories/store.repository.js";
import { CompetitorRepository } from "../repositories/competitor.repository.js";
import { StateRepository } from "../repositories/state.repository.js";
import { SummaryService } from "../services/summary.service.js";

const summaryService = new SummaryService(
  new StoreRepository(),
  new CompetitorRepository(),
  new StateRepository()
);

export async function summaryController(app: FastifyInstance) {
  app.get("/api/summary", async () => {
    return summaryService.getSummary();
  });
}
