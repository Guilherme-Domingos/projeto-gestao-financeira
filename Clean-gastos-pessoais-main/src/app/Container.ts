// Importações necessárias da entidade transação
import { CreateTransaction } from "../application/useCases/Transaction/CreateTransaction"
import { DeleteTransaction } from "../application/useCases/Transaction/DeleteTransaction";
import { FindTransaction } from "../application/useCases/Transaction/FindTransaction";
import { FindUserTransactions } from "../application/useCases/Transaction/FindUserTransactions";
import { ListTransactions } from "../application/useCases/Transaction/ListTransactions";
import { UpdateTransaction } from "../application/useCases/Transaction/UpdateTransaction";
import { TransactionController } from "../infrastructure/web/express/controllers/TransactionController";
import { PrismaTransactionRepository } from "../infrastructure/db/prisma/PrismaTransactionRepository";

// Importações necessárias da entidade usuário
import { UserController } from "../infrastructure/web/express/controllers/UserController";
import { PrismaUserRepository } from "../infrastructure/db/prisma/PrismaUserRepository";
import { CreateUser } from "../application/useCases/User/CreateUser";
import { ListUsers } from "../application/useCases/User/ListUsers";
import { DeleteUser } from "../application/useCases/User/DeleteUser";
import { UpdateUser } from "../application/useCases/User/UpdateUser";
import { FindUser } from "../application/useCases/User/FindUser";

// Importações necessárias da autenticação
import { AuthController } from "../infrastructure/web/express/controllers/AuthController";
import { Authenticate } from "../application/useCases/Auth/Authenticate";
import { PasswordHasher } from "../infrastructure/security/PasswordHasher";
import { JwtAdapter } from "../infrastructure/security/JwtAdapter";

// Importações necessárias da entidade categoria
import { CategoryController } from "../infrastructure/web/express/controllers/CategoryController";
import { PrismaCategoryRepository } from "../infrastructure/db/prisma/PrismaCategoryRepository";
import { CreateCategory } from "../application/useCases/Category/CreateCategory";
import { ListCategories } from "../application/useCases/Category/ListCategory";
import { UpdateCategory } from "../application/useCases/Category/UpdateCategory";
import { DeleteCategory } from "../application/useCases/Category/DeleteCategory";
import { FindUserCategories } from "../application/useCases/Category/FindUserCategories";

export class Container {
    public get transactionController(){
        const TransactionRepository = new PrismaTransactionRepository();
        const createTransaction = new CreateTransaction(TransactionRepository);
        const deleteTransaction = new DeleteTransaction(TransactionRepository);
        const listTransactions = new ListTransactions(TransactionRepository);
        const updateTransaction = new UpdateTransaction(TransactionRepository);
        const findTransaction = new FindTransaction(TransactionRepository);
        const findUserTransactions = new FindUserTransactions(TransactionRepository);
        const transactionController = new TransactionController(
            createTransaction, 
            deleteTransaction, 
            listTransactions, 
            updateTransaction,
            findTransaction,
            findUserTransactions
        );
        return transactionController;
    }    
      public get userController() {
        const userRepository = new PrismaUserRepository();
        const passwordHasher = new PasswordHasher();
        
        const createUser = new CreateUser(userRepository, passwordHasher);
        const listUsers = new ListUsers(userRepository);
        const deleteUser = new DeleteUser(userRepository);
        const updateUser = new UpdateUser(userRepository, passwordHasher);
        const findUser = new FindUser(userRepository);
        
        const userController = new UserController(
            createUser, 
            listUsers, 
            deleteUser, 
            updateUser, 
            findUser
        );
        return userController;
    }
    
    public get categoryController() {
    const categoryRepository = new PrismaCategoryRepository();
    const createCategory = new CreateCategory(categoryRepository);
    const listCategories = new ListCategories(categoryRepository);
    const updateCategory = new UpdateCategory(categoryRepository);
    const deleteCategory = new DeleteCategory(categoryRepository);
    const findUserCategories = new FindUserCategories(categoryRepository);
    const categoryController = new CategoryController(
        createCategory,
        listCategories,
        updateCategory,
        deleteCategory,
        findUserCategories
    );
    return categoryController;
}    public get authController() {
        const userRepository = new PrismaUserRepository();
        const authenticate = new Authenticate(userRepository);
        const authController = new AuthController(authenticate, userRepository);
        return authController;
    }
}