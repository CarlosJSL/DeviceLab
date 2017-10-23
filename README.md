<p align="center">
  <img src="http://www.devicelab.com.br/img/logo_face600x315.jpg" width="600" height="300"/>
</p>

# DeviceLab 
Uma API REST para realizar autenticação via token integrada com uma aplicação web

## Funcionalidades
- [X] Gerar token
- [X] Invalidar Token
- [X] Expirar Token
- [X] Cadastro de usuário


## Estrutura do diretório
```sh
.
├── config
│	└── config.js
│	└── datasource.js
├── controllers
│   ├── user.js
│   ├── auth.js 
│    
├── models
│   ├── user.js
│      
├── routes
│	└── person.js
│	└── auth.js
├── tests
├── app.js
└── index.js
└── package.json
```


## Tecnologias
- ES6
- Babel
- NodeJS
- Express
- Sequelize
- SQLite
- Angular 4
- SASS
- eslint

## Refrência da api
Entre na pasta server/documentation e acesse o arquivo index.html para mais informações

### User
|      METODO      |     ENDPOINT              |        FUNÇÃO                                    
|------------------|---------------------------|----------------------
| POST             | /api/signup               | Cadastrar usuário


### Auth
|      METODO      |     ENDPOINT              |        FUNÇÃO                                    
|------------------|---------------------------|-----------------------
| POST             | /api/logout               | Invalida o token do usuário
| GET              | /api/isauthenticate       | Informa se o token do usuário é válido
| POST             | /api/authenticate         | Autentica o usuário no sistema



## Heroku
Você pode ver a aplicação front-end rodando no heroku (http://devlab-front.herokuapp.com)

Já a API REST você pode ver clicando nesse link (http://devlab-api.herokuapp.com)

<p align="center">
  <img src="https://blog.phusion.nl/content/images/2016/07/Heroku.png" width="650"/>
</p>


## Rodando localmente


Você primeiramente precisará instalar o SQLite3 

```sh
> sudo add-apt-repository ppa:jonathonf/backports
> sudo apt-get update && sudo apt-get install sqlite3
```

Depois fazer o download do NodeJs
```sh
> sudo apt-get update
> sudo apt-get install nodejs
```

Clonar o projeto
```sh
> git clone https://gitlab.com/carlosjsl95/survivorProject.git
```

Instalar as dependências do projeto(tanto da pasta client quanto da pastar server)
```sh
> npm i
```

E por fim, rodar o projeto localmente
```
> npm start (pasta server)
> npm serve (pasta cliente)
```

Então acesse `http://localhost:3000/api/{endpoint_name}` para ter acesso a API REST

Ou então acesse `http://localhost:4200` para ter acesso a aplicação web

## Testes
Voce pode rodar os testes com o seguinte comando
```
> npm test-unit
```
