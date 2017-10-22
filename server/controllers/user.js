import HttpStatus from 'http-status'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
})

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode)

class UsersController {
  constructor(Users) {
    this.Users = Users
  }

  create(data) {
    return this.Users.findOrCreate({
      where: { email: data.email },
      defaults: { name: data.name, password: data.password },
    })
      .then((result) => {
        
        if (result[1]) {
          
          return defaultResponse(result, HttpStatus.CREATED)
        }else{
         
        return errorResponse('Usuário já está cadastrado!', HttpStatus.BAD_REQUEST)
        }
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY))
  }
}

export default UsersController
