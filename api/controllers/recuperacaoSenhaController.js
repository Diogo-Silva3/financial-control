const database = require('../models')
const tokens = require('./tokens')
const { EmailRecuperacaoSenha } = require('../verifEmail/email')
const geraSenhaHash = require('./senhaHash')
const geraEndereco = require('../verifEmail/geraEndereco')

class RecuperacaoSenhaController {
	
	// Solicitar recuperação de senha
	static async solicitarRecuperacao(req, res) {
		try {
			const { email } = req.body
			
			if (!email) {
				return res.status(400).json({ erro: 'Email é obrigatório' })
			}

			const usuario = await database.Usuarios.findOne({ where: { email } })
			
			if (!usuario) {
				// Por segurança, não informar se o email existe ou não
				return res.status(200).json({ 
					message: 'Se o email existir, você receberá instruções para recuperação' 
				})
			}

			const tokenRecuperacao = tokens.recuperaSenha.cria(usuario.id)
			const endereco = geraEndereco('/usuarios/redefinir-senha/', tokenRecuperacao)
			
			const emailRecuperacao = new EmailRecuperacaoSenha(usuario, endereco)
			emailRecuperacao.enviaEmail()

			res.status(200).json({ 
				message: 'Se o email existir, você receberá instruções para recuperação',
				...(process.env.NODE_ENV !== 'production' && { link: endereco })
			})
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}

	// Redefinir senha com token
	static async redefinirSenha(req, res) {
		try {
			const { novaSenha, confirmarSenha } = req.body
			const userId = req.id // Vem do middleware de verificação do token

			if (!novaSenha || !confirmarSenha) {
				return res.status(400).json({ erro: 'Todos os campos são obrigatórios' })
			}

			if (novaSenha !== confirmarSenha) {
				return res.status(400).json({ erro: 'As senhas não coincidem' })
			}

			if (novaSenha.length < 6) {
				return res.status(400).json({ erro: 'A senha deve ter no mínimo 6 caracteres' })
			}

			const senhaHash = await geraSenhaHash(novaSenha)
			
			await database.Usuarios.update(
				{ senha: senhaHash },
				{ where: { id: Number(userId) } }
			)

			res.status(200).json({ message: 'Senha redefinida com sucesso!' })
		} catch (erro) {
			res.status(500).json({ erro: erro.message })
		}
	}
}

module.exports = RecuperacaoSenhaController
