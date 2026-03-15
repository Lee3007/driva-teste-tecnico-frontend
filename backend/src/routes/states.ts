import type { FastifyInstance } from "fastify";
import { states } from "../data/states.js";
import type { Region } from "@market/shared";

export async function statesRoutes(app: FastifyInstance) {
  app.get("/api/states", async (request) => {
    const { region } = request.query as { region?: Region };
    if (region) {
      return states.filter((s) => s.region === region);
    }
    return states;
  });

  app.get("/api/states/:code", async (request, reply) => {
    const { code } = request.params as { code: string };
    const state = states.find(
      (s) => s.code.toLowerCase() === code.toLowerCase()
    );
    if (!state) {
      return reply.status(404).send({ error: "State not found" });
    }
    return state;
  });
}
