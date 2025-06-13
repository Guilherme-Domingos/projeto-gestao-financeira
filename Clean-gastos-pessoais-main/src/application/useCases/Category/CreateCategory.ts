import { Category } from "../../../domain/entities/Category";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";
import { CreateCategoryInputDTO } from "../../dto/category/CreateCategoryInputDTO";
import { CreateCategoryOutputDTO } from "../../dto/category/CreateCategoryOutputDTO";
import { UseCase } from "../UseCase";

export class CreateCategory implements UseCase<CreateCategoryInputDTO, CreateCategoryOutputDTO> {
    constructor(private readonly categoryRepository: CategoryRepository) {}    
      public async execute(inputDto: CreateCategoryInputDTO): Promise<CreateCategoryOutputDTO> {
        const category = Category.create(
            inputDto.userId,
            inputDto.name,
        );
        
        await this.categoryRepository.save(category);

        const outputDTO: CreateCategoryOutputDTO = {id: category.id};
        return outputDTO;
    }
}