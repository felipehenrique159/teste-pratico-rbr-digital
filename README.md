## Aplicação back-end Teste Prático RBR Digital

## Instruções para rodar a aplicação

- Execute o comando: **docker-compose up --build** para subir os contêiner

### Sobre a aplicação

Aplicação Back e front-end para cadastrar, editar e listar funcionario's.

### Tecnologias utilizadas

- ### NodeJS
- ### Typescript
- ### NextJS
- ### MongoDB
- ### Docker

### Rotas da aplicação

### POST http://localhost:3001/api/employees

- Inserir novo funcionário

```json
{
  "nome" : "Felipe",
  "cargo" : "Dev",
  "departamento" : "Desenvolvimento"
}
```

### PUT http://localhost:3001/api/employees/:id

- Atualizar funcionário

```json
{
  "nome" : "Felipe Ananias",
  "cargo" : "Dev",
  "departamento" : "Desenvolvimento"
}
```
### DELETE http://localhost:3001/api/employees/:id

- Excluir um funcionário

### GET http://localhost:3001/api/employees/:id

- listar um funcionário especifico por id

### GET http://localhost:3001/api/employees

- Listar todos funcionários

