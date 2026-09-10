/* eslint-disable @typescript-eslint/no-explicit-any */
import { inventoryRepository } from "@/repositories/inventory.repository";

export class InventoryService {
  async getInventoryItems() {
    return await inventoryRepository.getAll();
  }

  async getInventoryItemById(id: string) {
    return await inventoryRepository.getById(id);
  }

  async createInventoryItem(data: any) {
    return await inventoryRepository.create(data);
  }

  async updateInventoryItem(id: string, data: any) {
    return await inventoryRepository.update(id, data);
  }

  async deleteInventoryItem(id: string) {
    return await inventoryRepository.delete(id);
  }

  // Stock Movements
  async getStockMovements() {
    return await inventoryRepository.getStockMovements();
  }

  async getStockMovementsByItemId(itemId: string) {
    return await inventoryRepository.getStockMovementsByItemId(itemId);
  }

  async createStockMovement(data: any) {
    return await inventoryRepository.createStockMovement(data);
  }
}

export const inventoryService = new InventoryService();
