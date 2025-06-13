# Clean-gastos-pessoais
Implementação de funcionalidades de um sistema de gestão financeiro pessoal com arquitetura limpa.

## Autenticação JWT

O sistema implementa autenticação JWT (JSON Web Token) para proteger as rotas e recursos. A implementação inclui:

1. **Login de Usuário**: Endpoint `/auth/login` para autenticação com email e senha
2. **Logout de Usuário**: Endpoint `/auth/logout` para encerrar a sessão
3. **Refresh Token**: Endpoint `/auth/refresh-token` para renovar tokens expirados
4. **Middleware de Autenticação**: Proteção de rotas sensíveis

### Como funciona

1. O usuário envia credenciais (email/senha) para `/auth/login`
2. O sistema valida as credenciais e retorna um token JWT
3. O cliente deve incluir o token em todas as requisições subsequentes no formato:
   ```
   Authorization: Bearer {token}
   ```
4. As rotas protegidas verificam o token antes de permitir acesso

### Configuração

As configurações de JWT estão no arquivo `.env`:
- `JWT_SECRET`: Chave secreta para assinar tokens
- `JWT_EXPIRATION`: Tempo de expiração dos tokens (padrão: 1h)

Para iniciar o desenvolvimento, copie o arquivo `.env.example` para `.env`:
```
cp .env.example .env
```
