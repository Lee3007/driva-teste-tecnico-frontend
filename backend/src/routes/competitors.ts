import type { FastifyInstance } from "fastify";
import { competitors } from "../data/competitors.js";
import { states } from "../data/states.js";
import type { Region } from "@market/shared";

export async function competitorsRoutes(app: FastifyInstance) {
  app.get("/api/competitors", async (request) => {
    const { state, region } = request.query as {
      state?: string;
      region?: Region;
    };

    let result = [...competitors];

    if (region) {
      const regionStateCodes = states
        .filter((s) => s.region === region)
        .map((s) => s.code);
      result = result.filter((c) => regionStateCodes.includes(c.state));
    }

    if (state) {
      result = result.filter(
        (c) => c.state.toLowerCase() === state.toLowerCase()
      );
    }

    return result;
  });
}
