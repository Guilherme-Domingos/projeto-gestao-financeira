import { Category } from "../../../domain/entities/Category";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";
import { ListCategoryInputDTO } from "../../dto/category/ListCategoryDTO";
import { ListCategoryOutputDTO } from "../../dto/category/ListCategoryDTO";
import { UseCase } from "../UseCase";

export class ListCategories implements UseCase<ListCategoryInputDTO, ListCategoryOutputDTO> {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    public async execute(inputDto: ListCategoryInputDTO): Promise<ListCategoryOutputDTO> {
        const categories = await this.categoryRepository.findAll();

        const outputDTO: ListCategoryOutputDTO = this.presentOutput(categories);

        return outputDTO;
    }

    private presentOutput(categories: Category[]): ListCategoryOutputDTO {
        return {
            categories: categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    userId: category.userId,
                };
            }),
        };
    }
}