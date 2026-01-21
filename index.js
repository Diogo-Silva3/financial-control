const app = require('./api/app')
require('dotenv').config()
require('./api/redis/redis-client')
require('./api/redis/blocklist-access-token')
require('./api/redis/allowlist-refresh-token')

const port = 3001

app.listen(port, () => console.log(`Servidor funcionando na porta ${port}`))
