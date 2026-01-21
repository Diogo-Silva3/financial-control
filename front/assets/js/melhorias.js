// ========================================
// SISTEMA DE TEMAS
// ========================================

const temas = {
	padrao: {
		nome: 'Padrão',
		primary: '#667eea',
		secondary: '#764ba2',
		background: '#1a1a2e',
		card: '#16213e',
		text: '#ffffff'
	},
	oceano: {
		nome: 'Oceano',
		primary: '#0077be',
		secondary: '#00a8e8',
		background: '#001f3f',
		card: '#003d5c',
		text: '#ffffff'
	},
	floresta: {
		nome: 'Floresta',
		primary: '#2d6a4f',
		secondary: '#52b788',
		background: '#1b4332',
		card: '#2d6a4f',
		text: '#ffffff'
	},
	sunset: {
		nome: 'Pôr do Sol',
		primary: '#ff6b6b',
		secondary: '#feca57',
		background: '#2c2c54',
		card: '#474787',
		text: '#ffffff'
	},
	roxo: {
		nome: 'Roxo Real',
		primary: '#6c5ce7',
		secondary: '#a29bfe',
		background: '#2d3436',
		card: '#636e72',
		text: '#ffffff'
	},
	minimalista: {
		nome: 'Minimalista',
		primary: '#2c3e50',
		secondary: '#34495e',
		background: '#ecf0f1',
		card: '#ffffff',
		text: '#2c3e50'
	}
}

function aplicarTema(temaNome) {
	const tema = temas[temaNome] || temas.padrao
	const root = document.documentElement

	root.style.setProperty('--cor-primary', tema.primary)
	root.style.setProperty('--cor-secondary', tema.secondary)
	root.style.setProperty('--cor-background', tema.background)
	root.style.setProperty('--cor-card', tema.card)
	root.style.setProperty('--cor-text', tema.text)

	localStorage.setItem('tema-selecionado', temaNome)
}

function carregarTema() {
	const temaSalvo = localStorage.getItem('tema-selecionado') || 'padrao'
	aplicarTema(temaSalvo)
}

function modalTemas() {
	let html = '<div class="temas-grid">'
	
	for (const [key, tema] of Object.entries(temas)) {
		html += `
			<div class="tema-card" onclick="aplicarTema('${key}')">
				<div class="tema-preview" style="background: linear-gradient(135deg, ${tema.primary}, ${tema.secondary})"></div>
				<p>${tema.nome}</p>
			</div>
		`
	}
	
	html += '</div>'
	return html
}

// Carregar tema ao iniciar
document.addEventListener('DOMContentLoaded', carregarTema)


// ========================================
// SISTEMA DE CONQUISTAS
// ========================================

const conquistas = {
	primeiraReceita: {
		id: 'primeiraReceita',
		nome: 'Primeiro Passo',
		descricao: 'Cadastrou sua primeira receita',
		icone: 'emoji_events',
		cor: '#ffd700'
	},
	primeiraDespesa: {
		id: 'primeiraDespesa',
		nome: 'Controle Iniciado',
		descricao: 'Cadastrou sua primeira despesa',
		icone: 'military_tech',
		cor: '#c0c0c0'
	},
	saldoPositivo: {
		id: 'saldoPositivo',
		nome: 'No Azul',
		descricao: 'Manteve saldo positivo por 3 meses',
		icone: 'trending_up',
		cor: '#4caf50'
	},
	economista: {
		id: 'economista',
		nome: 'Economista',
		descricao: 'Gastou menos que o mês anterior',
		icone: 'savings',
		cor: '#2196f3'
	},
	organizador: {
		id: 'organizador',
		nome: 'Super Organizado',
		descricao: 'Cadastrou 50 transações',
		icone: 'workspace_premium',
		cor: '#9c27b0'
	},
	disciplinado: {
		id: 'disciplinado',
		nome: 'Disciplinado',
		descricao: 'Usou o app por 30 dias seguidos',
		icone: 'verified',
		cor: '#ff9800'
	}
}

function verificarConquistas() {
	// Lógica para verificar e desbloquear conquistas
	const conquistasDesbloqueadas = JSON.parse(localStorage.getItem('conquistas') || '[]')
	
	// Verificar primeira receita
	if (!conquistasDesbloqueadas.includes('primeiraReceita')) {
		// Verificar se tem receitas cadastradas
		// Se sim, desbloquear
	}
	
	return conquistasDesbloqueadas
}

