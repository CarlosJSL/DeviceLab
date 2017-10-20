import HttpStatus from 'http-status';
const jwt = require('jsonwebtoken');

export default app => {
  const config = app.config;
  const Users = app.datasource.models.Users;

  app.route('/isauthenticate')
  .all(app.auth.authenticate())
  .get((req, res) => {
        res.send("Permissão válida")
        res.status(200)
  })

  app.post('/authenticate', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      Users.findOne({ where: { email } })
      .then(user => {

        if(user == null){
          res.status(HttpStatus.FORBIDDEN);
          res.json("Usuário não está cadastrado no sistema!")

        }else if (user._modelOptions.classMethods.isPassword(user.password, password)) {
          const payload = { id: user.id, 
                            name: user.name, 
                            email:user.email,
                            lastAccess:user.lastAccess  };
          
          res.setHeader("AUTH-TOKEN", jwt.sign(payload, config.jwtSecret, { expiresIn: '1m' }))
          res.json({
            message: "autenticação realizada com sucesso!",
          });
        } else {
          res.status(HttpStatus.UNAUTHORIZED);
          res.json("A senha está incorreta!")
        }
      })
      .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY);
    }
  });
};