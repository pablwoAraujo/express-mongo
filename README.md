# express-mongo

Curso de Node.js: criando uma API Rest com Express e MongoDB

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
