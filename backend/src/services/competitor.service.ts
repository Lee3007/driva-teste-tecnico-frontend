import type { Competitor, Region } from "@market/shared";
import { CompetitorRepository } from "../repositories/competitor.repository.js";
import { StateRepository } from "../repositories/state.repository.js";

export class CompetitorService {
  constructor(
    private competitorRepository: CompetitorRepository,
    private stateRepository: StateRepository
  ) {}

  getCompetitors(filters: {
    state?: string;
    region?: Region;
  }): Competitor[] {
    let result = [...this.competitorRepository.findAll()];

    if (filters.region) {
      const regionStateCodes = this.stateRepository.getCodesByRegion(
        filters.region
      );
      result = result.filter((c) => regionStateCodes.includes(c.state));
    }

    if (filters.state) {
      result = result.filter(
        (c) => c.state.toLowerCase() === filters.state!.toLowerCase()
      );
    }

    return result;
  }
}
