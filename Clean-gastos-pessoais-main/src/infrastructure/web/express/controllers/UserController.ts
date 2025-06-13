import { Request, Response } from 'express';
import { CreateUser } from '../../../../application/useCases/User/CreateUser';
import { ListUsers } from '../../../../application/useCases/User/ListUsers';
import { DeleteUser } from '../../../../application/useCases/User/DeleteUser';
import { UpdateUser } from '../../../../application/useCases/User/UpdateUser';
import { FindUser } from '../../../../application/useCases/User/FindUser';

export class UserController {
    constructor(
        private createUser: CreateUser,
        private listUsers: ListUsers,
        private deleteUser: DeleteUser,
        private updateUser: UpdateUser,
        private findUser: FindUser
    ) {}

    public async handleCreateUser(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            const user = await this.createUser.execute({
                name,
                email,
                password
            });

            return res.status(201).json({ data: user.id, message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleListUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.listUsers.execute();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error listing users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleDeleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const result = await this.deleteUser.execute({ id });
            
            if (!result.success) {
                return res.status(404).json({ error: result.message });
            }
            
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleUpdateUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const { name, email, password } = req.body;

            const result = await this.updateUser.execute({
                id,
                name,
                email,
                password
            });

            if (!result.success) {
                return res.status(404).json({ error: result.message });
            }

            return res.status(200).json({ data: result, message: result.message });
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleFindUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const result = await this.findUser.execute({ id });
            
            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error finding user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}