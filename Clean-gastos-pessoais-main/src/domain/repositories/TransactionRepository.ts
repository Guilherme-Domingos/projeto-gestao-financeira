import {  Transaction } from '../entities/Transaction';

export interface TransactionRepository {
    findById(id: string): Promise<Transaction | null>;
    findByUserId(userId: string): Promise<Transaction[]>;
    save(transaction: Transaction): Promise<void>;
    update(transaction: Transaction): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Transaction[]>;
}