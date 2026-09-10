/* eslint-disable @typescript-eslint/no-explicit-any */
import { invoiceRepository } from "@/repositories/invoice.repository";

export class InvoiceService {
  async getInvoices() {
    return await invoiceRepository.getAll();
  }

  async getInvoiceById(id: string) {
    return await invoiceRepository.getById(id);
  }

  async createInvoice(data: any) {
    return await invoiceRepository.create(data);
  }

  async updateInvoice(id: string, data: any) {
    return await invoiceRepository.update(id, data);
  }

  async deleteInvoice(id: string) {
    return await invoiceRepository.delete(id);
  }
}

export const invoiceService = new InvoiceService();
