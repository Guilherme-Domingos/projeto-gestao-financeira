import { Transaction } from "../../../domain/entities/Transaction";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { ListTransactionInputDTO } from "../../dto/transaction/ListTransactionDTO";
import { ListTransactionOutputDTO } from "../../dto/transaction/ListTransactionDTO";
import { UseCase } from "../UseCase";

export class ListTransactions implements UseCase<ListTransactionInputDTO, ListTransactionOutputDTO> {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    public async execute(inputDto: ListTransactionInputDTO): Promise<ListTransactionOutputDTO> {
        const transactions = await this.transactionRepository.findAll();

        const outputDTO: ListTransactionOutputDTO = this.presentOutput(transactions);

        return outputDTO;
    }

    private presentOutput(transactions: Transaction[]): ListTransactionOutputDTO {
        return {
            transactions: transactions.map((transaction) => {
                return {
                    id: transaction.id,
                    date: transaction.date,
                    amount: transaction.amount,
                    description: transaction.description || "",
                    transactionType: transaction.type,
                    sender: transaction.sender,
                    categoryId: transaction.categoryId || 0
                };
            }),
        };
    }
}