import { Category } from '../../../domain/entities/Category';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { UpdateCategoryInputDTO } from '../../dto/category/UpdateCategoryInputDTO';
import { UpdateCategoryOutputDTO } from '../../dto/category/UpdateCategoryOutputDTO';
import { UseCase } from '../UseCase';

export class UpdateCategory implements UseCase<UpdateCategoryInputDTO, UpdateCategoryOutputDTO> {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(input: UpdateCategoryInputDTO): Promise<UpdateCategoryOutputDTO> {
        try {
            const existingCategory = await this.categoryRepository.findById(input.id);
            
            if (!existingCategory) {
                return {
                    id: input.id,
                    success: false,
                    message: 'Category not found'
                };
            }
            
            // Obter os dados atuais da categoria
            const currentProps = existingCategory.toPersistentData();
            
            // Criar uma nova categoria com os dados atualizados
            const updatedCategory = Category.fromPersistentData({
                id: currentProps.id,
                name: input.name ?? currentProps.name,
                userId: input.userId ?? currentProps.userId,
            });
            
            await this.categoryRepository.update(updatedCategory);
            
            return {
                id: updatedCategory.id,
                success: true,
                message: 'Category updated successfully'
            };
        } catch (error) {
            console.error('Error updating category:', error);
            return {
                id: input.id,
                success: false,
                message: 'Failed to update category'
            };
        }
    }
}
