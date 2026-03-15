import type { FastifyInstance } from "fastify";
import { demandData } from "../data/demand.js";
import { states } from "../data/states.js";
import type { Region } from "@market/shared";

export async function demandRoutes(app: FastifyInstance) {
  app.get("/api/demand", async (request) => {
    const { region } = request.query as { region?: Region };

    if (region) {
      const regionStateCodes = states
        .filter((s) => s.region === region)
        .map((s) => s.code);
      return demandData.filter((d) => regionStateCodes.includes(d.stateCode));
    }

    return demandData;
  });
}
