import { NextFunction } from "express";
import { Request, Response } from "express";

// Lista de rotas que não precisam verificar o ID de usuário (como listas gerais)
const EXCLUDED_PATHS = ['/user'];

export const ownershipMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
    // Verificar se a rota atual está na lista de exceções
    const currentPath = req.path;
    if (EXCLUDED_PATHS.includes(currentPath)) {
        console.log(`Rota ${currentPath} está isenta de verificação de propriedade`);
        return next();
    }

    // Verifica se o ID do usuário na URL corresponde ao usuário logado
    const requestedUserId = req.params.userId || req.params.id;
    console.log('ID do usuário solicitado:', requestedUserId);
    
    // ID de admin para bypass
    const adminId = "e1b2e331-163e-45c0-b70a-de98758a6692";
    
    // Verificação de propriedade - permite acesso se:
    // 1. O usuário é o dono do recurso OU
    // 2. O usuário é um administrador
    if (!req.user || (req.user.userId !== requestedUserId && req.user.userId !== adminId)) {
        return res.status(403).json({ 
            error: 'Acesso não autorizado',
            message: 'Você não tem permissão para acessar estes dados',
            code: 'AUTH_FORBIDDEN'
        });
    }
    
    return next();
};