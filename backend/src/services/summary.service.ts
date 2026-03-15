import type { Summary } from "@market/shared";
import { StoreRepository } from "../repositories/store.repository.js";
import { CompetitorRepository } from "../repositories/competitor.repository.js";
import { StateRepository } from "../repositories/state.repository.js";

export class SummaryService {
  constructor(
    private storeRepository: StoreRepository,
    private competitorRepository: CompetitorRepository,
    private stateRepository: StateRepository
  ) {}

  getSummary(): Summary {
    const stores = this.storeRepository.findAll();
    const states = this.stateRepository.findAll();
    const competitors = this.competitorRepository.findAll();

    const statesCovered = new Set(stores.map((s) => s.state)).size;
    const totalRevenue = stores.reduce((sum, s) => sum + s.revenue, 0);

    return {
      totalStores: stores.length,
      statesCovered,
      statesUncovered: states.length - statesCovered,
      totalRevenue,
      totalCompetitors: competitors.length,
    };
  }
}
