const multer = require('multer')
const path = require('path')

// Configuração para foto de perfil
const storagePerfil = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/perfil/')
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, 'perfil-' + uniqueSuffix + path.extname(file.originalname))
	}
})

// Configuração para comprovantes
const storageComprovantes = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/comprovantes/')
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, 'comprovante-' + uniqueSuffix + path.extname(file.originalname))
	}
})

const uploadPerfil = multer({ 
	storage: storagePerfil,
	limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

const uploadComprovante = multer({ 
	storage: storageComprovantes,
	limits: { fileSize: 10 * 1024 * 1024 } // 10MB
})

module.exports = { uploadPerfil, uploadComprovante }
