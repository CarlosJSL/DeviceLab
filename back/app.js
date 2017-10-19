import bodyParser from 'body-parser'
import morgan from 'morgan'
import express from 'express'
import usersRouter from './routes/users'
import authRouter from './routes/auth'
import datasource from './config/datasource'
import config from './config/config'
import authorization from './auth'

const app = express()

app.config = config
app.datasource = datasource(app)

app.set('port', 3000)

const auth = authorization(app);

app.use(bodyParser.json())
app.use(morgan('tiny'))

app.auth = auth;

usersRouter(app)
authRouter(app)

export default app
