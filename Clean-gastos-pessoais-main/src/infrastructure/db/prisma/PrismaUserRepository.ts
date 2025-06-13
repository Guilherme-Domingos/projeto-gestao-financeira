import { PrismaClient } from "@prisma/client";
import { User, UserProps } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {    
      async findById(id: string): Promise<User | null> {
        const user = await prisma.usuario.findUnique({
            where: { id },
        });
        return user ? User.fromPersistentData({ id: user.id, name: user.nome, email: user.email, password: user.senha } as UserProps) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.usuario.findUnique({
            where: { email },
        });
        return user ? User.fromPersistentData({id: user.id, name: user.nome, email: user.email, password: user.senha } as UserProps) : null;
    }

    async save(user: User): Promise<void> {
        await prisma.usuario.create({
            data: {
                id: user.id,
                nome: user.name,
                email: user.email,
                senha: user.password,
            }
        });
    }    
    
    async update(user: User): Promise<void> {
        await prisma.usuario.update({
            where: { id: user.id },
            data: {
                nome: user.name,
                email: user.email,
                senha: user.password
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.usuario.delete({
            where: { id },
        });
    }    
    
    async findAll(): Promise<User[]> {
        const users = await prisma.usuario.findMany();
        return users.map(user => {
            return User.fromPersistentData({ 
                id: user.id, 
                name: user.nome, 
                email: user.email
            } as UserProps);
        });
    }
}