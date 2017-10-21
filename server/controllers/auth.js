import HttpStatus from 'http-status'

import jwt  from 'jsonwebtoken'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
})

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode)

class AuthController {
  constructor(Auth) {
    this.Auth = Auth
  }

    authenticate(req,res,Users) {
        if (req.body.email && req.body.password) {
            const email = req.body.email
            const password = req.body.password
      
            Users.findOne({ where: { email } })
              .then((user) => {
                if (user == null) {
                  res.status(HttpStatus.FORBIDDEN)
                  res.send('Usuário não está cadastrado no sistema!')
                } else if (user._modelOptions.classMethods.isPassword(user.password, password)) {
                  const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    lastAccess: user.lastAccess,
                    created_at: user.created_at
                  }
      
                  user.lastAccess = new Date()
                  Users.update({ lastAccess: user.lastAccess }, { where: { id: user.id } })
                    .then((user) => {
                    
                      res.setHeader('AUTH-TOKEN', jwt.sign(payload, config.jwtSecret, { expiresIn: '1m' }))  
                      return res.send({
                        message: 'autenticação realizada com sucesso!',
                      })
                    })
                    .catch(err => err)
                } else {
                  res.status(HttpStatus.UNAUTHORIZED)
                  return res.send('A senha está incorreta!')
                }
              })
              .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED))
          } else {
            res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
          }
    }
}
export default AuthController
