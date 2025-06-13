import { Transaction } from "../../../domain/entities/Transaction";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { CreateTransactionInputDTO } from "../../dto/transaction/CreateTransactionInputDTO";
import { CreateTransactionOutputDTO } from "../../dto/transaction/CreateTransactionOutputDTO";
import { UseCase } from "../UseCase";

export class CreateTransaction implements UseCase<CreateTransactionInputDTO, CreateTransactionOutputDTO> {
    constructor(private readonly transactionRepository: TransactionRepository) {}    
    
    public async execute(inputDto: CreateTransactionInputDTO): Promise<CreateTransactionOutputDTO> {
        const transaction = Transaction.create(
            inputDto.date,
            inputDto.amount,
            inputDto.description,
            inputDto.type,
            inputDto.sender,
            inputDto.userId,
            inputDto.categoryId
        );
        
        await this.transactionRepository.save(transaction);

        const outputDTO: CreateTransactionOutputDTO = {id: transaction.id};
        return outputDTO;
    }
}