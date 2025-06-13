import { Request, Response } from "express";
import { CreateCategory } from "../../../../application/useCases/Category/CreateCategory";
import { ListCategories } from "../../../../application/useCases/Category/ListCategory";
import { UpdateCategory } from "../../../../application/useCases/Category/UpdateCategory";
import { DeleteCategory } from "../../../../application/useCases/Category/DeleteCategory";
import { FindUserCategories } from "../../../../application/useCases/Category/FindUserCategories";

export class CategoryController {
    constructor(
        private createCategory: CreateCategory,
        private listCategories: ListCategories,
        private updateCategory: UpdateCategory,
        private deleteCategory: DeleteCategory,
        private findUserCategories: FindUserCategories
    ) {}

    public async handleCreateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { name, userId } = req.body;

            const category = await this.createCategory.execute({
                name, 
                userId
            });

            return res.status(201).json({data: category.id, message: 'Category created successfully'});
        } catch (error) {
            console.error('Error creating category:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }    
    
    public async handleListCategories(req: Request, res: Response){
        try {
            const categories = await this.listCategories.execute();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }    
    
    public async handleUpdateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const { name, userId } = req.body;
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid category ID' });
            }

            const category = await this.updateCategory.execute({
                id,
                name,
                userId
            });
            
            if (!category.success) {
                return res.status(404).json({ error: category.message });
            }

            return res.status(200).json({data: category.id, message: 'Category updated successfully'});
        } catch (error) {
            console.error('Error updating category:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleDeleteCategory(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid category ID' });
            }

            const result = await this.deleteCategory.execute({ id });

            if (!result.success) {
                return res.status(404).json({ error: result.message });
            }

            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleFindUserCategories(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.userId;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const categories = await this.findUserCategories.execute({ userId });

            return res.status(200).json(categories);
        } catch (error) {
            console.error('Error finding user categories:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}