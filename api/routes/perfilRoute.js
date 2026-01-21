const { Router } = require('express')
const perfilController = require('../controllers/perfilController')
const middlewaresAutenticacao = require('../config/middlewares-autenticacao')
const { uploadPerfil } = require('../config/multer')

const router = Router()

router
	.post('/perfil/foto', middlewaresAutenticacao.bearer, uploadPerfil.single('foto'), perfilController.uploadFotoPerfil)
	.delete('/perfil/foto', middlewaresAutenticacao.bearer, perfilController.removerFotoPerfil)
	.get('/perfil', middlewaresAutenticacao.bearer, perfilController.obterPerfil)

module.exports = router
