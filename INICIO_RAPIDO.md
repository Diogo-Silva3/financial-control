# 🚀 Início Rápido - Controle Financeiro v2.0

## ✅ Status da Instalação

### Tudo Pronto! 🎉

- ✅ Dependências instaladas
- ✅ Diretórios criados
- ✅ Migrations executadas
- ✅ Models criados
- ✅ Rotas configuradas
- ✅ Servidor rodando na porta 3000

## 🌐 Acessar a Aplicação

**URL**: http://localhost:3000

## 🎯 Primeiros Passos

### 1. Fazer Login ou Criar Conta

1. Acesse http://localhost:3000
2. Se já tem conta, faça login
3. Se não tem, clique em "Criar Conta"

### 2. Explorar as Novas Funcionalidades

#### 🎨 Mudar o Tema
1. Clique em "Ferramentas" no menu
2. Selecione "Temas"
3. Escolha entre 6 temas diferentes:
   - Padrão (Roxo/Azul)
   - Oceano (Azul)
   - Floresta (Verde)
   - Pôr do Sol (Vermelho/Amarelo)
   - Roxo Real
   - Minimalista (Claro)

#### 💳 Criar Múltiplas Contas
1. Clique em "Ferramentas" > "Contas"
2. Clique no card "Nova Conta"
3. Preencha:
   - Nome (ex: "Banco Inter")
   - Tipo (Corrente, Poupança, Cartão, etc)
   - Saldo Inicial
   - Cor (escolha uma cor)
4. Clique em "Criar"

#### 🏆 Ver Conquistas
1. Clique em "Ferramentas" > "Conquistas"
2. Veja quais conquistas você já desbloqueou
3. Continue usando o app para desbloquear mais!

#### 📊 Ver Insights Inteligentes
1. Na página principal, role até "Insights Inteligentes"
2. Veja análises automáticas:
   - Tendência de gastos
   - Categoria com maior gasto
   - Previsão para próximo mês
   - Comparação com sua média
   - Dicas de economia

#### 🎯 Definir Meta de Economia
1. Na página principal, clique no botão "Meta"
2. Digite:
   - Valor da meta (ex: 5000)
   - Descrição (ex: "Viagem para Europa")
   - Prazo em meses (ex: 12)
3. Veja a barra de progresso na página principal

#### ⚠️ Definir Limite de Gastos
1. Clique no botão "Limite"
2. Digite o limite mensal (ex: 3000)
3. Receba alertas quando atingir 75% e 90%

#### 📥 Importar Extrato Bancário
1. Prepare um arquivo CSV com formato:
   ```csv
   tipo,descricao,valor,data,categoria
   despesa,Mercado,150.00,2026-01-15,alimentacao
   receita,Salário,3000.00,2026-01-05,
   despesa,Uber,25.50,2026-01-16,transporte
   ```
2. Clique em "Ferramentas" > "Importar CSV"
3. Selecione o arquivo
4. Aguarde a importação

#### 📤 Exportar Relatório em PDF
1. Clique no botão "Exportar PDF"
2. O PDF será gerado e baixado automaticamente
3. Contém resumo do mês atual

#### 👤 Adicionar Foto de Perfil
1. Clique no seu nome no menu
2. Clique na foto de perfil
3. Selecione uma imagem (máx 5MB)
4. Formatos aceitos: JPG, PNG, GIF

#### 🔐 Configurar Segurança
1. Clique em "Ferramentas" > "Segurança"
2. Opções disponíveis:
   - Ativar 2FA (simulado)
   - Alterar senha
   - Ver sessões ativas

#### 🏷️ Criar Tags Personalizadas
1. Crie uma tag (função disponível via API)
2. Adicione tags às suas despesas/receitas
3. Organize melhor suas transações

#### 📎 Anexar Comprovantes
1. Ao criar/editar uma despesa ou receita
2. Clique em "Anexar Comprovante"
3. Selecione imagem ou PDF (máx 10MB)
4. O comprovante fica vinculado à transação

#### 🔔 Criar Lembretes
1. Crie um lembrete para contas a pagar
2. Defina data e hora
3. Receba notificações visuais

## 📱 Funcionalidades Principais

### Dashboard Principal
- ✅ Resumo mensal (Receitas, Despesas, Saldo)
- ✅ Gráficos interativos
- ✅ Insights inteligentes
- ✅ Progresso de meta
- ✅ Despesas por categoria

### Gestão de Transações
- ✅ Adicionar receitas
- ✅ Adicionar despesas
- ✅ Buscar transações
- ✅ Editar/Excluir
- ✅ Anexar comprovantes
- ✅ Adicionar tags

### Relatórios
- ✅ Relatório mensal
- ✅ Relatório anual
- ✅ Gráficos de evolução
- ✅ Comparação mensal
- ✅ Exportar PDF

### Configurações
- ✅ Perfil do usuário
- ✅ Foto de perfil
- ✅ Múltiplas contas
- ✅ Temas de cores
- ✅ Segurança
- ✅ Conquistas

## 🎮 Sistema de Conquistas

