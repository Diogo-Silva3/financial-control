const { Router } = require('express')
const anexosController = require('../controllers/anexosController')
const middlewaresAutenticacao = require('../config/middlewares-autenticacao')
const { uploadComprovante } = require('../config/multer')

const router = Router()

router
	.post('/anexos', middlewaresAutenticacao.bearer, uploadComprovante.single('comprovante'), anexosController.uploadComprovante)
	.get('/anexos/:tipo/:itemId', middlewaresAutenticacao.bearer, anexosController.listarAnexos)
	.delete('/anexos/:id', middlewaresAutenticacao.bearer, anexosController.removerAnexo)

module.exports = router
