#!/usr/bin/env node

/**
 * Script para atualizar automaticamente a URL da API no frontend
 * Uso: node update-api-url.js https://sua-api.railway.app
 */

const fs = require('fs');
const path = require('path');

// Obter URL da linha de comando
const newApiUrl = process.argv[2];

if (!newApiUrl) {
    console.error('❌ Erro: Você precisa fornecer a URL da API!');
    console.log('\n📝 Uso correto:');
    console.log('   node update-api-url.js https://sua-api.railway.app');
    console.log('\n💡 Exemplos:');
    console.log('   node update-api-url.js https://financial-control.up.railway.app');
    console.log('   node update-api-url.js https://financial-control-api.onrender.com');
    console.log('   node update-api-url.js https://financial-control-api.herokuapp.com');
    process.exit(1);
}

// Validar URL
try {
    new URL(newApiUrl);
} catch (error) {
    console.error('❌ Erro: URL inválida!');
    console.log('A URL deve começar com http:// ou https://');
    process.exit(1);
}

// Remover barra final se existir
const apiUrl = newApiUrl.replace(/\/$/, '');

console.log('\n🔧 Atualizando URL da API...\n');
console.log(`📍 Nova URL: ${apiUrl}\n`);

// Arquivo a ser atualizado
const scriptsFile = path.join(__dirname, 'front', 'assets', 'js', 'scripts.js');

// Verificar se o arquivo existe
if (!fs.existsSync(scriptsFile)) {
    console.error('❌ Erro: Arquivo scripts.js não encontrado!');
    console.log(`   Procurado em: ${scriptsFile}`);
    process.exit(1);
}

// Ler o arquivo
let content = fs.readFileSync(scriptsFile, 'utf8');

// Substituir a URL
const oldUrlPattern = /const endereco = ["']https?:\/\/[^"']+["']/;
const newLine = `const endereco = "${apiUrl}"`;

if (oldUrlPattern.test(content)) {
    content = content.replace(oldUrlPattern, newLine);
    console.log('✅ URL antiga encontrada e substituída!');
} else {
    console.log('⚠️  Padrão de URL não encontrado, adicionando no início...');
    content = `${newLine}\n\n${content}`;
}

// Salvar o arquivo
fs.writeFileSync(scriptsFile, content, 'utf8');

console.log('✅ Arquivo atualizado com sucesso!\n');
console.log('📁 Arquivo modificado:');
console.log(`   ${scriptsFile}\n`);

// Mostrar próximos passos
console.log('🚀 Próximos passos:\n');
console.log('1. Fazer deploy do frontend:');
console.log('   firebase deploy --only hosting\n');
console.log('2. Testar o sistema:');
console.log('   https://financial-control1.web.app\n');
console.log('3. Verificar se a API está respondendo:');
console.log(`   ${apiUrl}/api/docs\n`);

console.log('✨ Pronto! Seu sistema estará 100% online após o deploy!\n');
