const { Router } = require('express')
const recuperacaoSenhaController = require('../controllers/recuperacaoSenhaController')
const middlewaresAutenticacao = require('../config/middlewares-autenticacao')

const router = Router()

router
	.post('/usuarios/recuperar-senha', recuperacaoSenhaController.solicitarRecuperacao)
	.post('/usuarios/redefinir-senha/:token', middlewaresAutenticacao.verificacaoEmail, recuperacaoSenhaController.redefinirSenha)

module.exports = router
