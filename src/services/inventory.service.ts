import { inventoryRepository } from "@/repositories/inventory.repository";

export class InventoryService {
  async getInventorys() {
    return await inventoryRepository.getAll();
  }

  async getInventoryById(id: string) {
    return await inventoryRepository.getById(id);
  }

  async createInventory(data: any) {
    return await inventoryRepository.create(data);
  }

  async updateInventory(id: string, data: any) {
    return await inventoryRepository.update(id, data);
  }

  async deleteInventory(id: string) {
    return await inventoryRepository.delete(id);
  }
}

export const inventoryService = new InventoryService();
