import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { DeleteTransactionInputDTO } from "../../dto/transaction/DeleteTransactionDTO";
import { DeleteTransactionOutputDTO } from "../../dto/transaction/DeleteTransactionDTO";
import { UseCase } from "../UseCase";

export class DeleteTransaction implements UseCase<DeleteTransactionInputDTO, DeleteTransactionOutputDTO> {
    constructor(private transactionRepository: TransactionRepository) {}

    async execute(inputDTO: DeleteTransactionInputDTO): Promise<DeleteTransactionOutputDTO> {
        try {
            const op = await this.transactionRepository.delete(inputDTO.id);

            const outputDTO: DeleteTransactionOutputDTO = this.presentOutput(inputDTO.id);
            return outputDTO
        } catch (error) {
             throw new Error(`Erro ao deletar transação: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    }

    private presentOutput(id: String): DeleteTransactionOutputDTO {
        return {
            success: true,
            message: `Transação com ID ${id} deletado com sucesso`
        };
    }
}