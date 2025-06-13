export type DeleteTransactionInputDTO = {
    id: string;
};

export type DeleteTransactionOutputDTO = {
    success: boolean;
    message?: string;
    deletedId?: string;
};