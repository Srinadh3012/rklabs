/* eslint-disable @typescript-eslint/no-explicit-any */
import { customerRepository } from "@/repositories/customer.repository";

export class CustomerService {
  async getCustomers() {
    return await customerRepository.getAll();
  }

  async getCustomerById(id: string) {
    return await customerRepository.getById(id);
  }

  async getCustomerByProfileId(profileId: string) {
    return await customerRepository.getByProfileId(profileId);
  }

  async createCustomer(data: any) {
    return await customerRepository.create(data);
  }

  async updateCustomer(id: string, data: any) {
    return await customerRepository.update(id, data);
  }

  async deleteCustomer(id: string) {
    return await customerRepository.delete(id);
  }
}

export const customerService = new CustomerService();
