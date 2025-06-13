import { PrismaClient } from "@prisma/client";
import { Category, CategoryProps } from "../../../domain/entities/Category";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";

const prisma = new PrismaClient();

export class PrismaCategoryRepository implements CategoryRepository {
    
    async findById(id: number): Promise<Category | null> {
        const category = await prisma.categoria.findUnique({
            where: { id },
        });
        
        return category 
            ? Category.fromPersistentData({ 
                id: category.id, 
                name: category.nome, 
                userId: category.usuarioId 
            } as CategoryProps) 
            : null;
    }

    async findByUserId(userId: string): Promise<Category[]> {
        const categories = await prisma.categoria.findMany({
            where: { usuarioId: userId },
        });
        
        return categories.map(category => 
            Category.fromPersistentData({ 
                id: category.id, 
                name: category.nome, 
                userId: category.usuarioId 
            } as CategoryProps)
        );
    }

    async save(category: Category): Promise<void> {
        await prisma.categoria.create({
            data: {
                nome: category.name,
                usuarioId: category.userId,
            }
        });
    }

    async update(category: Category): Promise<void> {
        await prisma.categoria.update({
            where: { id: category.id },
            data: {
                nome: category.name,
            },
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.categoria.delete({
            where: { id },
        });
    }

    async findAll(): Promise<Category[]> {
        const categories = await prisma.categoria.findMany();
        
        return categories.map(category => 
            Category.fromPersistentData({ 
                id: category.id, 
                name: category.nome, 
                userId: category.usuarioId 
            } as CategoryProps)
        );
    }
}