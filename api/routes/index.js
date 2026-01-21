const bodyParser = require('body-parser')
const despesas = require('./despesasRoute')
const receitas = require('./receitasRoute')
const relatorio = require('./relatoriosRoute')
const usuarios = require('./usuariosRoute')
const perfil = require('./perfilRoute')
const contas = require('./contasRoute')
const tags = require('./tagsRoute')
const anexos = require('./anexosRoute')
const lembretes = require('./lembretesRoute')
const recuperacaoSenha = require('./recuperacaoSenhaRoute')
const estrategiasAutenticacao = require('../config/estrategia-autenticacao')
const middlewaresAutenticacao = require('../config/middlewares-autenticacao')

module.exports = app => {
	app.use(bodyParser.json())
	
	// Rotas existentes
	app.use(despesas)
	app.use(receitas)
	app.use(relatorio)
	app.use(usuarios)
	
	// Novas rotas
	app.use(perfil)
	app.use(contas)
	app.use(tags)
	app.use(anexos)
	app.use(lembretes)
	app.use(recuperacaoSenha)
	
	estrategiasAutenticacao,
	middlewaresAutenticacao
}