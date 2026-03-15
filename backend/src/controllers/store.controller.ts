import type { FastifyInstance } from "fastify";
import type { Period, Region } from "@market/shared";
import { StateRepository } from "../repositories/state.repository.js";
import { StoreRepository } from "../repositories/store.repository.js";
import { StoreService } from "../services/store.service.js";

const storeService = new StoreService(
  new StoreRepository(),
  new StateRepository()
);

export async function storeController(app: FastifyInstance) {
  app.get("/api/stores", async (request) => {
    const { region, state, period } = request.query as {
      region?: Region;
      state?: string;
      period?: Period;
    };
    return storeService.getStores({ region, state, period });
  });
}
