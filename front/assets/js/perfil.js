// ========================================
// GERENCIAMENTO DE PERFIL
// ========================================

async function carregarFotoPerfil() {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/perfil', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		
		if (response.ok) {
			const usuario = await response.json()
			
			if (usuario.fotoPerfil) {
				const imgPerfil = document.getElementById('foto-perfil')
				if (imgPerfil) {
					imgPerfil.src = `http://localhost:3001${usuario.fotoPerfil}`
				}
			}
			
			// Atualizar nome do usuário
			const nomeUsuario = document.getElementById('nome-usuario')
			if (nomeUsuario) {
				nomeUsuario.textContent = usuario.nome
			}
		}
	} catch (erro) {
		console.error('Erro ao carregar perfil:', erro)
	}
}

function abrirSeletorFoto() {
	const input = document.createElement('input')
	input.type = 'file'
	input.accept = 'image/*'
	
	input.onchange = async (e) => {
		const file = e.target.files[0]
		if (!file) return
		
		// Validar tamanho (máx 5MB)
		if (file.size > 5 * 1024 * 1024) {
			alert('Imagem muito grande! Máximo: 5MB')
			return
		}
		
		// Validar tipo
		if (!file.type.startsWith('image/')) {
			alert('Por favor, selecione uma imagem válida')
			return
		}
		
		await uploadFotoPerfil(file)
	}
	
	input.click()
}

async function uploadFotoPerfil(file) {
	try {
		const formData = new FormData()
		formData.append('foto', file)
		
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/perfil/foto', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			body: formData
		})
		
		if (response.ok) {
			const data = await response.json()
			alert('Foto atualizada com sucesso!')
			
			// Atualizar preview
			const imgPerfil = document.getElementById('foto-perfil')
			if (imgPerfil) {
				imgPerfil.src = `http://localhost:3001${data.fotoPerfil}?t=${Date.now()}`
			}
		} else {
			const erro = await response.json()
			alert(`Erro: ${erro.erro}`)
		}
	} catch (erro) {
		console.error('Erro ao fazer upload:', erro)
		alert('Erro ao fazer upload da foto')
	}
}

async function removerFotoPerfil() {
	if (!confirm('Deseja realmente remover sua foto de perfil?')) return
	
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/perfil/foto', {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		
		if (response.ok) {
			alert('Foto removida com sucesso!')
			
			// Atualizar preview para imagem padrão
			const imgPerfil = document.getElementById('foto-perfil')
			if (imgPerfil) {
				imgPerfil.src = 'assets/img/avatar-default.png'
			}
		}
	} catch (erro) {
		console.error('Erro ao remover foto:', erro)
		alert('Erro ao remover foto')
	}
}


// ========================================
// RECUPERAÇÃO DE SENHA
// ========================================

