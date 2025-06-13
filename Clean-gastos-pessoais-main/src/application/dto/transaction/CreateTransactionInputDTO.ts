export type CreateTransactionInputDTO = {
    amount: number;
    description: string;
    date: Date;
    type: 'RECEITA' | 'DESPESA';
    sender?: string;
    categoryId?: number;
    userId: string;
};