import { Router } from "express";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserOutput'
 *       400:
 *         description: Dados inválidos na requisição
 *       409:
 *         description: Email já está em uso
 *       500:
 *         description: Erro interno do servidor
 * 
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro interno do servidor
 * 
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
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
 *               $ref: '#/components/schemas/CreateCategoryOutput'
 *       400:
 *         description: Dados inválidos na requisição
 *       500:
 *         description: Erro interno do servidor
 * 
 *   get:
 *     summary: Retorna todas as categorias do usuário
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID do usuário para filtrar categorias
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * tags:
 *   name: Monthly Goals
 *   description: Gerenciamento de metas mensais
 */

/**
 * @swagger
 * /monthly-goals:
 *   post:
 *     summary: Cria uma nova meta mensal
 *     tags: [Monthly Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMonthlyGoalInput'
 *     responses:
 *       201:
 *         description: Meta mensal criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateMonthlyGoalOutput'
 *       400:
 *         description: Dados inválidos na requisição
 *       500:
 *         description: Erro interno do servidor
 * 
 *   get:
 *     summary: Retorna todas as metas mensais do usuário
 *     tags: [Monthly Goals]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID do usuário para filtrar metas
 *       - in: query
 *         name: ano
 *         schema:
 *           type: integer
 *         description: Ano para filtrar metas
 *       - in: query
 *         name: mes
 *         schema:
 *           type: integer
 *         description: Mês para filtrar metas
 *     responses:
 *       200:
 *         description: Lista de metas mensais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonthlyGoal'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Gerenciamento de transações
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retorna todas as transações do usuário
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID do usuário para filtrar transações
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [RECEITA, DESPESA]
 *         description: Tipo da transação para filtrar
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início para filtrar transações
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim para filtrar transações
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: ID da categoria para filtrar transações
 *     responses:
 *       200:
 *         description: Lista de transações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Erro interno do servidor
 * 
 * /transactions/{id}:
 *   get:
 *     summary: Retorna uma transação pelo ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da transação
 *     responses:
 *       200:
 *         description: Transação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro interno do servidor
 *   
 *   delete:
 *     summary: Deleta uma transação
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da transação a ser deletada
 *     responses:
 *       200:
 *         description: Transação deletada com sucesso
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

// Este arquivo é apenas para documentação do Swagger
// As rotas precisarão ser implementadas nos respectivos arquivos de rotas
const router = Router();
export default router;
