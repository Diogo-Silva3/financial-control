const database = require('../models')
const path = require('path')
const fs = require('fs').promises

class PerfilController {
	
	// Upload de foto de perfil
	static async uploadFotoPerfil(req, res) {
		try {
			const userId = req.user.id
			
			if (!req.file) {
				return res.status(400).json({ erro: 'Nenhuma imagem foi enviada' })
			}

			// Validar tipo de arquivo
			const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
			if (!tiposPermitidos.includes(req.file.mimetype)) {
				return res.status(400).json({ 
					erro: 'Formato inválido. Use: JPG, PNG ou GIF' 
				})
			}

			// Validar tamanho (máx 5MB)
			if (req.file.size > 5 * 1024 * 1024) {
				return res.status(400).json({ 
					erro: 'Imagem muito grande. Máximo: 5MB' 
				})
			}

			const usuario = await database.Usuarios.findByPk(userId)
			
			// Remover foto antiga se existir
			if (usuario.fotoPerfil) {
				const caminhoAntigo = path.join(__dirname, '../../', usuario.fotoPerfil)
				try {
					await fs.unlink(caminhoAntigo)
				} catch (err) {
					console.log('Erro ao remover foto antiga:', err.message)
				}
			}

			const caminhoFoto = `/uploads/perfil/${req.file.filename}`
			
			await database.Usuarios.update(
				{ fotoPerfil: caminhoFoto },
				{ where: { id: userId } }
			)

			res.status(200).json({ 
				message: 'Foto atualizada com sucesso!',
				fotoPerfil: caminhoFoto
			})
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Remover foto de perfil
	static async removerFotoPerfil(req, res) {
		try {
			const userId = req.user.id
			const usuario = await database.Usuarios.findByPk(userId)

			if (usuario.fotoPerfil) {
				const caminhoFoto = path.join(__dirname, '../../', usuario.fotoPerfil)
				try {
					await fs.unlink(caminhoFoto)
				} catch (err) {
					console.log('Erro ao remover foto:', err.message)
				}
			}

			await database.Usuarios.update(
				{ fotoPerfil: null },
				{ where: { id: userId } }
			)

			res.status(200).json({ message: 'Foto removida com sucesso!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Obter dados do perfil
	static async obterPerfil(req, res) {
		try {
			const userId = req.user.id
			const usuario = await database.Usuarios.findByPk(userId, {
				attributes: ['id', 'nome', 'email', 'fotoPerfil', 'emailVerificado', 'createdAt']
			})

			if (!usuario) {
				return res.status(404).json({ erro: 'Usuário não encontrado' })
			}

			res.status(200).json(usuario)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}
}

module.exports = PerfilController
