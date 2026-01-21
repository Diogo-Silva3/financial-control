// ========================================
// MÚLTIPLAS CONTAS
// ========================================

async function carregarContas() {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3000/contas', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		
		if (response.ok) {
			const contas = await response.json()
			exibirContas(contas)
		} else {
			// Se der erro, mostrar mensagem e botão para criar
			exibirMensagemSemContas()
		}
	} catch (erro) {
		console.error('Erro ao carregar contas:', erro)
		// Mostrar mensagem amigável
		exibirMensagemSemContas()
	}
}

function exibirMensagemSemContas() {
	const container = document.getElementById('contas-container')
	if (!container) return
	
	container.innerHTML = `
		<div class="text-center p-4">
			<span class="material-symbols-outlined" style="font-size: 64px; color: #667eea;">
				account_balance_wallet
			</span>
			<h5 class="mt-3">Você ainda não tem contas cadastradas</h5>
			<p class="text-muted">Crie sua primeira conta para começar a organizar suas finanças!</p>
			<button class="btn btn-primary mt-3" onclick="criarNovaConta()">
				<span class="material-symbols-outlined" style="vertical-align: middle;">add_circle</span>
				Criar Primeira Conta
			</button>
		</div>
	`
}

function exibirContas(contas) {
	const container = document.getElementById('contas-container')
	if (!container) return
	
	// Se não houver contas, mostrar mensagem
	if (!contas || contas.length === 0) {
		exibirMensagemSemContas()
		return
	}
	
	let html = '<div class="contas-grid">'
	
	contas.forEach(conta => {
		const icone = conta.icone || 'account_balance'
		const cor = conta.cor || '#667eea'
		const ativa = conta.ativa ? '' : 'opacity: 0.5;'
		
		html += `
			<div class="conta-card" style="${ativa}">
				<div class="conta-header" style="background: ${cor};">
					<span class="material-symbols-outlined">${icone}</span>
					<h5>${conta.nome}</h5>
				</div>
				<div class="conta-body">
					<p class="conta-tipo">${formatarTipoConta(conta.tipo)}</p>
					<h4 class="conta-saldo">R$ ${conta.saldoAtual.toFixed(2)}</h4>
					<div class="conta-acoes">
						<button class="btn btn-sm btn-primary" onclick="transferirDeConta(${conta.id})">
							Transferir
						</button>
						<button class="btn btn-sm btn-secondary" onclick="editarConta(${conta.id})">
							Editar
						</button>
					</div>
				</div>
			</div>
		`
	})
	
	html += `
		<div class="conta-card conta-nova" onclick="criarNovaConta()">
			<span class="material-symbols-outlined">add_circle</span>
			<p>Nova Conta</p>
		</div>
	`
	
	html += '</div>'
	container.innerHTML = html
}

function formatarTipoConta(tipo) {
	const tipos = {
		'corrente': 'Conta Corrente',
		'poupanca': 'Poupança',
		'cartao': 'Cartão de Crédito',
		'dinheiro': 'Dinheiro',
		'investimento': 'Investimento'
	}
	return tipos[tipo] || tipo
}

function modalContas() {
	return `
		<div id="contas-container">
			<div class="text-center">
				<div class="spinner-border" role="status">
					<span class="visually-hidden">Carregando...</span>
				</div>
			</div>
		</div>
		<script>carregarContas();</script>
	`
}

