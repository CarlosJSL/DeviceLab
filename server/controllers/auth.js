import HttpStatus from 'http-status'
import jwt from 'jsonwebtoken'


const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
})

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode)

class AuthController {
  constructor(User) {
    this.user = User
  }

  async authenticate(req, res, Users) {

    const userAuthenticate = await this.userAlreadyExists(req);

    this.user.update({ lastAccess: userAuthenticate.lastAccess, 
                       privateKey :userAuthenticate.privateKey}, 
                     { where: { id: userAuthenticate.id } })
              .then((userUpdated) => {

                    res.setHeader('AUTH-TOKEN', jwt.sign(userAuthenticate.payload,  
                                  userAuthenticate.privateKey, { expiresIn: '5m' }))
                    res.json({message: 'autenticação realizada com sucesso!'})
              })
              .catch(err => err)
  }

  async userAlreadyExists(req){
    if (req.body.email && req.body.password) {
      const email = req.body.email
      const password = req.body.password

     return this.user.findOne({ where: { email } })
        .then((user) => {
          
          if (user == null) {
            res.status(HttpStatus.FORBIDDEN)
            res.json({message:'Usuário não está cadastrado no sistema!'})
          } else if (user._modelOptions.classMethods.isPassword(user.password, password)) {
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              lastAccess: user.lastAccess,
              created_at: user.created_at
            }

            user.lastAccess = new Date()
            user.privateKey = Math.random().toString(36)
            return {lastAccess:user.lastAccess,privateKey:user.privateKey,id:user.id, payload:payload }  
            
          } else {
            res.status(HttpStatus.UNAUTHORIZED)
            res.json('A senha está incorreta!')
            throw new Error('A senha ou email estão incorretos!')
          }
        })
        .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED))
    } else {
      
      res.json({message:'A senha ou email estão incorretos!!'})
      res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      throw new Error('A senha ou email estão incorretos!')
    }
  }
}
export default AuthController
