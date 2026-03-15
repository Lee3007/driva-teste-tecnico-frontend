import type { Region, State } from "@market/shared";
import { StateRepository } from "../repositories/state.repository.js";

export class StateService {
  constructor(private stateRepository: StateRepository) {}

  getStates(region?: Region): State[] {
    if (region) {
      return this.stateRepository.findByRegion(region);
    }
    return this.stateRepository.findAll();
  }

  getStateByCode(code: string): State | undefined {
    return this.stateRepository.findByCode(code);
  }
}
