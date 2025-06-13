export type ListCategoryInputDTO = void;
export type ListCategoryOutputDTO = {
    categories: {
        id: number;
        name: string;
        userId: string;
    }[]
};