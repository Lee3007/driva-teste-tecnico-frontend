import type { DemandData, Region } from "@market/shared";
import { DemandRepository } from "../repositories/demand.repository.js";
import { StateRepository } from "../repositories/state.repository.js";

export class DemandService {
  constructor(
    private demandRepository: DemandRepository,
    private stateRepository: StateRepository
  ) {}

  getDemand(region?: Region): DemandData[] {
    if (region) {
      const regionStateCodes = this.stateRepository.getCodesByRegion(region);
      return this.demandRepository
        .findAll()
        .filter((d) => regionStateCodes.includes(d.stateCode));
    }
    return this.demandRepository.findAll();
  }
}
