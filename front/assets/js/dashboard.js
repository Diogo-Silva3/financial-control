// Dashboard com Chart.js

let chartDespesasCategoria = null;
let chartReceitasDespesas = null;
let chartEvolucao = null;

// Cores modernas para os gráficos
const coresGradiente = [
    'rgba(102, 126, 234, 0.8)',
    'rgba(118, 75, 162, 0.8)',
    'rgba(237, 100, 166, 0.8)',
    'rgba(255, 154, 158, 0.8)',
    'rgba(250, 208, 196, 0.8)',
    'rgba(155, 207, 232, 0.8)',
    'rgba(162, 210, 255, 0.8)',
    'rgba(189, 178, 255, 0.8)'
];

function criarGraficoDespesasCategoria(dados) {
    const ctx = document.getElementById('chartDespesasCategoria');
    
    if (!ctx) return;
    
    // Destruir gráfico anterior se existir
    if (chartDespesasCategoria) {
        chartDespesasCategoria.destroy();
    }
    
    const categorias = ['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outros', 'Internet', 'Neoenergia', 'Compesa'];
    const valores = [
        dados.alimentacao || 0,
        dados.saude || 0,
        dados.moradia || 0,
        dados.transporte || 0,
        dados.educacao || 0,
        dados.lazer || 0,
        dados.imprevistos || 0,
        dados.outros || 0,
        dados.internet || 0,
        dados.neoenergia || 0,
        dados.compesa || 0
    ];
    
    chartDespesasCategoria = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categorias,
            datasets: [{
                data: valores,
                backgroundColor: coresGradiente,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += 'R$ ' + context.parsed.toFixed(2);
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function criarGraficoReceitasDespesas(receitas, despesas) {
    const ctx = document.getElementById('chartReceitasDespesas');
    
    if (!ctx) return;
    
    // Destruir gráfico anterior se existir
    if (chartReceitasDespesas) {
        chartReceitasDespesas.destroy();
    }
    
    chartReceitasDespesas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Receitas', 'Despesas', 'Saldo'],
            datasets: [{
                label: 'Valores (R$)',
                data: [receitas, despesas, receitas - despesas],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    receitas - despesas >= 0 ? 'rgba(102, 126, 234, 0.8)' : 'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    receitas - despesas >= 0 ? 'rgba(102, 126, 234, 1)' : 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'R$ ' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

function criarGraficoEvolucao() {
    const ctx = document.getElementById('chartEvolucao');
    
    if (!ctx) return;
    
    // Destruir gráfico anterior se existir
    if (chartEvolucao) {
        chartEvolucao.destroy();
    }
    
    // Dados de exemplo - você pode buscar do backend
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const receitas = [3000, 3200, 2800, 3500, 3300, 3600];
    const despesas = [2500, 2700, 2400, 2900, 2800, 3000];
    
    chartEvolucao = new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Receitas',
                    data: receitas,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                },
                {
                    label: 'Despesas',
                    data: despesas,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += 'R$ ' + context.parsed.y.toFixed(2);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// Função para atualizar todos os gráficos
function atualizarDashboard(dadosRelatorio) {
    if (dadosRelatorio) {
        criarGraficoDespesasCategoria(dadosRelatorio);
        criarGraficoReceitasDespesas(
            dadosRelatorio.receitas || 0,
            dadosRelatorio.despesas || 0
        );
    }
    criarGraficoEvolucao();
}

// Exportar funções para uso global
window.atualizarDashboard = atualizarDashboard;
window.criarGraficoDespesasCategoria = criarGraficoDespesasCategoria;
window.criarGraficoReceitasDespesas = criarGraficoReceitasDespesas;
window.criarGraficoEvolucao = criarGraficoEvolucao;


// ========== COMPARAÇÃO MENSAL ==========
let chartComparacao = null;

function criarGraficoComparacao(mesAtual, mesAnterior) {
    const ctx = document.getElementById('chartComparacao');
    
    if (!ctx) return;
    
    if (chartComparacao) {
        chartComparacao.destroy();
    }
    
    const labels = ['Receitas', 'Despesas', 'Saldo'];
    
    chartComparacao = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Mês Anterior',
                    data: [
                        mesAnterior.receitas || 0,
                        mesAnterior.despesas || 0,
                        (mesAnterior.receitas || 0) - (mesAnterior.despesas || 0)
                    ],
                    backgroundColor: 'rgba(156, 163, 175, 0.7)',
                    borderColor: 'rgba(156, 163, 175, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Mês Atual',
                    data: [
                        mesAtual.receitas || 0,
                        mesAtual.despesas || 0,
                        (mesAtual.receitas || 0) - (mesAtual.despesas || 0)
                    ],
                    backgroundColor: 'rgba(102, 126, 234, 0.7)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += 'R$ ' + context.parsed.y.toFixed(2);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// ========== INSIGHTS INTELIGENTES ==========
function gerarInsights(dadosAtual, dadosAnterior) {
    const insights = [];
    
    // Comparar despesas
    if (dadosAnterior && dadosAnterior.despesas) {
        const variacao = ((dadosAtual.despesas - dadosAnterior.despesas) / dadosAnterior.despesas * 100).toFixed(1);
        if (variacao > 10) {
            insights.push({
                tipo: 'alerta',
                icone: 'trending_up',
                mensagem: `Suas despesas aumentaram ${variacao}% em relação ao mês passado!`
            });
        } else if (variacao < -10) {
            insights.push({
                tipo: 'sucesso',
                icone: 'trending_down',
                mensagem: `Parabéns! Você reduziu suas despesas em ${Math.abs(variacao)}%!`
            });
        }
    }
    
    // Verificar categoria com maior gasto
    const categorias = [
        { nome: 'Alimentação', valor: dadosAtual.alimentacao || 0 },
        { nome: 'Saúde', valor: dadosAtual.saude || 0 },
        { nome: 'Moradia', valor: dadosAtual.moradia || 0 },
        { nome: 'Transporte', valor: dadosAtual.transporte || 0 },
        { nome: 'Educação', valor: dadosAtual.educacao || 0 },
        { nome: 'Lazer', valor: dadosAtual.lazer || 0 },
        { nome: 'Internet', valor: dadosAtual.internet || 0 },
        { nome: 'Neoenergia', valor: dadosAtual.neoenergia || 0 },
        { nome: 'Compesa', valor: dadosAtual.compesa || 0 }
    ];
    
    const maiorGasto = categorias.reduce((max, cat) => cat.valor > max.valor ? cat : max, categorias[0]);
    
    if (maiorGasto.valor > 0) {
        const percentual = ((maiorGasto.valor / dadosAtual.despesas) * 100).toFixed(1);
        insights.push({
            tipo: 'info',
            icone: 'info',
            mensagem: `${maiorGasto.nome} representa ${percentual}% dos seus gastos (R$ ${maiorGasto.valor.toFixed(2)})`
        });
    }
    
    // Taxa de economia
    if (dadosAtual.receitas > 0) {
        const economia = ((dadosAtual.receitas - dadosAtual.despesas) / dadosAtual.receitas * 100).toFixed(1);
        if (economia > 20) {
            insights.push({
                tipo: 'sucesso',
                icone: 'savings',
                mensagem: `Excelente! Você está economizando ${economia}% da sua renda!`
            });
        } else if (economia < 5) {
            insights.push({
                tipo: 'alerta',
                icone: 'warning',
                mensagem: `Atenção! Sua taxa de economia está baixa (${economia}%). Tente reduzir gastos.`
            });
        }
    }
    
    return insights;
}

function exibirInsights(insights) {
    const container = document.getElementById('insights-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    insights.forEach(insight => {
        const cor = insight.tipo === 'sucesso' ? '#28a745' : 
                    insight.tipo === 'alerta' ? '#ffc107' : '#17a2b8';
        
        const card = document.createElement('div');
        card.className = 'alert alert-dismissible fade show';
        card.style.backgroundColor = cor + '20';
        card.style.borderLeft = `4px solid ${cor}`;
        card.innerHTML = `
            <span class="material-symbols-outlined" style="vertical-align: middle; color: ${cor};">${insight.icone}</span>
            ${insight.mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        container.appendChild(card);
    });
}

window.criarGraficoComparacao = criarGraficoComparacao;
window.gerarInsights = gerarInsights;
window.exibirInsights = exibirInsights;
