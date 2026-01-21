const express = require('express')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const swaggerDocs = require('../swagger/swagger.json')

const app = express()

// Configuração CORS - DEVE VIR PRIMEIRO!
app.use(cors({
	origin: ['https://financial-control1.web.app', 'https://financial-control1.firebaseapp.com', 'http://localhost:3000', 'http://127.0.0.1:3000'],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
	exposedHeaders: ['Authorization'],
	credentials: true,
	preflightContinue: false,
	optionsSuccessStatus: 204
}))

// Middleware para adicionar headers CORS manualmente (fallback)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	res.header('Access-Control-Expose-Headers', 'Authorization')
	res.header('Access-Control-Allow-Credentials', 'true')
	
	// Responder OPTIONS requests imediatamente
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204)
	}
	next()
})

app.use(express.static('./front'))

// Servir arquivos de upload
app.use('/uploads', express.static('uploads'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

routes(app)

module.exports = app
