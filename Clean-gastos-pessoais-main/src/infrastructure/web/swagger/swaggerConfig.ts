import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestão de Gastos Pessoais',
    version: '1.0.0',
    description: 'Documentação da API para gerenciamento de finanças pessoais',
    contact: {
      name: 'Clean Architecture - Controle Financeiro',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  tags: [
    {
      name: 'Transactions',
      description: 'Operações relacionadas a transações financeiras'
    },
    {
      name: 'Users',
      description: 'Operações relacionadas a usuários'
    },
    {
      name: 'Categories',
      description: 'Operações relacionadas a categorias'
    },
    {
      name: 'Monthly Goals',
      description: 'Operações relacionadas a metas mensais'
    },
    {
      name: 'Authentication',
      description: 'Operações relacionadas a autenticação e segurança'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT no formato "Bearer {token}"'
      }
    },
    schemas: {
      // Schemas para Transactions
      CreateTransactionInput: {
        type: 'object',
        required: ['date', 'amount', 'description', 'type', 'userId'],
        properties: {
          date: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-03T00:00:00.000Z',
            description: 'Data da transação',
          },
          amount: {
            type: 'number',
            format: 'float',
            example: 100.50,
            description: 'Valor da transação',
          },
          description: {
            type: 'string',
            example: 'Compra no supermercado',
            description: 'Descrição da transação',
          },
          type: {
            type: 'string',
            enum: ['RECEITA', 'DESPESA'],
            example: 'DESPESA',
            description: 'Tipo da transação (receita ou despesa)',
          },
          sender: {
            type: 'string',
            example: 'Supermercado ABC',
            description: 'Remetente ou destinatário da transação',
          },
          userId: {
            type: 'string',
            example: 'abc123',
            description: 'ID do usuário associado à transação',
          },
          categoryId: {
            type: 'integer',
            example: 1,
            description: 'ID da categoria da transação (opcional)',
          },
        },
      },
      
      UpdateTransactionInput: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-03T00:00:00.000Z',
            description: 'Nova data da transação',
          },
          amount: {
            type: 'number',
            format: 'float',
            example: 150.75,
            description: 'Novo valor da transação',
          },
          description: {
            type: 'string',
            example: 'Compra atualizada no supermercado',
            description: 'Nova descrição da transação',
          },
          type: {
            type: 'string',
            enum: ['RECEITA', 'DESPESA'],
            example: 'DESPESA',
            description: 'Novo tipo da transação (receita ou despesa)',
          },
          sender: {
            type: 'string',
            example: 'Supermercado XYZ',
            description: 'Novo remetente ou destinatário da transação',
          },
          categoryId: {
            type: 'integer',
            example: 2,
            description: 'Novo ID da categoria da transação',
          },
        },
      },
      
      UpdateTransactionOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'abc123-456def',
                description: 'ID da transação atualizada',
              },
              success: {
                type: 'boolean',
                example: true,
                description: 'Indica se a atualização foi bem-sucedida',
              },
              message: {
                type: 'string',
                example: 'Transaction updated successfully',
                description: 'Mensagem de sucesso',
              },
            }
          },
          message: {
            type: 'string',
            example: 'Transaction updated successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      
      CreateTransactionOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            example: 'abc123-456def',
            description: 'ID da transação criada',
          },
          message: {
            type: 'string',
            example: 'Transaction created successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      Transaction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID da transação',
          },
          date: {
            type: 'string',
            format: 'date-time',
            description: 'Data da transação',
          },
          amount: {
            type: 'number',
            format: 'float',
            description: 'Valor da transação',
          },
          description: {
            type: 'string',
            description: 'Descrição da transação',
          },
          type: {
            type: 'string',
            enum: ['RECEITA', 'DESPESA'],
            description: 'Tipo da transação (receita ou despesa)',
          },
          sender: {
            type: 'string',
            description: 'Remetente ou destinatário da transação',
          },
          userId: {
            type: 'string',
            description: 'ID do usuário associado à transação',
          },
          categoryId: {
            type: 'integer',
            description: 'ID da categoria da transação',
          },
        },
      },
      
      DeleteTransactionOutput: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
            description: 'Indica se a exclusão foi bem-sucedida',
          },
          message: {
            type: 'string',
            example: 'Transação com ID abc123 deletada com sucesso',
            description: 'Mensagem de confirmação',
          },
          deletedId: {
            type: 'string',
            example: 'abc123',
            description: 'ID da transação excluída (opcional)',
          },
        },
      },
      
      ListTransactionOutput: {
        type: 'object',
        properties: {
          transactions: {
            type: 'array',
            description: 'Lista de transações',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'ID da transação',
                  example: 'abc123-456def'
                },
                amount: {
                  type: 'number',
                  format: 'float',
                  description: 'Valor da transação',
                  example: 150.50
                },
                description: {
                  type: 'string',
                  description: 'Descrição da transação',
                  example: 'Compra no supermercado'
                },
                date: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Data da transação',
                  example: '2025-06-10T14:30:00.000Z'
                },
                categoryId: {
                  type: 'string',
                  description: 'ID da categoria da transação',
                  example: '1'
                },
                transactionType: {
                  type: 'string',
                  enum: ['RECEITA', 'DESPESA'],
                  description: 'Tipo da transação (receita ou despesa)',
                  example: 'DESPESA'
                },
                sender: {
                  type: 'string',
                  description: 'Remetente ou destinatário da transação',
                  example: 'Supermercado ABC'
                }
              }
            }
          }
        }
      },
      
      // Schemas para Users
      CreateUserInput: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            example: 'João Silva',
            description: 'Nome do usuário',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'joao@example.com',
            description: 'Email do usuário',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'senha123',
            description: 'Senha do usuário',
          },
        },
      },
      CreateUserOutput: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'user-123',
            description: 'ID do usuário criado',
          },
          message: {
            type: 'string',
            example: 'User created successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID do usuário',
          },
          name: {
            type: 'string',
            description: 'Nome do usuário',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email do usuário',
          },
        },
      },
      ListUserOutput: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            description: 'Lista de usuários',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: 'abc123-456def',
                  description: 'ID do usuário',
                },
                name: {
                  type: 'string',
                  example: 'João Silva',
                  description: 'Nome do usuário',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'joao@example.com',
                  description: 'Email do usuário',
                }
              }
            }
          }
        }
      },
      
      // Schemas para Categories
      CreateCategoryInput: {
        type: 'object',
        required: ['name', 'userId'],
        properties: {
          name: {
            type: 'string',
            example: 'Alimentação',
            description: 'Nome da categoria',
          },
          userId: {
            type: 'string',
            example: 'user-123',
            description: 'ID do usuário proprietário da categoria',
          },
        },
      },
      CreateCategoryOutput: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
            description: 'ID da categoria criada',
          },
          message: {
            type: 'string',
            example: 'Category created successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },      
      
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID da categoria',
          },
          name: {
            type: 'string',
            description: 'Nome da categoria',
          },
          userId: {
            type: 'string',
            description: 'ID do usuário proprietário da categoria',
          },
        },
      },
      
      UpdateCategoryInput: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'integer',
            example: 1,
            description: 'ID da categoria a ser atualizada',
          },
          name: {
            type: 'string',
            example: 'Alimentação Fora',
            description: 'Novo nome da categoria',
          },
          // userId: {
          //   type: 'string',
          //   example: 'user-123',
          //   description: 'ID do usuário proprietário (opcional)',
          // },
        },
      },
      
      UpdateCategoryOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'integer',
            example: 1,
            description: 'ID da categoria atualizada',
          },
          message: {
            type: 'string',
            example: 'Category updated successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      
      // Schemas para Monthly Goals
      CreateMonthlyGoalInput: {
        type: 'object',
        required: ['valorLimite', 'mes', 'ano', 'userId'],
        properties: {
          valorLimite: {
            type: 'number',
            format: 'float',
            example: 1500.00,
            description: 'Valor limite para gastos no mês',
          },
          mes: {
            type: 'integer',
            example: 6,
            description: 'Mês da meta (1-12)',
          },
          ano: {
            type: 'integer',
            example: 2025,
            description: 'Ano da meta',
          },
          userId: {
            type: 'string',
            example: 'user-123',
            description: 'ID do usuário dono da meta',
          },
        },
      },
      CreateMonthlyGoalOutput: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
            description: 'ID da meta mensal criada',
          },
          message: {
            type: 'string',
            example: 'Monthly goal created successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      MonthlyGoal: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID da meta mensal',
          },
          valorLimite: {
            type: 'number',
            format: 'float',
            description: 'Valor limite para gastos no mês',
          },
          mes: {
            type: 'integer',
            description: 'Mês da meta (1-12)',
          },
          ano: {
            type: 'integer',
            description: 'Ano da meta',
          },
          userId: {
            type: 'string',
            description: 'ID do usuário dono da meta',
          },
        },
      },
      
      // Schemas para erro
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Mensagem de erro',
          },
          details: {
            type: 'string',
            description: 'Detalhes do erro (quando disponíveis)',
          },
        },
      },
      
      TransactionDetail: {
        type: 'object',
        properties: {
          transaction: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'abc123-456def',
                description: 'ID da transação',
              },
              amount: {
                type: 'number',
                format: 'float',
                example: 150.50,
                description: 'Valor da transação',
              },
              description: {
                type: 'string',
                example: 'Compra no supermercado',
                description: 'Descrição da transação',
              },
              date: {
                type: 'string',
                format: 'date-time',
                example: '2025-06-10T14:30:00.000Z',
                description: 'Data da transação',
              },
              categoryId: {
                type: 'integer',
                example: 1,
                description: 'ID da categoria da transação',
              },
              transactionType: {
                type: 'string',
                enum: ['RECEITA', 'DESPESA'],
                example: 'DESPESA',
                description: 'Tipo da transação (receita ou despesa)',
              },
              sender: {
                type: 'string',
                example: 'Supermercado ABC',
                description: 'Remetente ou destinatário da transação',
              },
              userId: {
                type: 'string',
                example: 'user-123',
                description: 'ID do usuário associado à transação',
              }
            }
          }
        }
      },
      
      UserTransactions: {
        type: 'object',
        properties: {
          transactions: {
            type: 'array',
            description: 'Lista de transações do usuário',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: 'abc123-456def',
                  description: 'ID da transação',
                },
                amount: {
                  type: 'number',
                  format: 'float',
                  example: 150.50,
                  description: 'Valor da transação',
                },
                description: {
                  type: 'string',
                  example: 'Compra no supermercado',
                  description: 'Descrição da transação',
                },
                date: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-06-10T14:30:00.000Z',
                  description: 'Data da transação',
                },
                categoryId: {
                  type: 'integer',
                  example: 1,
                  description: 'ID da categoria da transação',
                },
                transactionType: {
                  type: 'string',
                  enum: ['RECEITA', 'DESPESA'],
                  example: 'DESPESA',
                  description: 'Tipo da transação (receita ou despesa)',
                },
                sender: {
                  type: 'string',
                  example: 'Supermercado ABC',
                  description: 'Remetente ou destinatário da transação',
                },
                userId: {
                  type: 'string',
                  example: 'user-123',
                  description: 'ID do usuário associado à transação',
                }
              }
            }
          }
        }
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/infrastructure/web/express/routers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
