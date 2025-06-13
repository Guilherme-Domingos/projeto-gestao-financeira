export type FindUserTransactionsInputDTO = {
    userId: string;
}
export type FindUserTransactionsOutputDTO = {
    transactions: {
        id: string;
        amount: number;
        description: string;
        date: Date;
        categoryId?: number;
        transactionType: 'RECEITA' | 'DESPESA';
        sender?: string;
        userId: string;
    }[]
};