function desbloquearConquista(conquistaId) {
	const conquistasDesbloqueadas = JSON.parse(localStorage.getItem('conquistas') || '[]')
	
	if (!conquistasDesbloqueadas.includes(conquistaId)) {
		conquistasDesbloqueadas.push(conquistaId)
		localStorage.setItem('conquistas', JSON.stringify(conquistasDesbloqueadas))
		
		// Mostrar notificação
		mostrarNotificacaoConquista(conquistas[conquistaId])
	}
}

function mostrarNotificacaoConquista(conquista) {
	const notificacao = document.createElement('div')
	notificacao.className = 'conquista-notificacao'
	notificacao.innerHTML = `
		<span class="material-symbols-outlined" style="color: ${conquista.cor}; font-size: 48px;">
			${conquista.icone}
		</span>
		<h4>Conquista Desbloqueada!</h4>
		<p><strong>${conquista.nome}</strong></p>
		<p>${conquista.descricao}</p>
	`
	
	document.body.appendChild(notificacao)
	
	setTimeout(() => {
		notificacao.classList.add('show')
	}, 100)
	
	setTimeout(() => {
		notificacao.classList.remove('show')
		setTimeout(() => notificacao.remove(), 300)
	}, 4000)
}

function exibirConquistas() {
	const conquistasDesbloqueadas = JSON.parse(localStorage.getItem('conquistas') || '[]')
	let html = '<div class="conquistas-grid">'
	
	for (const [key, conquista] of Object.entries(conquistas)) {
		const desbloqueada = conquistasDesbloqueadas.includes(key)
		const classe = desbloqueada ? 'conquista-desbloqueada' : 'conquista-bloqueada'
		
		html += `
			<div class="conquista-card ${classe}">
				<span class="material-symbols-outlined" style="color: ${conquista.cor}; font-size: 48px;">
					${conquista.icone}
				</span>
				<h5>${conquista.nome}</h5>
				<p>${conquista.descricao}</p>
				${desbloqueada ? '<span class="badge bg-success">Desbloqueada</span>' : '<span class="badge bg-secondary">Bloqueada</span>'}
			</div>
		`
	}
	
	html += '</div>'
	return html
}


// ========================================
// IMPORTAR CSV
// ========================================

function importarCSV() {
	const input = document.createElement('input')
	input.type = 'file'
	input.accept = '.csv'
	
	input.onchange = async (e) => {
		const file = e.target.files[0]
		if (!file) return
		
		const reader = new FileReader()
		reader.onload = async (event) => {
			const csv = event.target.result
			await processarCSV(csv)
		}
		reader.readAsText(file)
	}
	
	input.click()
}

