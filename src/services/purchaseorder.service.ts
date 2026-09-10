/* eslint-disable @typescript-eslint/no-explicit-any */
import { purchaseorderRepository } from "@/repositories/purchaseorder.repository";

export class PurchaseOrderService {
  async getPurchaseOrders() {
    return await purchaseorderRepository.getAll();
  }

  async getPurchaseOrderById(id: string) {
    return await purchaseorderRepository.getById(id);
  }

  async createPurchaseOrder(data: any) {
    return await purchaseorderRepository.create(data);
  }

  async updatePurchaseOrder(id: string, data: any) {
    return await purchaseorderRepository.update(id, data);
  }

  async deletePurchaseOrder(id: string) {
    return await purchaseorderRepository.delete(id);
  }

  // Items
  async getPurchaseOrderItems(poId: string) {
    return await purchaseorderRepository.getItemsByPoId(poId);
  }

  async createPurchaseOrderItem(data: any) {
    return await purchaseorderRepository.createItem(data);
  }

  async deletePurchaseOrderItem(id: string) {
    return await purchaseorderRepository.deleteItem(id);
  }
}

export const purchaseorderService = new PurchaseOrderService();