function abrirRecuperacaoSenha() {
	const modal = document.getElementById('exampleModal')
	const modalTitle = document.getElementById('exampleModalLabel')
	const modalBody = document.getElementById('modal-info')
	const modalFooter = document.getElementById('modalFooter')
	
	modalTitle.textContent = 'Recuperar Senha'
	modalBody.innerHTML = `
		<div class="mb-3">
			<label for="email-recuperacao" class="form-label">Digite seu e-mail:</label>
			<input type="email" class="form-control" id="email-recuperacao" placeholder="seu@email.com">
		</div>
	`
	
	modalFooter.innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
		<button type="button" class="btn btn-primary" onclick="solicitarRecuperacaoSenha()">Enviar</button>
	`
}

async function solicitarRecuperacaoSenha() {
	const email = document.getElementById('email-recuperacao').value
	
	if (!email) {
		alert('Por favor, digite seu e-mail')
		return
	}
	
	try {
		const response = await fetch('http://localhost:3001/usuarios/recuperar-senha', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		})
		
		const data = await response.json()
		
		if (response.ok) {
			alert('Instruções enviadas para seu e-mail!')
			
			// Em desenvolvimento, mostrar o link
			if (data.link) {
				console.log('Link de recuperação:', data.link)
			}
			
			// Fechar modal
			const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'))
			modal.hide()
		} else {
			alert(`Erro: ${data.erro}`)
		}
	} catch (erro) {
		console.error('Erro:', erro)
		alert('Erro ao solicitar recuperação de senha')
	}
}


// ========================================
// SEGURANÇA - 2FA (Simulado)
// ========================================

function modalSeguranca() {
	return `
		<div class="seguranca-opcoes">
			<h5>Configurações de Segurança</h5>
			
			<div class="opcao-seguranca">
				<div>
					<strong>Autenticação em Dois Fatores (2FA)</strong>
					<p class="text-muted">Adicione uma camada extra de segurança</p>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="switch-2fa" onchange="toggle2FA(this.checked)">
				</div>
			</div>
			
			<hr>
			
			<div class="opcao-seguranca">
				<div>
					<strong>Alterar Senha</strong>
					<p class="text-muted">Recomendamos trocar sua senha regularmente</p>
				</div>
				<button class="btn btn-sm btn-outline-primary" onclick="abrirAlterarSenha()">
					Alterar
				</button>
			</div>
			
			<hr>
			
			<div class="opcao-seguranca">
				<div>
					<strong>Sessões Ativas</strong>
					<p class="text-muted">Gerencie seus dispositivos conectados</p>
				</div>
				<button class="btn btn-sm btn-outline-secondary" onclick="verSessoesAtivas()">
					Ver Sessões
				</button>
			</div>
		</div>
	`
}

function toggle2FA(ativado) {
	if (ativado) {
		alert('2FA ativado! (Funcionalidade em desenvolvimento)')
		localStorage.setItem('2fa-ativado', 'true')
	} else {
		alert('2FA desativado!')
		localStorage.removeItem('2fa-ativado')
	}
}

function abrirAlterarSenha() {
	const modal = document.getElementById('exampleModal')
	const modalTitle = document.getElementById('exampleModalLabel')
	const modalBody = document.getElementById('modal-info')
	const modalFooter = document.getElementById('modalFooter')
	
	modalTitle.textContent = 'Alterar Senha'
	modalBody.innerHTML = `
		<div class="mb-3">
			<label for="senha-atual" class="form-label">Senha Atual:</label>
			<input type="password" class="form-control" id="senha-atual">
		</div>
		<div class="mb-3">
			<label for="senha-nova" class="form-label">Nova Senha:</label>
			<input type="password" class="form-control" id="senha-nova">
		</div>
		<div class="mb-3">
			<label for="senha-confirmar" class="form-label">Confirmar Nova Senha:</label>
			<input type="password" class="form-control" id="senha-confirmar">
		</div>
	`
	
	modalFooter.innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
		<button type="button" class="btn btn-primary" onclick="alterarSenha()">Salvar</button>
	`
	
	// Fechar modal de segurança e abrir o de alterar senha
	const modalSeguranca = bootstrap.Modal.getInstance(document.getElementById('modalSeguranca'))
	if (modalSeguranca) modalSeguranca.hide()
	
	const modalAlterarSenha = new bootstrap.Modal(modal)
	modalAlterarSenha.show()
}

async function alterarSenha() {
	const senhaAtual = document.getElementById('senha-atual').value
	const senhaNova = document.getElementById('senha-nova').value
	const senhaConfirmar = document.getElementById('senha-confirmar').value
	
	if (!senhaAtual || !senhaNova || !senhaConfirmar) {
		alert('Preencha todos os campos')
		return
	}
	
	if (senhaNova !== senhaConfirmar) {
		alert('As senhas não coincidem')
		return
	}
	
	if (senhaNova.length < 6) {
		alert('A senha deve ter no mínimo 6 caracteres')
		return
	}
	
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/usuarios/alterar-senha', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				senhaAtual,
				senhaNova
			})
		})
		
		if (response.ok) {
			alert('Senha alterada com sucesso!')
			const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'))
			modal.hide()
		} else {
			const erro = await response.json()
			alert(`Erro: ${erro.erro}`)
		}
	} catch (erro) {
		console.error('Erro:', erro)
		alert('Erro ao alterar senha')
	}
}

function verSessoesAtivas() {
	alert('Sessões Ativas:\n\n1. Navegador atual - Ativo agora\n\n(Funcionalidade em desenvolvimento)')
}

// Carregar foto ao iniciar
document.addEventListener('DOMContentLoaded', () => {
	carregarFotoPerfil()
	
	// Verificar se 2FA está ativado
	const switch2FA = document.getElementById('switch-2fa')
	if (switch2FA) {
		switch2FA.checked = localStorage.getItem('2fa-ativado') === 'true'
	}
})
