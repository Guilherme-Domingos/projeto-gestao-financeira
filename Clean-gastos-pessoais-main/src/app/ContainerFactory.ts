import { Container } from "./Container";
import { setUserDependencies } from "../domain/entities/User";
import { JwtAdapter } from "../infrastructure/security/JwtAdapter";
import { PasswordHasher } from "../infrastructure/security/PasswordHasher";

export class ContainerFactory {
    
    public static createContainer(): Container {
        // Configurar dependências da entidade User
        setUserDependencies(
            new PasswordHasher(),
            new JwtAdapter()
        );
        
        return new Container();
    }
}