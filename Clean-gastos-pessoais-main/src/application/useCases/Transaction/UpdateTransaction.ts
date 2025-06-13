import { Transaction } from '../../../domain/entities/Transaction';
import { TransactionRepository } from '../../../domain/repositories/TransactionRepository';
import { UpdateTransactionInputDTO } from '../../dto/transaction/UpdateTransactionInputDTO';
import { UpdateTransactionOutputDTO } from '../../dto/transaction/UpdateTransactionOutputDTO';
import { UseCase } from '../UseCase';

export class UpdateTransaction implements UseCase<UpdateTransactionInputDTO, UpdateTransactionOutputDTO> {
    constructor(private transactionRepository: TransactionRepository) {}

    async execute(input: UpdateTransactionInputDTO): Promise<UpdateTransactionOutputDTO> {
        try {
            const existingTransaction = await this.transactionRepository.findById(input.id);
            
            if (!existingTransaction) {
                return {
                    id: input.id,
                    success: false,
                    message: 'Transaction not found'
                };
            }
            
            // Obter os dados atuais da transação
            const currentProps = existingTransaction.toPersistentData();
            
            // Criar uma nova transação com os dados atualizados
            const updatedTransaction = Transaction.fromPersistentData({
                id: currentProps.id,
                date: input.date ?? currentProps.date,
                amount: input.amount ?? currentProps.amount,
                description: input.description ?? currentProps.description,
                type: input.type ?? currentProps.type,
                sender: input.sender ?? currentProps.sender,
                userId: input.userId ?? currentProps.userId,
                categoryId: input.categoryId ?? currentProps.categoryId
            });
            
            await this.transactionRepository.update(updatedTransaction);
            
            return {
                id: updatedTransaction.id,
                success: true,
                message: 'Transaction updated successfully'
            };
        } catch (error) {
            console.error('Error updating transaction:', error);
            return {
                id: input.id,
                success: false,
                message: 'Failed to update transaction'
            };
        }
    }
}
