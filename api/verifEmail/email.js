const nodemailer = require('nodemailer')

class Email {
	async enviaEmail() {
		const configuracaoEmailProducao = {
			host: process.env.EMAIL_HOST,
			auth: {
				user: process.env.EMAIL_USUARIO,
				pass: process.env.EMAIL_SENHA
			},
			secure: true
		}

		const configuracaoEmailTeste = (contaTeste) => ({
			host: 'smtp.ethereal.email',
			auth: contaTeste
		})

		const contaEmail = process.env.NODE_ENV === 'production'
			? configuracaoEmailProducao
			: await nodemailer.createTestAccount()

		const configuracaoEmail = process.env.NODE_ENV === 'production'
			? configuracaoEmailProducao
			: configuracaoEmailTeste(contaEmail)

		const transportador = nodemailer.createTransport(configuracaoEmail)

		const info = await transportador.sendMail(this)

		if (process.env.NODE_ENV !== 'production') {
			console.log('URL: ' + nodemailer.getTestMessageUrl(info))
		}
	}
}

class EmailVerificacao extends Email {
	constructor(usuario, endereco) {
		super()
		this.from = '"Controle Financeiro" <noreply@controlefinanceiro.com>'
		this.to = usuario.email
		this.subject = 'Verificação de e-mail'
		this.text = `Olá ${usuario.nome}! Verifique seu e-mail aqui: ${endereco}`
		this.html = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #667eea;">Bem-vindo ao Controle Financeiro!</h2>
				<p>Olá <strong>${usuario.nome}</strong>,</p>
				<p>Obrigado por se cadastrar! Para começar a usar sua conta, por favor verifique seu e-mail clicando no botão abaixo:</p>
				<div style="text-align: center; margin: 30px 0;">
					<a href="${endereco}" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
						Verificar E-mail
					</a>
				</div>
				<p>Ou copie e cole este link no seu navegador:</p>
				<p style="color: #666; word-break: break-all;">${endereco}</p>
				<hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
				<p style="color: #999; font-size: 12px;">Se você não criou esta conta, ignore este e-mail.</p>
			</div>
		`
	}
}

class EmailRecuperacao extends Email {
	constructor(usuario, endereco) {
		super()
		this.from = '"Controle Financeiro" <noreply@controlefinanceiro.com>'
		this.to = usuario.email
		this.subject = 'Recuperação de conta'
		this.text = `Olá ${usuario.nome}! Sua conta foi excluída. Recupere aqui: ${endereco}`
		this.html = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #667eea;">Recuperação de Conta</h2>
				<p>Olá <strong>${usuario.nome}</strong>,</p>
				<p>Sua conta foi excluída. Você tem até 5 dias para recuperá-la clicando no botão abaixo:</p>
				<div style="text-align: center; margin: 30px 0;">
					<a href="${endereco}" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
						Recuperar Conta
					</a>
				</div>
				<p>Ou copie e cole este link no seu navegador:</p>
				<p style="color: #666; word-break: break-all;">${endereco}</p>
				<hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
				<p style="color: #999; font-size: 12px;">Se você não solicitou esta ação, ignore este e-mail.</p>
			</div>
		`
	}
}

class EmailRecuperacaoSenha extends Email {
	constructor(usuario, endereco) {
		super()
		this.from = '"Controle Financeiro" <noreply@controlefinanceiro.com>'
		this.to = usuario.email
		this.subject = 'Recuperação de senha'
		this.text = `Olá ${usuario.nome}! Redefina sua senha aqui: ${endereco}`
		this.html = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #667eea;">Recuperação de Senha</h2>
				<p>Olá <strong>${usuario.nome}</strong>,</p>
				<p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:</p>
				<div style="text-align: center; margin: 30px 0;">
					<a href="${endereco}" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
						Redefinir Senha
					</a>
				</div>
				<p>Ou copie e cole este link no seu navegador:</p>
				<p style="color: #666; word-break: break-all;">${endereco}</p>
				<p style="color: #e74c3c; margin-top: 20px;"><strong>Este link expira em 1 hora.</strong></p>
				<hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
				<p style="color: #999; font-size: 12px;">Se você não solicitou esta redefinição, ignore este e-mail. Sua senha permanecerá inalterada.</p>
			</div>
		`
	}
}

module.exports = { EmailVerificacao, EmailRecuperacao, EmailRecuperacaoSenha }
