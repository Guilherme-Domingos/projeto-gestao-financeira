// filepath: c:\Users\guina\OneDrive\Documentos\docs\projeto-gastos-pessoais\Clean-gastos-pessoais\src\application\useCases\Transaction\FindTransaction.ts
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { FindTransactionInputDTO, FindTransactionOutputDTO } from "../../dto/transaction/FindTransactionDTO";
import { UseCase } from "../UseCase";

export class FindTransaction implements UseCase<FindTransactionInputDTO, FindTransactionOutputDTO | null> {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    public async execute(inputDto: FindTransactionInputDTO): Promise<FindTransactionOutputDTO | null> {
        const transaction = await this.transactionRepository.findById(inputDto.id);
        
        if (!transaction) {
            return null;
        }

        const outputDTO: FindTransactionOutputDTO = {
            transaction: {
                id: transaction.id,
                date: transaction.date,
                amount: transaction.amount,
                description: transaction.description || "",
                transactionType: transaction.type,
                sender: transaction.sender,
                categoryId: transaction.categoryId,
                userId: transaction.userId
            }
        };

        return outputDTO;
    }
}