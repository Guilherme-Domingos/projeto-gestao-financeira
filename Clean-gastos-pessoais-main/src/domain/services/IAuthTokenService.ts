export interface TokenPayload {
    userId: string;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}

export interface IAuthTokenService {
    generateToken(payload: TokenPayload): string;
    verifyToken(token: string): TokenPayload | null;
}
