export type MonthlyGoalProps = {
    id: number;
    valorLimite: number;
    mes: number;
    ano: number;
    userId: string;
}

export class MonthlyGoal {
    private constructor(
            private props: MonthlyGoalProps,
    ){}    public static create(userId: string, valorLimite: number, mes: number, ano: number): MonthlyGoal {
        return new MonthlyGoal({ id: 0, userId, valorLimite, mes, ano });
    }

    public static fromPersistentData(props: MonthlyGoalProps): MonthlyGoal {
        return new MonthlyGoal(props);
    }
    
    public toPersistentData(): MonthlyGoalProps {
        return this.props;
    }    get id(): number {
        return this.props.id;
    }
    get userId(): string {
        return this.props.userId;
    }
    get valorLimite(): number {
        return this.props.valorLimite;
    }
    get mes(): number {
        return this.props.mes;
    }
    get ano(): number {
        return this.props.ano;
    }
}