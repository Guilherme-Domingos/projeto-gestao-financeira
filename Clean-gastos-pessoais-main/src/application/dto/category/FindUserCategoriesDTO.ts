export type FindUserCategoriesInputDTO = {
    userId: string;
};

export type FindUserCategoriesOutputDTO = {
    categories: {
        id: number;
        name: string;
    }[];
};