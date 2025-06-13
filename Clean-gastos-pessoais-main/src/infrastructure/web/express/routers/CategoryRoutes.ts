import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/** * @swagger
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     description: Cria uma nova categoria para classificação de transações
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryInput'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: integer
 *                   description: ID da categoria criada
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       400:
 *         description: Dados inválidos na requisição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/category', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().categoryController.handleCreateCategory(req, res));

/** * @swagger
 * /category:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista com todas as categorias cadastradas no sistema
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   description: Lista de categorias
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID da categoria
 *                       name:
 *                         type: string
 *                         description: Nome da categoria
 *                       userId:
 *                         type: string
 *                         description: ID do usuário proprietário da categoria
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/category', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().categoryController.handleListCategories(req, res));

/** * @swagger
 * /category/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     description: Atualiza os dados de uma categoria existente pelo ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryInput'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: integer
 *                   description: ID da categoria atualizada
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       400:
 *         description: Dados inválidos na requisição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/category/:id', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().categoryController.handleUpdateCategory(req, res));

/** * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     description: Remove uma categoria existente pelo seu ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria a ser excluída
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category deleted successfully
 *                   description: Mensagem de sucesso
 *       400:
 *         description: ID de categoria inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/category/:id', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().categoryController.handleDeleteCategory(req, res));

/** * @swagger
 * /category/user/{userId}:
 *   get:
 *     summary: Lista categorias de um usuário específico
 *     description: Retorna todas as categorias que pertencem a um determinado usuário
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário para filtrar as categorias
 *     responses:
 *       200:
 *         description: Categorias do usuário obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   description: Lista de categorias do usuário
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID da categoria
 *                       name:
 *                         type: string
 *                         description: Nome da categoria
 *       400:
 *         description: ID de usuário não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/category/user/:userId', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().categoryController.handleFindUserCategories(req, res));
export default router;