async function processarCSV(csv) {
	const linhas = csv.split('\n')
	const headers = linhas[0].split(',').map(h => h.trim())
	
	let sucessos = 0
	let erros = 0
	
	for (let i = 1; i < linhas.length; i++) {
		if (!linhas[i].trim()) continue
		
		const valores = linhas[i].split(',').map(v => v.trim())
		const transacao = {}
		
		headers.forEach((header, index) => {
			transacao[header] = valores[index]
		})
		
		try {
			// Determinar se é receita ou despesa
			const tipo = transacao.tipo?.toLowerCase()
			const endpoint = tipo === 'receita' ? '/receitas' : '/despesas'
			
			const dados = {
				descricao: transacao.descricao,
				valor: parseFloat(transacao.valor),
				data: transacao.data
			}
			
			if (tipo === 'despesa' && transacao.categoria) {
				dados.categoriaId = obterCategoriaId(transacao.categoria)
			}
			
			await fetch(`http://localhost:3001${endpoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(dados)
			})
			
			sucessos++
		} catch (erro) {
			console.error('Erro ao importar linha:', erro)
			erros++
		}
	}
	
	alert(`Importação concluída!\nSucessos: ${sucessos}\nErros: ${erros}`)
	location.reload()
}

function obterCategoriaId(categoria) {
	const categorias = {
		'alimentacao': 1,
		'saude': 2,
		'moradia': 3,
		'transporte': 4,
		'educacao': 5,
		'lazer': 6,
		'imprevistos': 7,
		'outros': 8
	}
	return categorias[categoria.toLowerCase()] || 8
}


// ========================================
// EXPORTAR PDF
// ========================================

function exportarPDF() {
	const { jsPDF } = window.jspdf
	const doc = new jsPDF()
	
	// Título
	doc.setFontSize(20)
	doc.text('Relatório Financeiro', 20, 20)
	
	// Data
	doc.setFontSize(12)
	doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30)
	
	// Resumo
	const receitas = document.getElementById('valor-receitas')?.textContent || 'R$ 0,00'
	const despesas = document.getElementById('valor-despesas')?.textContent || 'R$ 0,00'
	const saldo = document.getElementById('valor-saldo')?.textContent || 'R$ 0,00'
	
	doc.setFontSize(14)
	doc.text('Resumo do Mês', 20, 45)
	doc.setFontSize(12)
	doc.text(`Receitas: ${receitas}`, 20, 55)
	doc.text(`Despesas: ${despesas}`, 20, 65)
	doc.text(`Saldo: ${saldo}`, 20, 75)
	
	// Salvar
	doc.save(`relatorio-${new Date().toISOString().split('T')[0]}.pdf`)
}


// ========================================
// LIMITE DE GASTOS
// ========================================

function definirLimiteGastos() {
	const limite = prompt('Digite o limite de gastos mensal (R$):')
	if (limite && !isNaN(limite)) {
		localStorage.setItem('limite-gastos', parseFloat(limite))
		alert('Limite definido com sucesso!')
		verificarLimiteGastos()
	}
}

function verificarLimiteGastos() {
	const limite = parseFloat(localStorage.getItem('limite-gastos'))
	if (!limite) return
	
	const despesasTexto = document.getElementById('valor-despesas')?.textContent || 'R$ 0,00'
	const despesas = parseFloat(despesasTexto.replace('R$', '').replace('.', '').replace(',', '.'))
	
	const percentual = (despesas / limite) * 100
	
	if (percentual >= 90) {
		mostrarAlerta('⚠️ Atenção! Você atingiu 90% do seu limite de gastos!', 'danger')
	} else if (percentual >= 75) {
		mostrarAlerta('⚠️ Você já gastou 75% do seu limite mensal!', 'warning')
	}
}

function mostrarAlerta(mensagem, tipo) {
	const alerta = document.createElement('div')
	alerta.className = `alert alert-${tipo} alert-dismissible fade show`
	alerta.innerHTML = `
		${mensagem}
		<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
	`
	
	document.querySelector('.painel-principal').insertBefore(
		alerta,
		document.querySelector('.painel-principal').firstChild
	)
}


// ========================================
// METAS DE ECONOMIA
// ========================================

function definirMeta() {
	const valorMeta = prompt('Digite o valor da meta de economia (R$):')
	if (!valorMeta || isNaN(valorMeta)) return
	
	const descricao = prompt('Descrição da meta (ex: Viagem, Carro novo):')
	const prazo = prompt('Prazo em meses:')
	
	const meta = {
		valor: parseFloat(valorMeta),
		descricao: descricao || 'Meta de economia',
		prazo: parseInt(prazo) || 12,
		valorAtual: 0,
		dataCriacao: new Date().toISOString()
	}
	
	localStorage.setItem('meta-economia', JSON.stringify(meta))
	alert('Meta definida com sucesso!')
	exibirProgressoMeta()
}

function exibirProgressoMeta() {
	const meta = JSON.parse(localStorage.getItem('meta-economia'))
	if (!meta) return
	
	const saldoTexto = document.getElementById('valor-saldo')?.textContent || 'R$ 0,00'
	const saldoAtual = parseFloat(saldoTexto.replace('R$', '').replace('.', '').replace(',', '.'))
	
	const percentual = Math.min((saldoAtual / meta.valor) * 100, 100)
	
	const container = document.getElementById('meta-container')
	if (!container) return
	
	container.innerHTML = `
		<div class="meta-progresso">
			<h5>🎯 ${meta.descricao}</h5>
			<div class="progress" style="height: 30px;">
				<div class="progress-bar progress-bar-striped progress-bar-animated" 
					 role="progressbar" 
					 style="width: ${percentual}%"
					 aria-valuenow="${percentual}" 
					 aria-valuemin="0" 
					 aria-valuemax="100">
					${percentual.toFixed(1)}%
				</div>
			</div>
			<p class="mt-2">
				R$ ${saldoAtual.toFixed(2)} de R$ ${meta.valor.toFixed(2)}
				<br>
				<small>Prazo: ${meta.prazo} meses</small>
			</p>
		</div>
	`
}

// Verificar limite e meta ao carregar
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		try {
			verificarLimiteGastos()
			exibirProgressoMeta()
		} catch (err) {
			console.log('Erro ao verificar limite/meta:', err.message)
		}
	}, 2000)
})
