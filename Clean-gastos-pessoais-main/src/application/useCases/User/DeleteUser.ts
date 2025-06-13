import { UserRepository } from "../../../domain/repositories/UserRepository";
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../../dto/user/DeleteUserDTO";
import { UseCase } from "../UseCase";

export class DeleteUser implements UseCase<DeleteUserInputDTO, DeleteUserOutputDTO> {
    constructor(private userRepository: UserRepository) {}

    async execute(inputDTO: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> {
        try {
            // Verificar se o usuário existe
            const user = await this.userRepository.findById(inputDTO.id);
            
            if (!user) {
                return {
                    success: false,
                    message: `Usuário com ID ${inputDTO.id} não encontrado`
                };
            }
            
            // Deletar o usuário
            await this.userRepository.delete(inputDTO.id);
            
            // Retornar resposta de sucesso
            return {
                success: true,
                message: `Usuário com ID ${inputDTO.id} deletado com sucesso`,
                deletedId: inputDTO.id
            };
        } catch (error) {
            return {
                success: false,
                message: `Erro ao deletar usuário: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
            };
        }
    }
    
}
