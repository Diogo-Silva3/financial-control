const database = require('../models')
const path = require('path')
const fs = require('fs').promises

class AnexosController {
	
	// Upload de comprovante
	static async uploadComprovante(req, res) {
		try {
			const userId = req.user.id
			const { tipo, itemId } = req.body // tipo: 'receita' ou 'despesa'

			if (!req.file) {
				return res.status(400).json({ erro: 'Nenhum arquivo foi enviado' })
			}

			if (!tipo || !itemId) {
				return res.status(400).json({ erro: 'Tipo e ID são obrigatórios' })
			}

			// Validar tipo
			if (!['receita', 'despesa'].includes(tipo)) {
				return res.status(400).json({ erro: 'Tipo inválido' })
			}

			// Verificar se o item pertence ao usuário
			const tabela = tipo === 'receita' ? 'Receitas' : 'Despesas'
			const item = await database[tabela].findOne({
				where: { id: itemId, usuarioId: userId }
			})

			if (!item) {
				return res.status(404).json({ erro: `${tipo} não encontrada` })
			}

			const caminhoArquivo = `/uploads/comprovantes/${req.file.filename}`

			const anexo = await database.Anexos.create({
				usuarioId: userId,
				tipo,
				itemId,
				nomeArquivo: req.file.originalname,
				caminhoArquivo,
				tamanho: req.file.size,
				mimeType: req.file.mimetype
			})

			res.status(201).json({
				message: 'Comprovante anexado com sucesso!',
				anexo
			})
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Listar anexos de um item
	static async listarAnexos(req, res) {
		try {
			const userId = req.user.id
			const { tipo, itemId } = req.params

			const anexos = await database.Anexos.findAll({
				where: {
					usuarioId: userId,
					tipo,
					itemId
				},
				order: [['createdAt', 'DESC']]
			})

			res.status(200).json(anexos)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Remover anexo
	static async removerAnexo(req, res) {
		try {
			const userId = req.user.id
			const { id } = req.params

			const anexo = await database.Anexos.findOne({
				where: { id, usuarioId: userId }
			})

			if (!anexo) {
				return res.status(404).json({ erro: 'Anexo não encontrado' })
			}

			// Remover arquivo físico
			const caminhoCompleto = path.join(__dirname, '../../', anexo.caminhoArquivo)
			try {
				await fs.unlink(caminhoCompleto)
			} catch (err) {
				console.log('Erro ao remover arquivo:', err.message)
			}

			await database.Anexos.destroy({ where: { id } })

			res.status(200).json({ message: 'Anexo removido com sucesso!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}
}

module.exports = AnexosController
