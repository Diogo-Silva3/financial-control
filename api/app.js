const express = require('express')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const swaggerDocs = require('../swagger/swagger.json')

const app = express()

app.use(express.static('./front'))

// Servir arquivos de upload
app.use('/uploads', express.static('uploads'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// Configuração CORS
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
	exposedHeaders: ['Authorization'],
	credentials: true
}))

routes(app)

module.exports = app
