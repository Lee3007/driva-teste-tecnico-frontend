import type { FastifyInstance } from "fastify";
import type { Region } from "@market/shared";
import { StateRepository } from "../repositories/state.repository.js";
import { DemandRepository } from "../repositories/demand.repository.js";
import { DemandService } from "../services/demand.service.js";

const demandService = new DemandService(
  new DemandRepository(),
  new StateRepository()
);

export async function demandController(app: FastifyInstance) {
  app.get("/api/demand", async (request) => {
    const { region } = request.query as { region?: Region };
    return demandService.getDemand(region);
  });
}
