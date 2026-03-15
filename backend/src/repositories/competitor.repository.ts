import type { Competitor } from "@market/shared";
import { competitors } from "../data/competitors.js";

export class CompetitorRepository {
  findAll(): Competitor[] {
    return competitors;
  }
}
