export type DeleteUserInputDTO = {
    id: string;
};

export type DeleteUserOutputDTO = {
    success: boolean;
    message?: string;
    deletedId?: string;
};