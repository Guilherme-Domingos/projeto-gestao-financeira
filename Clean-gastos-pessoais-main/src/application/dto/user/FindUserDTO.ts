export type FindUserInputDTO = {
    id: string;
}
export type FindUserOutputDTO = {
    user: {
        id: string;
        name: string;
        email: string;
    }
};