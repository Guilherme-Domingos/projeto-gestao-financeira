import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ListUserInputDTO } from "../../dto/user/ListUserDTO";
import { ListUserOutPutDTO } from "../../dto/user/ListUserDTO";
import { UseCase } from "../UseCase";

export class ListUsers implements UseCase<ListUserInputDTO, ListUserOutPutDTO> {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(inputDto: ListUserInputDTO): Promise<ListUserOutPutDTO> {
        const users = await this.userRepository.findAll();

        const outputDTO: ListUserOutPutDTO = this.presentOutput(users);

        return outputDTO;
    }

    private presentOutput(users: User[]): ListUserOutPutDTO {
        return {
            users: users.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }),
        };
    }
}