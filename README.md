# express-mongo

## 📋 Índice
- [📖 Sobre](#-Sobre)
- [🚀 Tecnologias utilizadas](#-Tecnologias-utilizadas)
- [📌 Como executar o projeto](#-Como-executar-o-projeto)
- [🎓 Certificados](#-Certificados)

## 📖 Sobre
Projeto desenvolvido durante os cursos [Node.js: criando uma API Rest com Express e MongoDB](https://cursos.alura.com.br/course/node-js-api-rest-express-mongodb) e [Node.js: lidando com buscas, filtros, paginação e erros em uma API](https://cursos.alura.com.br/course/node-js-buscas-filtros-paginacao-erros-api) da Alura.

## 🚀 Tecnologias utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Docker](https://www.docker.com/)

## 📌 Como executar o projeto

Primeiro é preciso subir uma instância do mongodb:
```bash
docker pull mongo

docker run
  --name express-mongo
  -p 27017:27017
  -e MONGO_INITDB_ROOT_USERNAME=mongoadmin
  -e MONGO_INITDB_ROOT_PASSWORD=password
  -d mongo

docker start express-mongo
```

Crie um arquivo **.env** e defina as variáveis de ambiente:

```
#Environment variables
DB_CONNECTION_STRING
PORT
```

Execute o projeto node:
```bash
npm run dev
```

## 🎓 Certificados
### [Node.js: criando uma API Rest com Express e MongoDB](https://cursos.alura.com.br/certificate/afd38cf9-3cc7-460e-8b5f-2bdaeb52b11e?lang=pt_BR)
![TESTE](alura/Pablwo%20Mattheus%20Ribeiro%20de%20Araújo%20-%20Curso%20Node.js_%20criando%20uma%20API%20Rest%20com%20Express%20e%20MongoDB%20-%20Alura.png)

### [Node.js: lidando com buscas, filtros, paginação e erros em uma API](https://cursos.alura.com.br/certificate/c4993a07-ae89-4776-bd41-90b37c4d9100?lang=pt_BR)
![TESTE](alura/Pablwo%20Mattheus%20Ribeiro%20de%20Araújo%20-%20Curso%20Node.js_%20lidando%20com%20buscas,%20filtros,%20paginação%20e%20erros%20em%20uma%20API%20-%20Alura.png)