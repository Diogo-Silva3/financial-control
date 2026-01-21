const http = require('http');
const app = require('./api/app')
const { exec } = require('child_process')
require('dotenv').config()

const endereco = process.env.BASE_URL || 'localhost:3000'
const regex = /[0-9]+$/gm
const portMatch = regex.exec(endereco)
const port = process.env.PORT || (portMatch ? portMatch[0] : 3000)

// Função para executar migrations
async function executarMigrations() {
	return new Promise((resolve, reject) => {
		console.log('🔄 Verificando banco de dados...')
		
		// Só executar migrations em produção se DATABASE_URL existir
		if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
			console.log('🔄 Executando migrations...')
			exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
				if (error) {
					console.warn('⚠️  Aviso ao executar migrations:', error.message)
					// Não falhar se migrations derem erro (tabelas podem já existir)
					resolve()
					return
				}
				if (stdout) console.log('✅ Migrations:', stdout)
				if (stderr) console.warn('⚠️  Stderr:', stderr)
				console.log('✅ Banco de dados atualizado!')
				resolve()
			})
		} else {
			console.log('ℹ️  Modo desenvolvimento - pulando migrations automáticas')
			resolve()
		}
	})
}

// Inicializar servidor
async function iniciarServidor() {
	try {
		// Executar migrations primeiro
		await executarMigrations()
		
		// Carregar e conectar Redis
		console.log('🔄 Conectando ao Redis...')
		await require('./api/redis/redis-client')
		console.log('✅ Redis conectado!')
		
		// Aguardar um pouco para garantir que conectou
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		// Iniciar servidor HTTP
		http.createServer(app).listen(port, function() {
			console.log('✅ Servidor funcionando na porta', port)
			console.log('🌐 Acesse:', endereco)
			console.log('🚀 Sistema online!')
		})
	} catch (err) {
		console.error('❌ Erro ao iniciar servidor:', err)
		process.exit(1)
	}
}

iniciarServidor()
