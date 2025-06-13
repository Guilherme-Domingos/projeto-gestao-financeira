import { MonthlyGoal } from "../entities/MonthlyGoal";

export interface MonthlyGoalRepository {
    findById(id: string): Promise<MonthlyGoal | null>;
    findByUserId(userId: string): Promise<MonthlyGoal[]>;
    save(monthlyGoal: MonthlyGoal): Promise<void>;
    update(monthlyGoal: MonthlyGoal): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<MonthlyGoal[]>;
}