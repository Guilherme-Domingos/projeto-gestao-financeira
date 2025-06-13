import bcrypt from 'bcryptjs';
import { IPasswordHasher } from '../../domain/services/IPasswordHasher';

export class PasswordHasher implements IPasswordHasher {
  private static readonly SALT_ROUNDS = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, PasswordHasher.SALT_ROUNDS);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Mantidos para compatibilidade com código existente
  static async hash(password: string): Promise<string> {
    return await new PasswordHasher().hash(password);
  }

  static async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await new PasswordHasher().compare(plainPassword, hashedPassword);
  }
}
