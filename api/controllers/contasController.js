const database = require('../models')

class ContasController {
	
	// Criar nova conta
	static async criarConta(req, res) {
		try {
			const userId = req.user.id
			const { nome, tipo, saldoInicial, cor, icone } = req.body

			if (!nome || !tipo) {
				return res.status(400).json({ erro: 'Nome e tipo são obrigatórios' })
			}

			const tiposValidos = ['corrente', 'poupanca', 'cartao', 'dinheiro', 'investimento']
			if (!tiposValidos.includes(tipo)) {
				return res.status(400).json({ 
					erro: 'Tipo inválido. Use: corrente, poupanca, cartao, dinheiro ou investimento' 
				})
			}

			const novaConta = await database.Contas.create({
				usuarioId: userId,
				nome,
				tipo,
				saldoInicial: saldoInicial || 0,
				saldoAtual: saldoInicial || 0,
				cor: cor || '#667eea',
				icone: icone || 'account_balance',
				ativa: true
			})

			res.status(201).json(novaConta)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Listar contas do usuário
	static async listarContas(req, res) {
		try {
			const userId = req.user.id
			const contas = await database.Contas.findAll({
				where: { usuarioId: userId },
				order: [['ativa', 'DESC'], ['nome', 'ASC']]
			})

			res.status(200).json(contas)
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Atualizar conta
	static async atualizarConta(req, res) {
		try {
			const userId = req.user.id
			const { id } = req.params
			const atualizacao = req.body

			const conta = await database.Contas.findOne({
				where: { id, usuarioId: userId }
			})

			if (!conta) {
				return res.status(404).json({ erro: 'Conta não encontrada' })
			}

			await database.Contas.update(atualizacao, {
				where: { id, usuarioId: userId }
			})

			res.status(200).json({ message: 'Conta atualizada com sucesso!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Desativar conta
	static async desativarConta(req, res) {
		try {
			const userId = req.user.id
			const { id } = req.params

			const conta = await database.Contas.findOne({
				where: { id, usuarioId: userId }
			})

			if (!conta) {
				return res.status(404).json({ erro: 'Conta não encontrada' })
			}

			await database.Contas.update(
				{ ativa: false },
				{ where: { id, usuarioId: userId } }
			)

			res.status(200).json({ message: 'Conta desativada com sucesso!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Transferir entre contas
	static async transferir(req, res) {
		try {
			const userId = req.user.id
			const { contaOrigemId, contaDestinoId, valor, descricao } = req.body

			if (!contaOrigemId || !contaDestinoId || !valor) {
				return res.status(400).json({ erro: 'Dados incompletos' })
			}

			if (valor <= 0) {
				return res.status(400).json({ erro: 'Valor deve ser positivo' })
			}

			const contaOrigem = await database.Contas.findOne({
				where: { id: contaOrigemId, usuarioId: userId }
			})

			const contaDestino = await database.Contas.findOne({
				where: { id: contaDestinoId, usuarioId: userId }
			})

			if (!contaOrigem || !contaDestino) {
				return res.status(404).json({ erro: 'Conta não encontrada' })
			}

			if (contaOrigem.saldoAtual < valor) {
				return res.status(400).json({ erro: 'Saldo insuficiente' })
			}

			// Atualizar saldos
			await database.Contas.update(
				{ saldoAtual: contaOrigem.saldoAtual - valor },
				{ where: { id: contaOrigemId } }
			)

			await database.Contas.update(
				{ saldoAtual: contaDestino.saldoAtual + valor },
				{ where: { id: contaDestinoId } }
			)

			// Registrar transferência
			await database.Transferencias.create({
				usuarioId: userId,
				contaOrigemId,
				contaDestinoId,
				valor,
				descricao: descricao || 'Transferência entre contas',
				data: new Date()
			})

			res.status(200).json({ message: 'Transferência realizada com sucesso!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}
}

module.exports = ContasController
