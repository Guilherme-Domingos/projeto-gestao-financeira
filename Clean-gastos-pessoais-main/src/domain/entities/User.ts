import { IPasswordHasher } from '../services/IPasswordHasher';
import { IAuthTokenService, TokenPayload } from '../services/IAuthTokenService';

export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
};

// Variáveis para armazenar as implementações das interfaces
let passwordHasher: IPasswordHasher;
let authTokenService: IAuthTokenService;

// Função para injeção de dependências
export function setUserDependencies(
    passwordHasherImpl: IPasswordHasher,
    authTokenServiceImpl: IAuthTokenService
) {
    passwordHasher = passwordHasherImpl;
    authTokenService = authTokenServiceImpl;
}

export class User {
    private constructor(
        private props: UserProps,
    ){}    
    
    public static async create(name: string, email: string, password: string): Promise<User> {
        if (!name || name.length < 3) {
            throw new Error('O nome deve ter pelo menos 3 caracteres');
        }
        if (!email || !email.includes('@')) {
            throw new Error('Email inválido');
        }
        
        // Password não foi hasheado ainda
        return new User({ id: crypto.randomUUID(), name, email, password });
    }

    public static fromPersistentData(props: UserProps): User {
        return new User(props);
    }

    public toPersistentData(): UserProps {
        return this.props;
    }

    public async generateAuthToken(): Promise<string> {
        if (!authTokenService) {
            throw new Error('AuthTokenService não foi configurado. Use setUserDependencies para configurar.');
        }
        
        const payload: TokenPayload = {
            userId: this.id,
            email: this.email,
            name: this.name
        };
        
        return authTokenService.generateToken(payload);
    }

    public setPassword(password: string): void {
        this.props.password = password;
    }

    public async verifyPassword(plainPassword: string): Promise<boolean> {
        if (!passwordHasher) {
            throw new Error('PasswordHasher não foi configurado. Use setUserDependencies para configurar.');
        }
        
        return await passwordHasher.compare(plainPassword, this.password);
    }    get id(): string {
        return this.props.id;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }
}