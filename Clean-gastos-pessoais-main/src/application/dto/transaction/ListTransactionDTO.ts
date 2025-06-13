export type ListTransactionInputDTO = void;
export type ListTransactionOutputDTO = {
    transactions: {
        id: string;
        amount: number;
        description: string;
        date: Date;
        categoryId: number;
        transactionType: 'RECEITA' | 'DESPESA';
        sender?: string;
    }[]
};