import type { Period, Region, Store } from "@market/shared";
import { StoreRepository } from "../repositories/store.repository.js";
import { StateRepository } from "../repositories/state.repository.js";

export class StoreService {
  constructor(
    private storeRepository: StoreRepository,
    private stateRepository: StateRepository
  ) {}

  getStores(filters: {
    region?: Region;
    state?: string;
    period?: Period;
  }): Store[] {
    let result = [...this.storeRepository.findAll()];

    if (filters.region) {
      const regionStateCodes = this.stateRepository.getCodesByRegion(
        filters.region
      );
      result = result.filter((s) => regionStateCodes.includes(s.state));
    }

    if (filters.state) {
      result = result.filter(
        (s) => s.state.toLowerCase() === filters.state!.toLowerCase()
      );
    }

    if (filters.period && filters.period !== "all") {
      const now = new Date();
      const months = filters.period === "12m" ? 12 : 24;
      const cutoff = new Date(
        now.getFullYear(),
        now.getMonth() - months,
        now.getDate()
      );
      result = result.filter((s) => new Date(s.openDate) >= cutoff);
    }

    return result;
  }
}
