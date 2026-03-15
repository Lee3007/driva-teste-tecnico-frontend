import type { ExpansionZone } from "@market/shared";
import { ExpansionRepository } from "../repositories/expansion.repository.js";

export class ExpansionService {
  constructor(private expansionRepository: ExpansionRepository) {}

  getExpansionZones(priority?: string): ExpansionZone[] {
    if (priority) {
      return this.expansionRepository
        .findAll()
        .filter((z) => z.priority === priority);
    }
    return this.expansionRepository.findAll();
  }
}
