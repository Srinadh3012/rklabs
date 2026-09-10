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
}

export const purchaseorderService = new PurchaseOrderService();
