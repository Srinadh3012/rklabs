import { repairRepository } from "@/repositories/repair.repository";

export class RepairService {
  async getRepairs() {
    return await repairRepository.getAll();
  }

  async getRepairById(id: string) {
    return await repairRepository.getById(id);
  }

  async createRepair(data: any) {
    return await repairRepository.create(data);
  }

  async updateRepair(id: string, data: any) {
    return await repairRepository.update(id, data);
  }

  async deleteRepair(id: string) {
    return await repairRepository.delete(id);
  }
}

export const repairService = new RepairService();
