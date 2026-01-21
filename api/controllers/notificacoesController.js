const database = require('../models')

class NotificacoesController {
	
	// Criar lembrete
	static async criarLembrete(req, res) {
		try {
			const userId = req.user.id
			const { titulo, descricao, dataLembrete, tipo, itemId } = req.body

			if (!titulo || !dataLembrete) {
				return res.status(400).json({ erro: 'Título e data são obrigatórios' })
			}

			const novoLembrete = await database.Lembretes.create({
				usuarioId: userId,
				titulo,
				descricao,
				dataLembrete: new Date(dataLembrete),
				tipo: tipo || 'geral',
				itemId,
				ativo: true,
				notificado: false
			})

			res.status(201).json(novoLembrete)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Listar lembretes
	static async listarLembretes(req, res) {
		try {
			const userId = req.user.id
			const { ativo } = req.query

			const where = { usuarioId: userId }
			if (ativo !== undefined) {
				where.ativo = ativo === 'true'
			}

			const lembretes = await database.Lembretes.findAll({
				where,
				order: [['dataLembrete', 'ASC']]
			})

			res.status(200).json(lembretes)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Marcar lembrete como concluído
	static async concluirLembrete(req, res) {
		try {
			const userId = req.user.id
			const { id } = req.params

			const lembrete = await database.Lembretes.findOne({
				where: { id, usuarioId: userId }
			})

			if (!lembrete) {
				return res.status(404).json({ erro: 'Lembrete não encontrado' })
			}

			await database.Lembretes.update(
				{ ativo: false, notificado: true },
				{ where: { id } }
			)

			res.status(200).json({ message: 'Lembrete concluído!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Obter lembretes próximos (próximos 7 dias)
	static async lembretesProximos(req, res) {
		try {
			const userId = req.user.id
			const hoje = new Date()
			const proximaSemana = new Date()
			proximaSemana.setDate(hoje.getDate() + 7)

			const lembretes = await database.Lembretes.findAll({
				where: {
					usuarioId: userId,
					ativo: true,
					dataLembrete: {
						[database.Sequelize.Op.between]: [hoje, proximaSemana]
					}
				},
				order: [['dataLembrete', 'ASC']]
			})

			res.status(200).json(lembretes)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}
}

module.exports = NotificacoesController
