## Comandos utilizados na configuração do server

### iniciando server (foi acrescentado a linha "start": "tsdn src/server.ts" para iniciar o servidor só com esse comando abaixo) 
> npm start

### criando server
> npm init -y

### instalando dependencia typescript
> npm install typescript -D

### arquivo de configuraçoes 
> npx tsc --init

### outras dependencias utilizadas 
> npm install ts-node-dev -D

> npm install express
> npm install @types/express -D

> npm install cors
> npm install @types/cors -D

### banco sqlite
> npm install knex sqlite3

### comando pra rodar o knex
> npx knex

### comando para rodar o knex:migrate configurado
> npm run knex:migrate || npx knex --knexfile knexfile.ts migrate:latest

//esse knex pra conexao com banco

--------------- 

## Funcionalidades

### Conexões

- Rota para listar o total de conexões realizadas;
- Rota para criar uma nova conexão;

### Aula

- Rota para criar uma aulas;
- Rota para listar aulas;
    - Filtrar por matéria, dia da semana e horário;