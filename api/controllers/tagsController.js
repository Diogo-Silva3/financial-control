const database = require('../models')

class TagsController {
	
	// Criar tag personalizada
	static async criarTag(req, res) {
		try {
			const userId = req.user.id
			const { nome, cor } = req.body

			if (!nome) {
				return res.status(400).json({ erro: 'Nome da tag é obrigatório' })
			}

			// Verificar se já existe
			const tagExistente = await database.Tags.findOne({
				where: { usuarioId: userId, nome }
			})

			if (tagExistente) {
				return res.status(400).json({ erro: 'Tag já existe' })
			}

			const novaTag = await database.Tags.create({
				usuarioId: userId,
				nome,
				cor: cor || '#667eea'
			})

			res.status(201).json(novaTag)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Listar tags do usuário
	static async listarTags(req, res) {
		try {
			const userId = req.user.id
			const tags = await database.Tags.findAll({
				where: { usuarioId: userId },
				order: [['nome', 'ASC']]
			})

			res.status(200).json(tags)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Adicionar tag a despesa/receita
	static async adicionarTagItem(req, res) {
		try {
			const userId = req.user.id
			const { tagId, tipo, itemId } = req.body

			if (!tagId || !tipo || !itemId) {
				return res.status(400).json({ erro: 'Dados incompletos' })
			}

			// Verificar se a tag pertence ao usuário
			const tag = await database.Tags.findOne({
				where: { id: tagId, usuarioId: userId }
			})

			if (!tag) {
				return res.status(404).json({ erro: 'Tag não encontrada' })
			}

			// Verificar se o item pertence ao usuário
			const tabela = tipo === 'receita' ? 'Receitas' : 'Despesas'
			const item = await database[tabela].findOne({
				where: { id: itemId, usuarioId: userId }
			})

			if (!item) {
				return res.status(404).json({ erro: `${tipo} não encontrada` })
			}

			// Verificar se já existe
			const relacaoExistente = await database.ItemTags.findOne({
				where: { tagId, tipo, itemId }
			})

			if (relacaoExistente) {
				return res.status(400).json({ erro: 'Tag já adicionada a este item' })
			}

			await database.ItemTags.create({
				tagId,
				tipo,
				itemId
			})

			res.status(201).json({ message: 'Tag adicionada com sucesso!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Remover tag de item
	static async removerTagItem(req, res) {
		try {
			const { id } = req.params

			await database.ItemTags.destroy({ where: { id } })

			res.status(200).json({ message: 'Tag removida com sucesso!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Listar tags de um item
	static async listarTagsItem(req, res) {
		try {
			const { tipo, itemId } = req.params

			const tags = await database.ItemTags.findAll({
				where: { tipo, itemId },
				include: [{
					model: database.Tags,
					as: 'tag'
				}]
			})

			res.status(200).json(tags)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}
}

module.exports = TagsController
