const redis = require('redis')

// Cliente para blocklist
const blocklist = redis.createClient({
	socket: {
		host: '127.0.0.1',
		port: 6379
	}
})

blocklist.on('error', (err) => console.log('Redis Blocklist Error:', err))
blocklist.on('connect', () => console.log('Redis Blocklist conectado!'))

// Cliente para allowlist
const allowlist = redis.createClient({
	socket: {
		host: '127.0.0.1',
		port: 6379
	}
})

allowlist.on('error', (err) => console.log('Redis Allowlist Error:', err))
allowlist.on('connect', () => console.log('Redis Allowlist conectado!'))

// Conectar ambos
async function conectarRedis() {
	try {
		await blocklist.connect()
		await allowlist.connect()
		console.log('✅ Redis conectado com sucesso!')
	} catch (err) {
		console.error('❌ Erro ao conectar Redis:', err)
	}
}

conectarRedis()

module.exports = { blocklist, allowlist }
