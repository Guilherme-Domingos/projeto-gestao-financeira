import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/** * @swagger
 * /transaction:
 *   post:
 *     summary: Cria uma nova transação
 *     description: Cria uma nova transação financeira (receita ou despesa)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionInput'
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTransactionOutput'
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
router.post('/transaction', authMiddleware, (req, res) => ContainerFactory.createContainer().transactionController.handleCreateTransaction(req, res));

/** * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Deleta uma transação
 *     description: Remove uma transação financeira existente pelo seu ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser excluída
 *     responses:
 *       201:
 *         description: Transação deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteTransactionOutput'
 *       404:
 *         description: Transação não encontrada
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
router.delete('/transaction/:id', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleDeleteTransaction(req, res));

/** * @swagger
 * /transaction:
 *   get:
 *     summary: Lista todas as transações
 *     description: Retorna uma lista com todas as transações financeiras cadastradas
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Lista de transações obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListTransactionOutput'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/transaction',(req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleListTransactions(res));

/** * @swagger
 * /transaction/{id}:
 *   put:
 *     summary: Atualiza uma transação
 *     description: Atualiza os dados de uma transação financeira existente pelo seu ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransactionInput'
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateTransactionOutput'
 *       404:
 *         description: Transação não encontrada
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
router.put('/transaction/:id', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleUpdateTransaction(req, res));

/** * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Busca uma transação pelo ID
 *     description: Retorna os detalhes de uma transação específica pelo seu ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser consultada
 *     responses:
 *       200:
 *         description: Transação encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionDetail'
 *       404:
 *         description: Transação não encontrada
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
router.get('/transaction/:id', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleFindTransaction(req, res));

/** * @swagger
 * /user/{userId}/transactions:
 *   get:
 *     summary: Busca todas as transações de um usuário
 *     description: Retorna uma lista com todas as transações financeiras de um usuário específico
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário para buscar suas transações
 *     responses:
 *       200:
 *         description: Transações encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTransactions'
 *       404:
 *         description: Usuário não encontrado ou sem transações
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
router.get('/user/:userId/transactions', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleFindUserTransactions(req, res));

export default router;