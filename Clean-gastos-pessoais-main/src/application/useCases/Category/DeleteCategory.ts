import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";
import { DeleteCategoryInputDTO } from "../../dto/category/DeleteCategoryDTO";
import { DeleteCategoryOutputDTO } from "../../dto/category/DeleteCategoryDTO";
import { UseCase } from "../UseCase";

export class DeleteCategory implements UseCase<DeleteCategoryInputDTO, DeleteCategoryOutputDTO> {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(inputDTO: DeleteCategoryInputDTO): Promise<DeleteCategoryOutputDTO> {
        try {
            const op = await this.categoryRepository.delete(inputDTO.id);

            const outputDTO: DeleteCategoryOutputDTO = this.presentOutput(inputDTO.id);
            return outputDTO
        } catch (error) {
             throw new Error(`Erro ao deletar transação: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    }

    private presentOutput(id: number): DeleteCategoryOutputDTO {
        return {
            success: true,
            message: `Categoria com ID ${id} deletado com sucesso`
        };
    }
}