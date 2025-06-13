import { Transaction } from "../../../domain/entities/Transaction";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { FindUserTransactionsInputDTO, FindUserTransactionsOutputDTO } from "../../dto/transaction/FindUserTransactionsDTO";
import { UseCase } from "../UseCase";

export class FindUserTransactions implements UseCase<FindUserTransactionsInputDTO, FindUserTransactionsOutputDTO> {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    public async execute(inputDto: FindUserTransactionsInputDTO): Promise<FindUserTransactionsOutputDTO> {
        const transactions = await this.transactionRepository.findByUserId(inputDto.userId);
        
        return {
            transactions: this.mapTransactionsToOutput(transactions)
        };
    }

    private mapTransactionsToOutput(transactions: Transaction[]): FindUserTransactionsOutputDTO["transactions"] {
        return transactions.map((transaction) => {
            return {
                id: transaction.id,
                date: transaction.date,
                amount: transaction.amount,
                description: transaction.description || "",
                transactionType: transaction.type,
                sender: transaction.sender,
                categoryId: transaction.categoryId,
                userId: transaction.userId
            };
        });
    }
}
