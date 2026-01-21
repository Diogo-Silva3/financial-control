const manipulaLista = require('./manipula-lista')
const { allowlist } = require('./redis-client')

module.exports = manipulaLista(allowlist)

