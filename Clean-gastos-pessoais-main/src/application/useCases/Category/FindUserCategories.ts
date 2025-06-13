import { Category } from "../../../domain/entities/Category";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";
import { FindUserCategoriesInputDTO, FindUserCategoriesOutputDTO } from "../../dto/category/FindUserCategoriesDTO";
import { UseCase } from "../UseCase";

export class FindUserCategories implements UseCase<FindUserCategoriesInputDTO, FindUserCategoriesOutputDTO> {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    public async execute(inputDto: FindUserCategoriesInputDTO): Promise<FindUserCategoriesOutputDTO> {
        const categories = await this.categoryRepository.findByUserId(inputDto.userId);
        
        return {
            categories: this.mapCategoriesToOutput(categories)
        };
    }

    private mapCategoriesToOutput(categories: Category[]): FindUserCategoriesOutputDTO["categories"] {
        return categories.map((category) => {
            return {
                id: category.id,
                name: category.name
            };
        });
    }
}
