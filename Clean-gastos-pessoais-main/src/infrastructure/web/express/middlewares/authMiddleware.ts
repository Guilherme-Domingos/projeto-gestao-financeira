import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../../security/JwtAdapter';

// Adicionar a propriedade user ao tipo Request do Express
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                name: string;
            };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
        // Extrair o token do cabeçalho Authorization
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ 
                error: 'Token não fornecido',
                message: 'É necessário fornecer um token de autenticação',
                code: 'AUTH_NO_TOKEN'
            });
        }
        
        // O formato esperado é 'Bearer TOKEN'
        const parts = authHeader.split(' ');
        
        if (parts.length !== 2) {
            return res.status(401).json({ 
                error: 'Formato de token inválido',
                message: 'O formato correto é: Bearer {token}',
                code: 'AUTH_INVALID_FORMAT'
            });
        }
        
        const [scheme, token] = parts;
        
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ 
                error: 'Formato de token inválido',
                message: 'O token deve começar com Bearer',
                code: 'AUTH_INVALID_SCHEME'
            });
        }
          // Verificar o token
        const jwtAdapter = new JwtAdapter();
        const payload = jwtAdapter.verifyToken(token);
        
        if (!payload) {
            return res.status(401).json({ 
                error: 'Token inválido ou expirado',
                message: 'Faça login novamente para obter um novo token',
                code: 'AUTH_INVALID_TOKEN'
            });
        }
        
        // Adicionar as informações do usuário ao objeto de requisição
        req.user = payload;
        
        return next();
    } catch (error) {
        console.error('Erro de autenticação:', error);
        
        // Verificar se é um erro específico do JWT
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    error: 'Token expirado',
                    message: 'O token de autenticação expirou. Faça login novamente.',
                    code: 'AUTH_EXPIRED_TOKEN'
                });
            }
            
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    error: 'Token inválido',
                    message: 'O token fornecido é inválido ou foi adulterado.',
                    code: 'AUTH_MALFORMED_TOKEN'
                });
            }
        }
        
        return res.status(500).json({ 
            error: 'Erro interno ao verificar autenticação',
            message: 'Ocorreu um erro durante a verificação da autenticação.',
            code: 'AUTH_INTERNAL_ERROR'
        });
    }
};
