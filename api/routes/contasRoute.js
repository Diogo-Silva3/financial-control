const { Router } = require('express')
const contasController = require('../controllers/contasController')
const middlewaresAutenticacao = require('../config/middlewares-autenticacao')

const router = Router()

router
	.post('/contas', middlewaresAutenticacao.bearer, contasController.criarConta)
	.get('/contas', middlewaresAutenticacao.bearer, contasController.listarContas)
	.put('/contas/:id', middlewaresAutenticacao.bearer, contasController.atualizarConta)
	.put('/contas/:id/desativar', middlewaresAutenticacao.bearer, contasController.desativarConta)
	.post('/contas/transferir', middlewaresAutenticacao.bearer, contasController.transferir)

module.exports = router
