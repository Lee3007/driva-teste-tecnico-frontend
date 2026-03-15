import type { Region, State } from "@market/shared";
import { states } from "../data/states.js";

export class StateRepository {
  findAll(): State[] {
    return states;
  }

  findByCode(code: string): State | undefined {
    return states.find((s) => s.code.toLowerCase() === code.toLowerCase());
  }

  findByRegion(region: Region): State[] {
    return states.filter((s) => s.region === region);
  }

  getCodesByRegion(region: Region): string[] {
    return states.filter((s) => s.region === region).map((s) => s.code);
  }
}
