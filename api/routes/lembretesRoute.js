const { Router } = require('express')
const notificacoesController = require('../controllers/notificacoesController')
const middlewaresAutenticacao = require('../config/middlewares-autenticacao')

const router = Router()

router
	.post('/lembretes', middlewaresAutenticacao.bearer, notificacoesController.criarLembrete)
	.get('/lembretes', middlewaresAutenticacao.bearer, notificacoesController.listarLembretes)
	.get('/lembretes/proximos', middlewaresAutenticacao.bearer, notificacoesController.lembretesProximos)
	.put('/lembretes/:id/concluir', middlewaresAutenticacao.bearer, notificacoesController.concluirLembrete)

module.exports = router
