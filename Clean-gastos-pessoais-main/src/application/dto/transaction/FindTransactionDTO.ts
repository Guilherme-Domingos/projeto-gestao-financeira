export type FindTransactionInputDTO = {
    id: string;
}
export type FindTransactionOutputDTO = {
    transaction: {
        id: string;
        amount: number;
        description: string;
        date: Date;
        categoryId?: number;
        transactionType: 'RECEITA' | 'DESPESA';
        sender?: string;
        userId: string;
    }
};