import { Request, Response } from 'express';
import { Authenticate } from '../../../../application/useCases/Auth/Authenticate';
import { UserRepository } from '../../../../domain/repositories/UserRepository';
import { IAuthTokenService } from '../../../../domain/services/IAuthTokenService';

export class AuthController {
    constructor(
        private authenticate: Authenticate,
        private userRepository: UserRepository
    ) {}

    public async handleLogin(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const result = await this.authenticate.execute({ email, password });

            if (!result.success) {
                return res.status(401).json({ error: result.message });
            }

            return res.status(200).json({
                token: result.token,
                user: result.user,
                message: 'Login realizado com sucesso'
            });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
    
    public async handleLogout(req: Request, res: Response): Promise<Response> {
        try {
            // JWT tokens are stateless, so we can't invalidate them on the server side
            // A proper solution would use a token blacklist or short-lived tokens with refresh tokens
            // For now, we just return success and the client should delete the token
            return res.status(200).json({
                success: true,
                message: 'Logout realizado com sucesso'
            });
        } catch (error) {
            console.error('Error during logout:', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }

    public async handleRefreshToken(req: Request, res: Response): Promise<Response> {
        try {
            // Get user from the request (set by authMiddleware)
            const user = req.user;
            
            if (!user || !user.userId) {
                return res.status(401).json({ error: 'Token inválido ou expirado' });
            }
            
            // Find user in the database to confirm they still exist and are active
            const userEntity = await this.userRepository.findById(user.userId);
            
            if (!userEntity) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }
            
            // Generate a new token
            const newToken = await userEntity.generateAuthToken();
            
            // Return the new token
            return res.status(200).json({
                token: newToken,
                user: {
                    id: userEntity.id,
                    name: userEntity.name,
                    email: userEntity.email
                },
                message: 'Token atualizado com sucesso'
            });
        } catch (error) {
            console.error('Error refreshing token:', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}
