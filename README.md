## Aplicação back-end Teste Prático RBR Digital

## Instruções para rodar a aplicação em docker

- Execute o comando: **docker-compose up --build** para subir os contêiner

## Instruções para rodar a aplicação em local

Rodar localmente é comum termos problemas com versão das ferramentas, recomendo o uso do docker, mas vamos lá,
Para rodar a aplicação localmente é simples, só tem um detalhe, na pasta de **api/src/index.ts**
altere a string de conexão do mongo que está em usando o nome do container **mongodb** para o **localhost**: 

mongoose.connect('mongodb://localhost:27017/nodeapi')

- Acesse a pasta api e execute o comando **npm run start** para subir a aplicação local
- Acesse a pasta front e execute o comando **npm run dev** para subir a aplicação local

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

