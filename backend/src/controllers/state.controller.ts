import type { FastifyInstance } from "fastify";
import type { Region } from "@market/shared";
import { StateRepository } from "../repositories/state.repository.js";
import { StateService } from "../services/state.service.js";

const stateService = new StateService(new StateRepository());

export async function stateController(app: FastifyInstance) {
  app.get("/api/states", async (request) => {
    const { region } = request.query as { region?: Region };
    return stateService.getStates(region);
  });

  app.get("/api/states/:code", async (request, reply) => {
    const { code } = request.params as { code: string };
    const state = stateService.getStateByCode(code);
    if (!state) {
      return reply.status(404).send({ error: "State not found" });
    }
    return state;
  });
}
