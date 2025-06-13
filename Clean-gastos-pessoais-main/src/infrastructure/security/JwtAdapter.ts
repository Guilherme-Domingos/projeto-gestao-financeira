import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IAuthTokenService, TokenPayload } from '../../domain/services/IAuthTokenService';

// Carrega variáveis de ambiente
dotenv.config();

// Configuração segura do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'segredo-temporario-para-desenvolvimento';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; // Reduzido para 1h para maior segurança

export class JwtAdapter implements IAuthTokenService {
  generateToken(payload: TokenPayload): string {
    // @ts-ignore: Use type assertion to resolve type issues
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }

  verifyToken(token: string): TokenPayload | null {
    try {
      // @ts-ignore: Use type assertion to resolve type issues
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  // Mantidos para compatibilidade com código existente
  static generateToken(payload: TokenPayload): string {
    return new JwtAdapter().generateToken(payload);
  }

  static verifyToken(token: string): TokenPayload | null {
    return new JwtAdapter().verifyToken(token);
  }
}
