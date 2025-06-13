import { Category } from '../entities/Category';

export interface CategoryRepository {
    findById(id: number): Promise<Category | null>;
    findByUserId(userId: string): Promise<Category[]>;
    save(category: Category): Promise<void>;
    update(category: Category): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Category[]>;
}