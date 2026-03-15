import type { ExpansionZone } from "@market/shared";
import { expansionZones } from "../data/expansion-zones.js";

export class ExpansionRepository {
  findAll(): ExpansionZone[] {
    return expansionZones;
  }
}
