const { Router } = require('express')
const tagsController = require('../controllers/tagsController')
const middlewaresAutenticacao = require('../config/middlewares-autenticacao')

const router = Router()

router
	.post('/tags', middlewaresAutenticacao.bearer, tagsController.criarTag)
	.get('/tags', middlewaresAutenticacao.bearer, tagsController.listarTags)
	.post('/tags/item', middlewaresAutenticacao.bearer, tagsController.adicionarTagItem)
	.delete('/tags/item/:id', middlewaresAutenticacao.bearer, tagsController.removerTagItem)
	.get('/tags/:tipo/:itemId', middlewaresAutenticacao.bearer, tagsController.listarTagsItem)

module.exports = router
