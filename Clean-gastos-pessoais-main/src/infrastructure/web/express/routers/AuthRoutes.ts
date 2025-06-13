import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     description: Autentica um usuário e retorna um token JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@exemplo.com
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID do usuário
 *                     name:
 *                       type: string
 *                       description: Nome do usuário
 *                     email:
 *                       type: string
 *                       description: Email do usuário
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso
 *       400:
 *         description: Dados de requisição inválidos
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/auth/login', (req: Request, res: Response) => ContainerFactory.createContainer().authController.handleLogin(req, res));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Realiza logout do usuário
 *     description: Encerra a sessão do usuário autenticado
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logout realizado com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/auth/logout', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().authController.handleLogout(req, res));

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Renova o token JWT
 *     description: Gera um novo token JWT para o usuário autenticado
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Novo token JWT
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID do usuário
 *                     name:
 *                       type: string
 *                       description: Nome do usuário
 *                     email:
 *                       type: string
 *                       description: Email do usuário
 *                 message:
 *                   type: string
 *                   example: Token atualizado com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/auth/refresh-token', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().authController.handleRefreshToken(req, res));

export default router;
