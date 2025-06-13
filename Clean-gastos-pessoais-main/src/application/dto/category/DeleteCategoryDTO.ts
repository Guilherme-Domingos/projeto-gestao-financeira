export type DeleteCategoryInputDTO = {
    id: number;
};

export type DeleteCategoryOutputDTO = {
    success: boolean;
    message?: string;
    deletedId?: number;
};