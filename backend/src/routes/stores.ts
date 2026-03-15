import type { FastifyInstance } from "fastify";
import { stores } from "../data/stores.js";
import { states } from "../data/states.js";
import type { Period, Region } from "@market/shared";

export async function storesRoutes(app: FastifyInstance) {
  app.get("/api/stores", async (request) => {
    const { region, state, period } = request.query as {
      region?: Region;
      state?: string;
      period?: Period;
    };

    let result = [...stores];

    if (region) {
      const regionStateCodes = states
        .filter((s) => s.region === region)
        .map((s) => s.code);
      result = result.filter((s) => regionStateCodes.includes(s.state));
    }

    if (state) {
      result = result.filter(
        (s) => s.state.toLowerCase() === state.toLowerCase()
      );
    }

    if (period && period !== "all") {
      const now = new Date();
      const months = period === "12m" ? 12 : 24;
      const cutoff = new Date(now.getFullYear(), now.getMonth() - months, now.getDate());
      result = result.filter((s) => new Date(s.openDate) >= cutoff);
    }

    return result;
  });
}
