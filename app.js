import bodyParser from 'body-parser'
import morgan from 'morgan'
import express from 'express'
import datasource from './config/datasource'
import config from './config/config'


const app = express()

app.config = config
app.datasource = datasource(app)

app.set('port', 3000)

app.use(bodyParser.json())
app.use(morgan('tiny'))


export default app
