import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateUserInputDTO } from "../../dto/user/CreateUserInputDTO";
import { CreateUserOutPutDTO } from "../../dto/user/CreateUserOutPutDTO";
import { UseCase } from "../UseCase";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";

export class CreateUser implements UseCase<CreateUserInputDTO, CreateUserOutPutDTO> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: IPasswordHasher
    ) {}

    public async execute(inputDto: CreateUserInputDTO): Promise<CreateUserOutPutDTO> {
        // Verificar se já existe um usuário com este email
        const existingUser = await this.userRepository.findByEmail(inputDto.email);
        if (existingUser) {
            throw new Error('Já existe um usuário com este email');
        }
        
        // Criar o usuário
        const user = await User.create(inputDto.name, inputDto.email, inputDto.password);
        
        // Hash da senha antes de salvar
        const hashedPassword = await this.passwordHasher.hash(inputDto.password);
        user.setPassword(hashedPassword);
        
        // Salvar o usuário
        await this.userRepository.save(user);

        const outputDTO: CreateUserOutPutDTO = { id: user.id };
        return outputDTO;
    }
}