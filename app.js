import bodyParser from 'body-parser'
import morgan from 'morgan'
import express from 'express'

const app = express()
app.set('port', 3000)

app.use(bodyParser.json())
app.use(morgan('tiny'))


export default app
