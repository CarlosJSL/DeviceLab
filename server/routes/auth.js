import HttpStatus from 'http-status'
import jwt from 'jsonwebtoken'

export default (app) => {
  const config = app.config
  const Users = app.datasource.models.Users

  app.route('/isauthenticate',)
    .all(app.auth.authenticate())
    .get((req, res) => {
      res.send("Usuário está autorizado!")
      
    })
    
  app.route('/signout/:id',)
    .all(app.auth.authenticate())
    .get((req, res) => {
       Users.update({privateKey:''}, { where: { id: req.params.id } })
            .then(user => {
                res.json({
                  message: 'logout feito com sucesso!',
                })
            })
            .catch( err => err)
    })

  app.post('/authenticate', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email
      const password = req.body.password

      Users.findOne({ where: { email } })
        .then((user) => {
          
          if (user == null) {
            res.status(HttpStatus.FORBIDDEN)
            res.json('Usuário não está cadastrado no sistema!')
          } else if (user._modelOptions.classMethods.isPassword(user.password, password)) {
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              lastAccess: user.lastAccess,
              created_at: user.created_at
            }

            user.lastAccess = new Date()
            user.privateKey = Math.random().toString(36).substring(7)

            Users.update({ lastAccess: user.lastAccess, 
                           privateKey :user.privateKey}, 
                           { where: { id: user.id } })

              .then((userUpdated) => {
                
                res.setHeader('AUTH-TOKEN', jwt.sign(payload,  user.privateKey, { expiresIn: '5m' }))
                res.json({
                  message: 'autenticação realizada com sucesso!',
                })
              })
              .catch(err => err)
          } else {
            res.status(HttpStatus.UNAUTHORIZED)
            res.json('A senha está incorreta!')
          }
        })
        .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED))
    } else {
      res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    }
  })
}
