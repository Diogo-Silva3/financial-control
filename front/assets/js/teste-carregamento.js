// Teste de carregamento dos arquivos
console.log('✅ teste-carregamento.js carregado');

// Verificar se as funções existem
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== VERIFICAÇÃO DE FUNCIONALIDADES ===');
    
    // Verificar funções do menu Ferramentas
    console.log('1. modalContas:', typeof modalContas !== 'undefined' ? '✅' : '❌');
    console.log('2. modalSeguranca:', typeof modalSeguranca !== 'undefined' ? '✅' : '❌');
    console.log('3. importarCSV:', typeof importarCSV !== 'undefined' ? '✅' : '❌');
    console.log('4. modalTemas:', typeof modalTemas !== 'undefined' ? '✅' : '❌');
    console.log('5. exibirConquistas:', typeof exibirConquistas !== 'undefined' ? '✅' : '❌');
    
    // Verificar outras funções importantes
    console.log('6. aplicarTema:', typeof aplicarTema !== 'undefined' ? '✅' : '❌');
    console.log('7. exportarPDF:', typeof exportarPDF !== 'undefined' ? '✅' : '❌');
    console.log('8. definirLimiteGastos:', typeof definirLimiteGastos !== 'undefined' ? '✅' : '❌');
    console.log('9. definirMeta:', typeof definirMeta !== 'undefined' ? '✅' : '❌');
    console.log('10. gerarInsights:', typeof gerarInsights !== 'undefined' ? '✅' : '❌');
    
    console.log('=== FIM DA VERIFICAÇÃO ===');
    
    // Testar se os modais existem
    const modais = ['modalContas', 'modalSeguranca', 'modalTemas', 'modalConquistas'];
    modais.forEach(modalId => {
        const modal = document.getElementById(modalId);
        console.log(`Modal ${modalId}:`, modal ? '✅ Existe' : '❌ Não encontrado');
    });
});
