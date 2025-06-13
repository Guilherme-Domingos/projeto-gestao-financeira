import { PrismaClient } from "@prisma/client";
import { Transaction, TransactionProps } from "../../../domain/entities/Transaction";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";

const prisma = new PrismaClient();

export class PrismaTransactionRepository implements TransactionRepository {
    async findById(id: string): Promise<Transaction | null> {
        const transaction = await prisma.transacao.findUnique({
            where: { id },
            include: {
                categoria: true
            }
        });
        if (!transaction) return null;
        
        return Transaction.fromPersistentData({
            id: transaction.id,
            date: transaction.data,
            amount: Number(transaction.valor),
            description: transaction.descricao ?? undefined,
            type: transaction.tipo,
            sender: transaction.remetente ?? undefined,
            userId: transaction.usuarioId,
            categoryId: transaction.categoriaId ?? undefined
        });
    }

    async findByUserId(userId: string): Promise<Transaction[]> {
        const transactions = await prisma.transacao.findMany({
            where: { usuarioId: userId },
            include: {
                categoria: true
            }
        });
        
        return transactions.map(transaction => Transaction.fromPersistentData({
            id: transaction.id,
            date: transaction.data,
            amount: Number(transaction.valor),
            description: transaction.descricao ?? undefined,
            type: transaction.tipo,
            sender: transaction.remetente ?? undefined,
            userId: transaction.usuarioId,
            categoryId: transaction.categoriaId ?? undefined
        }));
    }

    async save(transaction: Transaction): Promise<void> {
        await prisma.transacao.create({
            data: {
                id: transaction.id,
                data: transaction.date,
                valor: transaction.amount,
                descricao: transaction.description,
                tipo: transaction.type,
                remetente: transaction.sender,
                usuarioId: transaction.userId,
                categoriaId: transaction.categoryId,
            }
        });
    }

    async update(transaction: Transaction): Promise<void> {
        await prisma.transacao.update({
            where: { id: transaction.id },
            data: {
                data: transaction.date,
                valor: transaction.amount,
                descricao: transaction.description,
                tipo: transaction.type,
                remetente: transaction.sender,
                categoriaId: transaction.categoryId,
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.transacao.delete({
            where: { id }
        });
    }

    async findAll(): Promise<Transaction[]> {
        const transactions = await prisma.transacao.findMany({
            include: {
                categoria: true
            }
        });
        
        return transactions.map(transaction => Transaction.fromPersistentData({
            id: transaction.id,
            date: transaction.data,
            amount: Number(transaction.valor),
            description: transaction.descricao ?? undefined,
            type: transaction.tipo,
            sender: transaction.remetente ?? undefined,
            userId: transaction.usuarioId,
            categoryId: transaction.categoriaId ?? undefined
        }));
    }
}