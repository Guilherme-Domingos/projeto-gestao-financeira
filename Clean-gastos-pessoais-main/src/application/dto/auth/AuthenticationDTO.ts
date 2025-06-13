export type AuthenticationInputDTO = {
  email: string;
  password: string;
};

export type AuthenticationOutputDTO = {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};
