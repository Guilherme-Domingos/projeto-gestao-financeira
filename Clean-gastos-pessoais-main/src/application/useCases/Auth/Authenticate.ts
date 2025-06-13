import { UserRepository } from "../../../domain/repositories/UserRepository";
import { AuthenticationInputDTO, AuthenticationOutputDTO } from "../../dto/auth/AuthenticationDTO";
import { UseCase } from "../UseCase";

export class Authenticate implements UseCase<AuthenticationInputDTO, AuthenticationOutputDTO> {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(input: AuthenticationInputDTO): Promise<AuthenticationOutputDTO> {
        try {
            const { email, password } = input;
            
            // Buscar usuário pelo email
            const user = await this.userRepository.findByEmail(email);
            
            // Verificar se o usuário existe
            if (!user) {
                return {
                    success: false,
                    message: 'Email ou senha inválidos'
                };
            }
            
            // Verificar se a senha está correta
            const isPasswordValid = await user.verifyPassword(password);
            
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: 'Email ou senha inválidos'
                };
            }
            
            // Gerar token JWT
            const token = await user.generateAuthToken();
            
            return {
                success: true,
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        } catch (error) {
            console.error('Erro na autenticação:', error);
            return {
                success: false,
                message: 'Erro durante autenticação'
            };
        }
    }
}