function criarNovaConta() {
	const modal = document.getElementById('exampleModal')
	const modalTitle = document.getElementById('exampleModalLabel')
	const modalBody = document.getElementById('modal-info')
	const modalFooter = document.getElementById('modalFooter')
	
	modalTitle.textContent = 'Nova Conta'
	modalBody.innerHTML = `
		<div class="mb-3">
			<label for="conta-nome" class="form-label">Nome da Conta:</label>
			<input type="text" class="form-control" id="conta-nome" placeholder="Ex: Banco Inter">
		</div>
		<div class="mb-3">
			<label for="conta-tipo" class="form-label">Tipo:</label>
			<select class="form-select" id="conta-tipo">
				<option value="corrente">Conta Corrente</option>
				<option value="poupanca">Poupança</option>
				<option value="cartao">Cartão de Crédito</option>
				<option value="dinheiro">Dinheiro</option>
				<option value="investimento">Investimento</option>
			</select>
		</div>
		<div class="mb-3">
			<label for="conta-saldo" class="form-label">Saldo Inicial:</label>
			<input type="number" class="form-control" id="conta-saldo" value="0" step="0.01">
		</div>
		<div class="mb-3">
			<label for="conta-cor" class="form-label">Cor:</label>
			<input type="color" class="form-control" id="conta-cor" value="#667eea">
		</div>
	`
	
	modalFooter.innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
		<button type="button" class="btn btn-primary" onclick="salvarNovaConta()">Criar</button>
	`
	
	const modalContas = bootstrap.Modal.getInstance(document.getElementById('modalContas'))
	if (modalContas) modalContas.hide()
	
	const modalNovaConta = new bootstrap.Modal(modal)
	modalNovaConta.show()
}

async function salvarNovaConta() {
	const nome = document.getElementById('conta-nome').value
	const tipo = document.getElementById('conta-tipo').value
	const saldoInicial = parseFloat(document.getElementById('conta-saldo').value)
	const cor = document.getElementById('conta-cor').value
	
	if (!nome) {
		alert('Digite o nome da conta')
		return
	}
	
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/contas', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				nome,
				tipo,
				saldoInicial,
				cor
			})
		})
		
		if (response.ok) {
			alert('Conta criada com sucesso!')
			const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'))
			modal.hide()
			carregarContas()
		} else {
			const erro = await response.json()
			alert(`Erro: ${erro.erro}`)
		}
	} catch (erro) {
		console.error('Erro:', erro)
		alert('Erro ao criar conta')
	}
}


// ========================================
// TAGS PERSONALIZADAS
// ========================================

async function carregarTags() {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/tags', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		
		if (response.ok) {
			const tags = await response.json()
			return tags
		}
	} catch (erro) {
		console.error('Erro ao carregar tags:', erro)
	}
	return []
}

async function criarTag() {
	const nome = prompt('Nome da tag:')
	if (!nome) return
	
	const cor = prompt('Cor (hex):', '#667eea')
	
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/tags', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({ nome, cor })
		})
		
		if (response.ok) {
			alert('Tag criada com sucesso!')
		} else {
			const erro = await response.json()
			alert(`Erro: ${erro.erro}`)
		}
	} catch (erro) {
		console.error('Erro:', erro)
		alert('Erro ao criar tag')
	}
}

async function adicionarTagItem(tipo, itemId) {
	const tags = await carregarTags()
	
	if (tags.length === 0) {
		alert('Você ainda não tem tags. Crie uma primeiro!')
		return
	}
	
	let opcoes = '<select id="tag-select" class="form-select">'
	tags.forEach(tag => {
		opcoes += `<option value="${tag.id}">${tag.nome}</option>`
	})
	opcoes += '</select>'
	
	const modal = document.getElementById('exampleModal')
	const modalTitle = document.getElementById('exampleModalLabel')
	const modalBody = document.getElementById('modal-info')
	const modalFooter = document.getElementById('modalFooter')
	
	modalTitle.textContent = 'Adicionar Tag'
	modalBody.innerHTML = `
		<div class="mb-3">
			<label class="form-label">Selecione a tag:</label>
			${opcoes}
		</div>
	`
	
	modalFooter.innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
		<button type="button" class="btn btn-primary" onclick="salvarTagItem('${tipo}', ${itemId})">Adicionar</button>
	`
	
	const modalTag = new bootstrap.Modal(modal)
	modalTag.show()
}

async function salvarTagItem(tipo, itemId) {
	const tagId = document.getElementById('tag-select').value
	
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/tags/item', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				tagId,
				tipo,
				itemId
			})
		})
		
		if (response.ok) {
			alert('Tag adicionada!')
			const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'))
			modal.hide()
		} else {
			const erro = await response.json()
			alert(`Erro: ${erro.erro}`)
		}
	} catch (erro) {
		console.error('Erro:', erro)
		alert('Erro ao adicionar tag')
	}
}


// ========================================
// ANEXAR COMPROVANTES
// ========================================

