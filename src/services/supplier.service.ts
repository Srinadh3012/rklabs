import { supplierRepository } from "@/repositories/supplier.repository";

export class SupplierService {
  async getSuppliers() {
    return await supplierRepository.getAll();
  }

  async getSupplierById(id: string) {
    return await supplierRepository.getById(id);
  }

  async createSupplier(data: any) {
    return await supplierRepository.create(data);
  }

  async updateSupplier(id: string, data: any) {
    return await supplierRepository.update(id, data);
  }

  async deleteSupplier(id: string) {
    return await supplierRepository.delete(id);
  }
}

export const supplierService = new SupplierService();
