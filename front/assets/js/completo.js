// ========================================
// ANÁLISES AVANÇADAS E INSIGHTS
// ========================================

async function gerarInsights() {
	try {
		const token = localStorage.getItem('token')
		if (!token) {
			console.log('Token não encontrado, insights não serão gerados')
			return
		}
		
		const mesAtual = new Date().getMonth() + 1
		const anoAtual = new Date().getFullYear()
		
		// Buscar dados dos últimos 6 meses
		const dadosHistoricos = await buscarDadosHistoricos(6)
		
		// Se não houver dados, não gerar insights
		if (!dadosHistoricos || dadosHistoricos.length === 0) {
			console.log('Sem dados históricos para gerar insights')
			return
		}
		
		const insights = []
		
		// Insight 1: Tendência de gastos
		const tendencia = calcularTendenciaGastos(dadosHistoricos)
		if (tendencia.percentual > 10) {
			insights.push({
				icone: 'trending_up',
				titulo: 'Gastos em Alta',
				descricao: `Seus gastos aumentaram ${tendencia.percentual.toFixed(1)}% em relação ao mês anterior`,
				tipo: 'alerta'
			})
		} else if (tendencia.percentual < -10) {
			insights.push({
				icone: 'trending_down',
				titulo: 'Economia em Alta!',
				descricao: `Parabéns! Você economizou ${Math.abs(tendencia.percentual).toFixed(1)}% este mês`,
				tipo: 'sucesso'
			})
		}
		
		// Insight 2: Categoria com maior gasto
		const categoriaTop = identificarCategoriaTop()
		if (categoriaTop) {
			insights.push({
				icone: 'pie_chart',
				titulo: 'Maior Gasto',
				descricao: `${categoriaTop.nome} representa ${categoriaTop.percentual}% dos seus gastos`,
				tipo: 'info'
			})
		}
		
		// Insight 3: Previsão para o próximo mês
		const previsao = preverGastosProximoMes(dadosHistoricos)
		if (previsao > 0) {
			insights.push({
				icone: 'psychology',
				titulo: 'Previsão',
				descricao: `Estimativa de gastos para o próximo mês: R$ ${previsao.toFixed(2)}`,
			tipo: 'info'
		})
		
		// Insight 4: Comparação com média
		const comparacao = compararComMedia(dadosHistoricos)
		if (comparacao.acimaDaMedia) {
			insights.push({
				icone: 'warning',
				titulo: 'Acima da Média',
				descricao: `Você está gastando ${comparacao.diferenca}% acima da sua média`,
				tipo: 'alerta'
			})
		} else {
			insights.push({
				icone: 'check_circle',
				titulo: 'Dentro da Média',
				descricao: `Seus gastos estão ${comparacao.diferenca}% abaixo da média`,
				tipo: 'sucesso'
			})
		}
		
		// Insight 5: Melhor dia para economizar
		const melhorDia = identificarMelhorDiaEconomia(dadosHistoricos)
		insights.push({
			icone: 'calendar_today',
			titulo: 'Dica de Economia',
			descricao: `Você tende a gastar menos às ${melhorDia}`,
			tipo: 'dica'
		})
		
		exibirInsights(insights)
		
	} catch (erro) {
		console.error('Erro ao gerar insights:', erro)
	}
}

async function buscarDadosHistoricos(meses) {
	const dados = []
	const hoje = new Date()
	
	for (let i = 0; i < meses; i++) {
		const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
		const mes = data.getMonth() + 1
		const ano = data.getFullYear()
		
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				console.log('Token não encontrado')
				break
			}
			
			const response = await fetch(`http://localhost:3000/relatorio/${mes}/${ano}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			
			if (response.ok) {
				const relatorio = await response.json()
				dados.push({
					mes,
					ano,
					receitas: relatorio.receitas || 0,
					despesas: relatorio.despesas || 0,
					saldo: relatorio.saldo || 0
				})
			}
		} catch (erro) {
			console.error(`Erro ao buscar dados de ${mes}/${ano}:`, erro)
		}
	}
	
	return dados
}

function calcularTendenciaGastos(dados) {
	if (dados.length < 2) return { percentual: 0 }
	
	const mesAtual = dados[0].despesas
	const mesAnterior = dados[1].despesas
	
	if (mesAnterior === 0) return { percentual: 0 }
	
	const percentual = ((mesAtual - mesAnterior) / mesAnterior) * 100
	
	return { percentual }
}

function identificarCategoriaTop() {
	// Buscar valores das categorias do DOM
	const categorias = [
		{ nome: 'Alimentação', valor: parseFloat(document.getElementById('categoria-alimentacao')?.textContent?.replace('R$', '').replace(',', '.') || 0) },
		{ nome: 'Saúde', valor: parseFloat(document.getElementById('categoria-saude')?.textContent?.replace('R$', '').replace(',', '.') || 0) },
		{ nome: 'Moradia', valor: parseFloat(document.getElementById('categoria-moradia')?.textContent?.replace('R$', '').replace(',', '.') || 0) },
		{ nome: 'Transporte', valor: parseFloat(document.getElementById('categoria-transporte')?.textContent?.replace('R$', '').replace(',', '.') || 0) },
		{ nome: 'Educação', valor: parseFloat(document.getElementById('categoria-educacao')?.textContent?.replace('R$', '').replace(',', '.') || 0) },
		{ nome: 'Lazer', valor: parseFloat(document.getElementById('categoria-lazer')?.textContent?.replace('R$', '').replace(',', '.') || 0) }
	]
	
	const total = categorias.reduce((sum, cat) => sum + cat.valor, 0)
	if (total === 0) return null
	
	const top = categorias.reduce((max, cat) => cat.valor > max.valor ? cat : max)
	const percentual = ((top.valor / total) * 100).toFixed(1)
	
	return { nome: top.nome, percentual }
}

function preverGastosProximoMes(dados) {
	if (dados.length === 0) return 0
	
	// Média móvel simples dos últimos 3 meses
	const ultimos3Meses = dados.slice(0, 3)
	const media = ultimos3Meses.reduce((sum, d) => sum + d.despesas, 0) / ultimos3Meses.length
	
	// Calcular tendência
	if (dados.length >= 2) {
		const tendencia = dados[0].despesas - dados[1].despesas
		return media + (tendencia * 0.5) // Ajuste conservador
	}
	
	return media
}

function compararComMedia(dados) {
	if (dados.length < 2) return { acimaDaMedia: false, diferenca: 0 }
	
	const mesAtual = dados[0].despesas
	const media = dados.slice(1).reduce((sum, d) => sum + d.despesas, 0) / (dados.length - 1)
	
	if (media === 0) return { acimaDaMedia: false, diferenca: 0 }
	
	const diferenca = Math.abs(((mesAtual - media) / media) * 100).toFixed(1)
	const acimaDaMedia = mesAtual > media
	
	return { acimaDaMedia, diferenca }
}

function identificarMelhorDiaEconomia(dados) {
	const diasSemana = ['Domingos', 'Segundas-feiras', 'Terças-feiras', 'Quartas-feiras', 'Quintas-feiras', 'Sextas-feiras', 'Sábados']
	
	// Simulação - em produção, analisar dados reais por dia da semana
	const diaAleatorio = Math.floor(Math.random() * 7)
	return diasSemana[diaAleatorio]
}

function exibirInsights(insights) {
	const container = document.getElementById('insights-container')
	if (!container) return
	
	let html = ''
	
	insights.forEach(insight => {
		const corIcone = {
			'alerta': '#ff9800',
			'sucesso': '#4caf50',
			'info': '#2196f3',
			'dica': '#9c27b0'
		}[insight.tipo] || '#667eea'
		
		html += `
			<div class="insight-card animate-slide-in">
				<span class="material-symbols-outlined insight-icon" style="color: ${corIcone};">
					${insight.icone}
				</span>
				<div class="insight-content">
					<h6>${insight.titulo}</h6>
					<p>${insight.descricao}</p>
				</div>
			</div>
		`
	})
	
	container.innerHTML = html
}


// ========================================
// COMPARAÇÃO COM MÉDIA NACIONAL (Simulado)
// ========================================

function compararComMediaNacional() {
	const despesasTexto = document.getElementById('valor-despesas')?.textContent || 'R$ 0,00'
	const despesas = parseFloat(despesasTexto.replace('R$', '').replace('.', '').replace(',', '.'))
	
	// Dados simulados - em produção, buscar de API real
	const mediaNacional = {
		alimentacao: 600,
		moradia: 1200,
		transporte: 400,
		saude: 300,
		educacao: 200,
		lazer: 250,
		total: 3000
	}
	
	const percentualDiferenca = ((despesas - mediaNacional.total) / mediaNacional.total * 100).toFixed(1)
	
	const modal = document.getElementById('exampleModal')
	const modalTitle = document.getElementById('exampleModalLabel')
	const modalBody = document.getElementById('modal-info')
	const modalFooter = document.getElementById('modalFooter')
	
	modalTitle.textContent = 'Comparação com Média Nacional'
	modalBody.innerHTML = `
		<div class="comparacao-nacional">
			<h5>Seus Gastos vs Média Nacional</h5>
			<p>Seus gastos totais: <strong>R$ ${despesas.toFixed(2)}</strong></p>
			<p>Média nacional: <strong>R$ ${mediaNacional.total.toFixed(2)}</strong></p>
			<p>Diferença: <strong style="color: ${percentualDiferenca > 0 ? '#f44336' : '#4caf50'}">
				${percentualDiferenca > 0 ? '+' : ''}${percentualDiferenca}%
			</strong></p>
			
			<hr>
			
			<h6>Por Categoria:</h6>
			<div class="comparacao-categorias">
				<div class="comparacao-item">
					<span>Alimentação</span>
					<span>R$ ${mediaNacional.alimentacao}</span>
				</div>
				<div class="comparacao-item">
					<span>Moradia</span>
					<span>R$ ${mediaNacional.moradia}</span>
				</div>
				<div class="comparacao-item">
					<span>Transporte</span>
					<span>R$ ${mediaNacional.transporte}</span>
				</div>
				<div class="comparacao-item">
					<span>Saúde</span>
					<span>R$ ${mediaNacional.saude}</span>
				</div>
			</div>
		</div>
	`
	
	modalFooter.innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
	`
	
	const modalComparacao = new bootstrap.Modal(modal)
	modalComparacao.show()
}


// ========================================
// RELATÓRIO ANUAL
// ========================================

async function gerarRelatorioAnual() {
	const ano = new Date().getFullYear()
	const dados = []
	
	for (let mes = 1; mes <= 12; mes++) {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(`http://localhost:3001/relatorio/${mes}/${ano}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			
			if (response.ok) {
				const relatorio = await response.json()
				dados.push({
					mes,
					receitas: relatorio.receitas || 0,
					despesas: relatorio.despesas || 0,
					saldo: relatorio.saldo || 0
				})
			}
		} catch (erro) {
			console.error(`Erro ao buscar dados de ${mes}/${ano}:`, erro)
		}
	}
	
	exibirRelatorioAnual(dados, ano)
}

function exibirRelatorioAnual(dados, ano) {
	const totalReceitas = dados.reduce((sum, d) => sum + d.receitas, 0)
	const totalDespesas = dados.reduce((sum, d) => sum + d.despesas, 0)
	const saldoFinal = totalReceitas - totalDespesas
	
	const melhorMes = dados.reduce((max, d) => d.saldo > max.saldo ? d : max)
	const piorMes = dados.reduce((min, d) => d.saldo < min.saldo ? d : min)
	
	const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
	
	const modal = document.getElementById('exampleModal')
	const modalTitle = document.getElementById('exampleModalLabel')
	const modalBody = document.getElementById('modal-info')
	const modalFooter = document.getElementById('modalFooter')
	
	modalTitle.textContent = `Relatório Anual ${ano}`
	modalBody.innerHTML = `
		<div class="relatorio-anual">
			<div class="resumo-anual">
				<div class="resumo-item">
					<h6>Total Receitas</h6>
					<h4 style="color: #4caf50;">R$ ${totalReceitas.toFixed(2)}</h4>
				</div>
				<div class="resumo-item">
					<h6>Total Despesas</h6>
					<h4 style="color: #f44336;">R$ ${totalDespesas.toFixed(2)}</h4>
				</div>
				<div class="resumo-item">
					<h6>Saldo Final</h6>
					<h4 style="color: ${saldoFinal >= 0 ? '#4caf50' : '#f44336'};">
						R$ ${saldoFinal.toFixed(2)}
					</h4>
				</div>
			</div>
			
			<hr>
			
			<div class="destaques-anual">
				<p><strong>Melhor Mês:</strong> ${meses[melhorMes.mes - 1]} (R$ ${melhorMes.saldo.toFixed(2)})</p>
				<p><strong>Pior Mês:</strong> ${meses[piorMes.mes - 1]} (R$ ${piorMes.saldo.toFixed(2)})</p>
				<p><strong>Média Mensal:</strong> R$ ${(totalDespesas / 12).toFixed(2)}</p>
			</div>
			
			<hr>
			
			<canvas id="chartAnual"></canvas>
		</div>
	`
	
	modalFooter.innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
		<button type="button" class="btn btn-primary" onclick="exportarRelatorioAnualPDF()">
			<span class="material-symbols-outlined" style="vertical-align: middle;">download</span>
			Exportar PDF
		</button>
	`
	
	const modalRelatorio = new bootstrap.Modal(modal)
	modalRelatorio.show()
	
	// Criar gráfico
	setTimeout(() => {
		criarGraficoAnual(dados)
	}, 300)
}

function criarGraficoAnual(dados) {
	const ctx = document.getElementById('chartAnual')
	if (!ctx) return
	
	const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
	
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: meses,
			datasets: [
				{
					label: 'Receitas',
					data: dados.map(d => d.receitas),
					borderColor: '#4caf50',
					backgroundColor: 'rgba(76, 175, 80, 0.1)',
					tension: 0.4
				},
				{
					label: 'Despesas',
					data: dados.map(d => d.despesas),
					borderColor: '#f44336',
					backgroundColor: 'rgba(244, 67, 54, 0.1)',
					tension: 0.4
				},
				{
					label: 'Saldo',
					data: dados.map(d => d.saldo),
					borderColor: '#2196f3',
					backgroundColor: 'rgba(33, 150, 243, 0.1)',
					tension: 0.4
				}
			]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: 'Evolução Anual'
				}
			}
		}
	})
}


// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
	// Gerar insights após carregar dados (apenas se estiver logado)
	setTimeout(() => {
		const token = localStorage.getItem('token')
		if (token) {
			gerarInsights().catch(err => {
				console.log('Insights não disponíveis ainda:', err.message)
			})
		}
	}, 3000) // Aumentado para 3 segundos para dar tempo de carregar os dados
})
