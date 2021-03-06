define({ "api": [
  {
    "type": "post",
    "url": "/api/authenticate",
    "title": "Autenticar o usuário",
    "name": "authAuthenticate",
    "group": "Auth",
    "success": {
      "examples": [
        {
          "title": "Body expected",
          "content": "    HTTP/1.1 200\t  Ok\n{\t\n\t\"email\": \"carlosjleonel@hotmail.com\",\n\t\"password\": \"213\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/apidoc.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserErrorUnprocessableEntity",
            "description": "<p>Algum campo da requisição está incorreto.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotRegistered",
            "description": "<p>Usuário não está cadastrado.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable entity\n{\n  \"message\": \"A senha ou o email está inválido!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n   \"message\": \"Usuário não está cadastrado no sistema!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/isauthenticate",
    "title": "Verificar se o token está válido",
    "name": "authVerifyToken",
    "group": "Auth",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200\t  Ok\n{\n \"message\": \"Usuário está autorizado!\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/apidoc.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenExpired",
            "description": "<p>O token expirou!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/logout",
    "title": "Logout",
    "name": "logout",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id do usuário</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Body expected",
          "content": "   HTTP/1.1 200\t  Ok\n{\n \"id\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200\t  Ok\n{\n \"message\": \"Logout feito com sucesso!\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/apidoc.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenExpired",
            "description": "<p>O token expirou!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n \"Unauthorized\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/signup",
    "title": "Cadastrar o usuário",
    "name": "signup",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do usuário.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email do usuário.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha do usuário.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Body expected",
          "content": "HTTP/1.1 201 OK\n{\n  \"name\": \"carlos\",\n  \"email\": \"carlos@gmail.com\",\n  \"password\": \"123\", \n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201\t  Created\n{\n \"id\": 1,\n \"name\": \"carlos\",\n \"password\": \"$2a$10$lRGjBBuaMb1ldaEUVT8C.OrPSTlrXRxzpcPMqKAAhJyiz8.w5xJr2\",\n \"email\": \"carlosjleonel@hotmail.com\",\n \"updated_at\": \"2017-10-22T16:19:48.461Z\",\n \"created_at\": \"2017-10-22T16:19:48.461Z\",\n \"lastAccess\": \"2017-10-22T16:19:48.553Z\",\n \"privateKey\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/apidoc.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserErrorUnprocessableEntity",
            "description": "<p>Algum campo da requisição está incorreto.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserInvalid",
            "description": "<p>Usuário já está cadastrado no sistema.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable entity\n{\n  \"message\": \"A senha ou o email está inválido!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n[{\n  \"message\": \"Usuário já está cadastrado no sistema!\"\n}]",
          "type": "json"
        }
      ]
    }
  }
] });
