import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UpdateuserInputDTO } from '../../dto/user/UpdateUserInputDTO';
import { UpdateUserOutputDTO } from '../../dto/user/UpdateUserOutputDTO';
import { UseCase } from '../UseCase';
import { IPasswordHasher } from '../../../domain/services/IPasswordHasher';

export class UpdateUser implements UseCase<UpdateuserInputDTO, UpdateUserOutputDTO> {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: IPasswordHasher
    ) {}

    async execute(input: UpdateuserInputDTO): Promise<UpdateUserOutputDTO> {
        try {
            const existingUser = await this.userRepository.findById(input.id);
            
            if (!existingUser) {
                return {
                    id: input.id,
                    success: false,
                    message: 'User not found'
                };
            }
              
            // Verificar se o email está sendo atualizado e se já existe
            if (input.email && input.email !== existingUser.email) {
                const userWithSameEmail = await this.userRepository.findByEmail(input.email);
                if (userWithSameEmail && userWithSameEmail.id !== input.id) {
                    return {
                        id: input.id,
                        success: false,
                        message: 'Email already in use'
                    };
                }
            }
            
            // Obter os dados atuais do usuário
            const currentProps = existingUser.toPersistentData();
              // Verificar se a senha será atualizada
            let password = currentProps.password;
            if (input.password) {
                password = await this.passwordHasher.hash(input.password);
            }
            
            // Criar um novo usuário com os dados atualizados
            const updatedUser = User.fromPersistentData({
                id: currentProps.id,
                name: input.name ?? currentProps.name,
                email: input.email ?? currentProps.email,
                password: password,
            });
            
            await this.userRepository.update(updatedUser);
              return {
                id: updatedUser.id,
                success: true,
                message: 'User updated successfully'
            };
        } catch (error) {
            console.error('Error updating User:', error);
            return {
                id: input.id,
                success: false,
                message: 'Failed to update User'
            };
        }
    }
}
