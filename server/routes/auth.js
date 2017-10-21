import HttpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import AuthController from '../controllers/auth'

export default (app) => {
  const Users = app.datasource.models.Users
  const authController = new AuthController(app.datasource.models.Users)   

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
        authController.authenticate(req, res)

  })
}