Desbloqueie conquistas ao usar o app:

1. 🏆 **Primeiro Passo** - Cadastre sua primeira receita
2. 🥈 **Controle Iniciado** - Cadastre sua primeira despesa
3. 📈 **No Azul** - Mantenha saldo positivo por 3 meses
4. 💰 **Economista** - Gaste menos que o mês anterior
5. ⭐ **Super Organizado** - Cadastre 50 transações
6. ✅ **Disciplinado** - Use o app por 30 dias seguidos

## 🔌 Testar API com Postman/Insomnia

### 1. Login
```
POST http://localhost:3000/usuarios/login
Body: {
  "email": "seu@email.com",
  "senha": "suasenha"
}
```
Copie o token do header `Authorization`

### 2. Criar Conta
```
POST http://localhost:3000/contas
Headers: {
  "Authorization": "Bearer SEU_TOKEN"
}
Body: {
  "nome": "Banco Inter",
  "tipo": "corrente",
  "saldoInicial": 1000,
  "cor": "#ff6b00"
}
```

### 3. Upload Foto de Perfil
```
POST http://localhost:3000/perfil/foto
Headers: {
  "Authorization": "Bearer SEU_TOKEN"
}
Body: form-data
  foto: [selecione arquivo]
```

### 4. Criar Tag
```
POST http://localhost:3000/tags
Headers: {
  "Authorization": "Bearer SEU_TOKEN"
}
Body: {
  "nome": "Urgente",
  "cor": "#ff0000"
}
```

### 5. Criar Lembrete
```
POST http://localhost:3000/lembretes
Headers: {
  "Authorization": "Bearer SEU_TOKEN"
}
Body: {
  "titulo": "Pagar conta de luz",
  "descricao": "Vencimento dia 20",
  "dataLembrete": "2026-01-20T10:00:00"
}
```

## 📊 Verificar no Banco de Dados

```sql
-- Ver todas as tabelas
SHOW TABLES;

-- Ver contas criadas
SELECT * FROM Contas;

-- Ver tags
SELECT * FROM Tags;

-- Ver lembretes
SELECT * FROM Lembretes;

-- Ver anexos
SELECT * FROM Anexos;

-- Ver usuários com foto
SELECT id, nome, email, fotoPerfil FROM Usuarios;
```

## 🎨 Personalização

### Temas Disponíveis
1. **Padrão** - Roxo e azul gradient
2. **Oceano** - Tons de azul
3. **Floresta** - Tons de verde
4. **Pôr do Sol** - Vermelho e amarelo
5. **Roxo Real** - Roxo vibrante
6. **Minimalista** - Tons claros

### Tipos de Conta
- Conta Corrente
- Poupança
- Cartão de Crédito
- Dinheiro
- Investimento

### Categorias de Despesa
- Alimentação 🍔
- Saúde 🏥
- Moradia 🏠
- Transporte 🚗
- Educação 📚
- Lazer 🎮
- Imprevistos ⚡
- Outros 📦
- Internet 📡
- Neoenergia ⚡
- Compesa 💧

## 🐛 Solução de Problemas

### Servidor não inicia
```bash
# Matar processo na porta 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Stop-Process -Id [PID] -Force

# Reiniciar
npm run start
```

### Erro de migration
```bash
# Reverter migrations
npx sequelize-cli db:migrate:undo:all

# Executar novamente
npx sequelize-cli db:migrate
```

### Erro de upload
```bash
# Verificar se diretórios existem
dir uploads
dir uploads\perfil
dir uploads\comprovantes

# Criar se necessário
mkdir uploads\perfil
mkdir uploads\comprovantes
```

### Frontend não carrega
1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Verifique o console (F12)
3. Verifique se os arquivos JS estão sendo carregados

## 📚 Documentação Completa

- `MELHORIAS_IMPLEMENTADAS.md` - Lista completa de funcionalidades
- `GUIA_INSTALACAO_MELHORIAS.md` - Guia técnico de instalação
- `TESTE_MELHORIAS.md` - Guia de testes
- `CHANGELOG_MELHORIAS.md` - Histórico de mudanças

## 🎯 Próximos Passos

1. ✅ Explore todas as funcionalidades
2. ✅ Cadastre suas transações
3. ✅ Configure suas contas
4. ✅ Defina metas e limites
5. ✅ Desbloqueie conquistas
6. ✅ Personalize com temas
7. ✅ Importe seus extratos
8. ✅ Gere relatórios

## 💡 Dicas

- Use tags para organizar melhor suas transações
- Anexe comprovantes para ter registro completo
- Configure lembretes para não esquecer contas
- Defina metas realistas de economia
- Acompanhe os insights para melhorar seus gastos
- Experimente diferentes temas para melhor visualização
- Importe extratos bancários para economizar tempo

## 🎉 Aproveite!

Todas as funcionalidades estão prontas para uso. Explore, teste e aproveite o novo Controle Financeiro v2.0!

---

**Servidor**: http://localhost:3000  
**Status**: ✅ Online  
**Versão**: 2.0.0  
**Data**: 15 de Janeiro de 2026
