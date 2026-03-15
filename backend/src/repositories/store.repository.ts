import type { Store } from "@market/shared";
import { stores } from "../data/stores.js";

export class StoreRepository {
  findAll(): Store[] {
    return stores;
  }
}
