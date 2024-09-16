
# Brain ag test

API para manutenção de cadastro de produtor rural


## Instalação

Instale as dependencias do projeto

```bash
  cd brain-ag-test
  npm install
```
Rode a migração     

```bash
  npx prisma migrate dev
```

Populando o banco de dados    

```bash
  npx prisma db seed
```
## Executando

Para executar o projeto execute o comando    

```bash
  npm run start:dev
```