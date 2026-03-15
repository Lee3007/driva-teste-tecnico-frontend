import type { DemandData } from "@market/shared";
import { demandData } from "../data/demand.js";

export class DemandRepository {
  findAll(): DemandData[] {
    return demandData;
  }
}
