# 💳 Guia: Minhas Contas

## 🎯 O que é "Minhas Contas"?

A funcionalidade **Minhas Contas** permite você gerenciar múltiplas contas bancárias e financeiras em um só lugar!

---

## 💡 Para que serve?

### Organize suas finanças por conta:
- 🏦 **Conta Corrente** - Seu banco principal
- 💰 **Poupança** - Suas economias
- 💳 **Cartão de Crédito** - Gastos no cartão
- 💵 **Dinheiro** - Dinheiro em espécie
- 📈 **Investimentos** - Aplicações financeiras

### Vantagens:
✅ Veja o saldo de cada conta separadamente  
✅ Transfira dinheiro entre contas  
✅ Organize melhor suas finanças  
✅ Saiba exatamente onde está cada centavo  
✅ Personalize com cores e ícones  

---

## 🚀 Como Usar

### 1️⃣ Acessar Minhas Contas

1. Clique em **"Ferramentas"** no menu superior
2. Selecione **"Contas"**
3. Um modal será aberto

### 2️⃣ Criar Sua Primeira Conta

Se você ainda não tem contas, verá:
```
📱 Você ainda não tem contas cadastradas
   Crie sua primeira conta para começar!
   
   [Criar Primeira Conta]
```

Clique no botão e preencha:

#### Campos:
- **Nome da Conta**: Ex: "Banco Inter", "Nubank", "Dinheiro"
- **Tipo**: Escolha entre:
  - Conta Corrente
  - Poupança
  - Cartão de Crédito
  - Dinheiro
  - Investimento
- **Saldo Inicial**: Quanto você tem nessa conta agora
- **Cor**: Escolha uma cor para identificar visualmente

#### Exemplo:
```
Nome: Banco Inter
Tipo: Conta Corrente
Saldo Inicial: R$ 2.500,00
Cor: #0077be (azul)
```

### 3️⃣ Visualizar Suas Contas

Após criar, você verá cards como:

```
┌─────────────────────────────┐
│  🏦 Banco Inter             │
│  ────────────────────────   │
│  Conta Corrente             │
│  R$ 2.500,00                │
│  [Transferir] [Editar]      │
└─────────────────────────────┘

┌─────────────────────────────┐
│  💰 Poupança                │
│  ────────────────────────   │
│  Poupança                   │
│  R$ 10.000,00               │
│  [Transferir] [Editar]      │
└─────────────────────────────┘

┌─────────────────────────────┐
│  ➕ Nova Conta              │
│  Clique para adicionar      │
└─────────────────────────────┘
```

### 4️⃣ Transferir Entre Contas

1. Clique em **"Transferir"** na conta de origem
2. Selecione a conta de destino
3. Digite o valor
4. Adicione uma descrição (opcional)
5. Confirme

#### Exemplo:
```
De: Banco Inter (R$ 2.500,00)
Para: Poupança (R$ 10.000,00)
Valor: R$ 500,00
Descrição: Guardando para viagem

Resultado:
Banco Inter: R$ 2.000,00
Poupança: R$ 10.500,00
```

### 5️⃣ Editar Conta

1. Clique em **"Editar"**
2. Altere o que quiser:
   - Nome
   - Cor
   - Ícone
3. Salve

### 6️⃣ Desativar Conta

Se não usar mais uma conta:
1. Edite a conta
2. Marque como "Inativa"
3. Ela ficará com opacidade reduzida

---

## 📊 Exemplos de Uso

### Exemplo 1: Pessoa Física
```
🏦 Banco do Brasil (Corrente)    R$ 3.000,00
💰 Caixa (Poupança)               R$ 15.000,00
💳 Nubank (Cartão)                R$ -850,00
💵 Carteira (Dinheiro)            R$ 200,00
────────────────────────────────────────────
Total:                            R$ 17.350,00
```

### Exemplo 2: Freelancer
```
🏦 Conta Pessoal                  R$ 2.000,00
💼 Conta Empresarial              R$ 8.000,00
💳 Cartão Empresarial             R$ -1.200,00
📈 Investimentos                  R$ 20.000,00
────────────────────────────────────────────
Total:                            R$ 28.800,00
```

### Exemplo 3: Estudante
```
🏦 Conta Universitária            R$ 500,00
💰 Poupança (Emergência)          R$ 2.000,00
💵 Dinheiro                       R$ 100,00
────────────────────────────────────────────
Total:                            R$ 2.600,00
```

