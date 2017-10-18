import HttpStatus from 'http-status';
//import jwt from 'jwt-simple';
const jwt = require('jsonwebtoken');

export default app => {
  const config = app.config;
  const Users = app.datasource.models.Users;

  app.post('/authenticate', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      Users.findOne({ where: { email } })
      .then(user => {

        if (user._modelOptions.classMethods.isPassword(user.password, password)) {
          const payload = { id: user.id, name: user.name, email:user.email };
          
          res.setHeader("AUTH-TOKEN", jwt.sign(payload, config.jwtSecret, { expiresIn: '1m' }))
          res.json({
            message: "autenticação realizada com sucesso!",
          });
        } else {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
      })
      .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });
};