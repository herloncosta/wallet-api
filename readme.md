# Wallet API

A **Wallet API** é uma aplicação backend desenvolvida para gerenciar carteiras digitais e transações financeiras. Ela oferece funcionalidades como criação de usuários, autenticação, adição de saldo, transferências entre carteiras e listagem de transações. A API foi construída com **Node.js**, **TypeScript**, **Prisma ORM** e **PostgreSQL**, seguindo boas práticas de desenvolvimento e arquitetura.

---

## Funcionalidades

- **Autenticação**:
  - Registro de novos usuários.
  - Login com geração de token JWT.

- **Carteira**:
  - Adicionar saldo à carteira de um usuário.

- **Transações**:
  - Realizar transferências entre carteiras.
  - Listar transações realizadas por um usuário, com filtro por período de data.

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Adiciona tipagem estática ao JavaScript.
- **Express**: Framework para construção da API.
- **Prisma ORM**: Ferramenta de acesso ao banco de dados com TypeScript.
- **PostgreSQL**: Banco de dados relacional para armazenamento de dados.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **Docker**: Para containerização do banco de dados PostgreSQL.

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- Docker (opcional, para rodar o PostgreSQL localmente)
- PostgreSQL (se não usar Docker)

### Passos para Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/herloncosta/wallet-api.git
   cd wallet-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados:

   - Se estiver usando Docker, inicie o container do PostgreSQL:

     ```bash
     docker-compose up -d
     ```

   - Caso contrário, configure a conexão com o PostgreSQL no arquivo `.env`.

4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor:

   ```bash
   npm start
   ```

   A API estará disponível em `http://localhost:3000`.

---

## Rotas da API

### Autenticação

- **POST /auth/register**: Cria um novo usuário.
  - Body:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```

- **POST /auth/login**: Autentica um usuário e retorna um token JWT.
  - Body:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

### Carteira

- **POST /wallet/add-balance**: Adiciona saldo à carteira do usuário autenticado.
  - Body:
    ```json
    {
      "amount": 100
    }
    ```

### Transações

- **POST /transactions/transfer**: Realiza uma transferência entre carteiras.
  - Body:
    ```json
    {
      "toWalletId": 2,
      "amount": 50
    }
    ```

- **GET /transactions**: Lista as transações do usuário autenticado.
  - Parâmetros opcionais:
    - `startDate`: Data inicial para filtrar transações.
    - `endDate`: Data final para filtrar transações.

---

## Executando os Testes

Para executar os testes, utilize o seguinte comando:

```bash
npm test
```

Para gerar um relatório de cobertura de testes:

```bash
npm run test:coverage
```

---

## Estrutura do Projeto

```
wallet-api/
├── src/
│   ├── controllers/       # Controladores para cada recurso
│   ├── middlewares/       # Middlewares (autenticação, validação)
│   ├── models/            # Modelos do Prisma
│   ├── routes/            # Rotas da API
│   ├── services/          # Lógica de negócio
│   ├── utils/             # Utilitários (geração de token, validações)
│   ├── app.ts             # Configuração do Express
│   └── server.ts          # Inicialização do servidor
├── prisma/                # Configuração do Prisma
├── tests/                 # Testes automatizados
├── .env                   # Variáveis de ambiente
├── docker-compose.yml     # Configuração do Docker
├── jest.config.mjs        # Configuração do Jest
├── tsconfig.json          # Configuração do TypeScript
└── package.json           # Dependências e scripts do projeto
```

---

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.