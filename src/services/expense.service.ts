/* eslint-disable @typescript-eslint/no-explicit-any */
import { expenseRepository } from "@/repositories/expense.repository";

export class ExpenseService {
  async getExpenses() {
    return await expenseRepository.getAll();
  }

  async getExpenseById(id: string) {
    return await expenseRepository.getById(id);
  }

  async createExpense(data: any) {
    return await expenseRepository.create(data);
  }

  async updateExpense(id: string, data: any) {
    return await expenseRepository.update(id, data);
  }

  async deleteExpense(id: string) {
    return await expenseRepository.delete(id);
  }
}

export const expenseService = new ExpenseService();
