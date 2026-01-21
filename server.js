const http = require('http');
const app = require('./api/app')
require('dotenv').config()

const endereco = process.env.BASE_URL
const regex = /[0-9]+$/gm
const port = (regex.exec(endereco))[0]

// Inicializar Redis antes de iniciar o servidor
async function iniciarServidor() {
	try {
		// Carregar e conectar Redis
		await require('./api/redis/redis-client')
		
		// Aguardar um pouco para garantir que conectou
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		// Iniciar servidor HTTP
		http.createServer(app).listen(port, function() {
			console.log(`Servidor funcionando na porta ${port}`)
			console.log(`Acesse: http://${endereco}`)
		})
	} catch (err) {
		console.error('Erro ao iniciar servidor:', err)
		process.exit(1)
	}
}

iniciarServidor()