function anexarComprovante(tipo, itemId) {
	const input = document.createElement('input')
	input.type = 'file'
	input.accept = 'image/*,.pdf'
	
	input.onchange = async (e) => {
		const file = e.target.files[0]
		if (!file) return
		
		// Validar tamanho (máx 10MB)
		if (file.size > 10 * 1024 * 1024) {
			alert('Arquivo muito grande! Máximo: 10MB')
			return
		}
		
		await uploadComprovante(file, tipo, itemId)
	}
	
	input.click()
}

async function uploadComprovante(file, tipo, itemId) {
	try {
		const formData = new FormData()
		formData.append('comprovante', file)
		formData.append('tipo', tipo)
		formData.append('itemId', itemId)
		
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/anexos', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			},
			body: formData
		})
		
		if (response.ok) {
			alert('Comprovante anexado com sucesso!')
		} else {
			const erro = await response.json()
			alert(`Erro: ${erro.erro}`)
		}
	} catch (erro) {
		console.error('Erro:', erro)
		alert('Erro ao anexar comprovante')
	}
}


// ========================================
// LEMBRETES
// ========================================

async function criarLembrete(tipo, itemId) {
	const modal = document.getElementById('exampleModal')
	const modalTitle = document.getElementById('exampleModalLabel')
	const modalBody = document.getElementById('modal-info')
	const modalFooter = document.getElementById('modalFooter')
	
	modalTitle.textContent = 'Criar Lembrete'
	modalBody.innerHTML = `
		<div class="mb-3">
			<label for="lembrete-titulo" class="form-label">Título:</label>
			<input type="text" class="form-control" id="lembrete-titulo" placeholder="Ex: Pagar conta de luz">
		</div>
		<div class="mb-3">
			<label for="lembrete-descricao" class="form-label">Descrição:</label>
			<textarea class="form-control" id="lembrete-descricao" rows="3"></textarea>
		</div>
		<div class="mb-3">
			<label for="lembrete-data" class="form-label">Data e Hora:</label>
			<input type="datetime-local" class="form-control" id="lembrete-data">
		</div>
	`
	
	modalFooter.innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
		<button type="button" class="btn btn-primary" onclick="salvarLembrete('${tipo}', ${itemId})">Criar</button>
	`
	
	const modalLembrete = new bootstrap.Modal(modal)
	modalLembrete.show()
}

async function salvarLembrete(tipo, itemId) {
	const titulo = document.getElementById('lembrete-titulo').value
	const descricao = document.getElementById('lembrete-descricao').value
	const dataLembrete = document.getElementById('lembrete-data').value
	
	if (!titulo || !dataLembrete) {
		alert('Preencha título e data')
		return
	}
	
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/lembretes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				titulo,
				descricao,
				dataLembrete,
				tipo,
				itemId
			})
		})
		
		if (response.ok) {
			alert('Lembrete criado!')
			const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'))
			modal.hide()
		} else {
			const erro = await response.json()
			alert(`Erro: ${erro.erro}`)
		}
	} catch (erro) {
		console.error('Erro:', erro)
		alert('Erro ao criar lembrete')
	}
}

async function verificarLembretesProximos() {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch('http://localhost:3001/lembretes/proximos', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		
		if (response.ok) {
			const lembretes = await response.json()
			
			if (lembretes.length > 0) {
				exibirNotificacaoLembretes(lembretes)
			}
		}
	} catch (erro) {
		console.error('Erro ao verificar lembretes:', erro)
	}
}

function exibirNotificacaoLembretes(lembretes) {
	const container = document.createElement('div')
	container.className = 'lembretes-notificacao'
	container.innerHTML = `
		<h5>🔔 Lembretes Próximos</h5>
		<ul>
			${lembretes.map(l => `
				<li>
					<strong>${l.titulo}</strong>
					<br>
					<small>${new Date(l.dataLembrete).toLocaleString('pt-BR')}</small>
				</li>
			`).join('')}
		</ul>
	`
	
	document.body.appendChild(container)
	
	setTimeout(() => {
		container.classList.add('show')
	}, 100)
	
	setTimeout(() => {
		container.classList.remove('show')
		setTimeout(() => container.remove(), 300)
	}, 8000)
}

// Verificar lembretes ao carregar
document.addEventListener('DOMContentLoaded', () => {
	const token = localStorage.getItem('token')
	if (token) {
		setTimeout(() => {
			verificarLembretesProximos().catch(err => {
				console.log('Lembretes não disponíveis:', err.message)
			})
		}, 3000)
	}
})