---

## 🎨 Personalização

### Cores Sugeridas:
- 🔵 Azul (#0077be) - Bancos tradicionais
- 🟣 Roxo (#6c5ce7) - Bancos digitais
- 🟢 Verde (#2d6a4f) - Poupança/Investimentos
- 🔴 Vermelho (#ff6b6b) - Cartão de crédito
- 🟡 Amarelo (#feca57) - Dinheiro

### Ícones Disponíveis:
- `account_balance` - Banco
- `savings` - Poupança
- `credit_card` - Cartão
- `payments` - Dinheiro
- `trending_up` - Investimentos

---

## ❓ Perguntas Frequentes

### 1. Preciso criar contas?
Não é obrigatório, mas é **muito recomendado**! Ajuda a organizar melhor suas finanças.

### 2. Posso ter quantas contas?
Quantas quiser! Sem limite.

### 3. As transferências afetam meu saldo total?
Não! Transferências apenas movem dinheiro entre suas contas. O saldo total permanece o mesmo.

### 4. Posso deletar uma conta?
Sim, mas recomendamos apenas **desativar** para manter o histórico.

### 5. As receitas e despesas ficam vinculadas às contas?
Atualmente não, mas é uma funcionalidade planejada para a v2.1!

### 6. Posso ver o histórico de transferências?
Sim! Cada transferência fica registrada no banco de dados.

---

## 🔧 Solução de Problemas

### Problema: Modal vazio
**Solução**: 
1. Recarregue a página (Ctrl + Shift + R)
2. Verifique se está logado
3. Abra o console (F12) e veja se há erros

### Problema: Não consigo criar conta
**Solução**:
1. Verifique se preencheu todos os campos
2. Verifique sua conexão com o servidor
3. Veja o console para erros

### Problema: Transferência não funciona
**Solução**:
1. Verifique se tem saldo suficiente
2. Verifique se as contas estão ativas
3. Recarregue a página

---

## 📱 API Endpoints

Para desenvolvedores:

```javascript
// Criar conta
POST /contas
Body: {
  nome: "Banco Inter",
  tipo: "corrente",
  saldoInicial: 2500,
  cor: "#0077be"
}

// Listar contas
GET /contas

// Atualizar conta
PUT /contas/:id
Body: { nome: "Novo Nome" }

// Transferir
POST /contas/transferir
Body: {
  contaOrigemId: 1,
  contaDestinoId: 2,
  valor: 500,
  descricao: "Transferência"
}
```

---

## 🎯 Dicas de Uso

### ✅ Boas Práticas:
1. **Crie contas reais**: Use suas contas bancárias reais
2. **Atualize regularmente**: Mantenha os saldos atualizados
3. **Use cores**: Facilita identificação visual
4. **Nomes claros**: "Banco Inter" é melhor que "Conta 1"
5. **Organize por tipo**: Agrupe contas similares

### ❌ Evite:
1. Criar muitas contas desnecessárias
2. Deixar contas com nomes genéricos
3. Esquecer de atualizar saldos
4. Usar cores muito parecidas

---

## 🚀 Próximas Funcionalidades (v2.1)

- [ ] Vincular receitas/despesas a contas específicas
- [ ] Gráfico de distribuição por conta
- [ ] Histórico detalhado de transferências
- [ ] Metas por conta
- [ ] Sincronização com bancos (Open Banking)
- [ ] Categorias de conta personalizadas

---

## 📊 Benefícios

### Antes (sem contas):
```
Saldo Total: R$ 5.000,00
❓ Onde está esse dinheiro?
```

### Depois (com contas):
```
🏦 Banco Inter:     R$ 2.000,00
💰 Poupança:        R$ 2.500,00
💵 Dinheiro:        R$ 500,00
────────────────────────────────
Total:              R$ 5.000,00
✅ Tudo organizado!
```

---

## 🎉 Comece Agora!

1. Clique em **Ferramentas** > **Contas**
2. Clique em **Criar Primeira Conta**
3. Preencha os dados
4. Comece a organizar suas finanças!

---

**Status**: ✅ Funcional  
**Versão**: 2.0.2  
**Última atualização**: 15 de Janeiro de 2026
