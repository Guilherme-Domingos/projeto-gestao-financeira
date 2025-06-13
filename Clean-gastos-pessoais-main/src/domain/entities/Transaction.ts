export type TransactionProps = {
    id: string;
    date: Date;
    amount: number;
    description?: string;
    type: 'RECEITA' | 'DESPESA';
    sender?: string;
    userId: string;
    categoryId?: number;
}

export class Transaction {
    private constructor(
            private props: TransactionProps,
    ){}    
    
    public static create(
        date: Date, 
        amount: number, 
        description: string | undefined, 
        type: 'RECEITA' | 'DESPESA', 
        sender: string | undefined, 
        userId: string,
        categoryId?: number
    ): Transaction {
        // Validar se a data não está no futuro
        const currentDate = new Date();
        const inputDate = new Date(date);
        if (inputDate > currentDate) {
            throw new Error('Data da transação não pode ser no futuro');
        }
        
        return new Transaction({ 
            id: crypto.randomUUID(), 
            date, 
            amount, 
            description, 
            type, 
            sender, 
            userId,
            categoryId 
        });
    }

    public static fromPersistentData(props: TransactionProps): Transaction {
        return new Transaction(props);
    }
    
    public toPersistentData(): TransactionProps {
        return this.props;
    }

    get id(): string {
        return this.props.id;
    }

    get date(): Date {
        return this.props.date;
    }

    get amount(): number {
        return this.props.amount;
    }

    get description(): string | undefined {
        return this.props.description;
    }

    get type(): 'RECEITA' | 'DESPESA' {
        return this.props.type;
    }

    get sender(): string | undefined {
        return this.props.sender;
    }    get categoryId(): number | undefined {
        return this.props.categoryId;
    }

    get userId(): string {
        return this.props.userId;
    }
}