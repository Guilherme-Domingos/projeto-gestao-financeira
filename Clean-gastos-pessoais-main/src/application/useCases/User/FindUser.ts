import { UserRepository } from "../../../domain/repositories/UserRepository";
import { FindUserInputDTO, FindUserOutputDTO } from "../../dto/user/FindUserDTO";
import { UseCase } from "../UseCase";

export class FindUser implements UseCase<FindUserInputDTO, FindUserOutputDTO | null> {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(inputDto: FindUserInputDTO): Promise<FindUserOutputDTO | null> {
        const user = await this.userRepository.findById(inputDto.id);
        
        if (!user) {
            return null;
        }

        const outputDTO: FindUserOutputDTO = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };

        return outputDTO;
    }
}