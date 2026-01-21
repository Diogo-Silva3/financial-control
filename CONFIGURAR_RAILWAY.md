# ⚙️ Configurar Variáveis de Ambiente no Railway

## 🔴 PROBLEMA IDENTIFICADO:

O backend está retornando erro 502 porque faltam as variáveis de ambiente no Railway.

---

## ✅ SOLUÇÃO - Adicionar Variáveis no Railway:

### **PASSO 1: Acessar o Railway** (30 segundos)

1. Acesse: https://railway.app/dashboard
2. Clique no projeto **`financial-control`**
3. Clique no serviço **`web`** (ou o nome do seu backend)
4. Clique na aba **"Variables"**

### **PASSO 2: Adicionar Variáveis Obrigatórias** (2 minutos)

Clique em **"New Variable"** e adicione cada uma dessas:

```
NODE_ENV=production

CHAVE_JWT=y0FixZUjsfruIYPFra7YGgiSzPJGfYioZcMOS4IymwE+xUAmRcvwtaZ3IWaoH4PInUOtAKOgT5hfVry0i+27lxPCKh9c9jWxY38q6xC+C6Y56MYTBkqGY8U8EuQ7z9eiBa6D7diVFaSo0BZoYTPLA5gK/y8+2jLoQUv8A+ip4eAGJUxWGSkbqGgwJn++w/6/BIbWSXiNr8jNtJSxzmZm/rXBzjONODgWSct1afSeSCvukX9efwvBu3j1kYIAmPbHmAoLwz547Xy1Ml/sP5KCTYPMgeZqSXe5LvPsuqIJDEAmiMx5DR32gLJ5hXge54IF7RlI6kLdgBmA73wnOzgWRw==

BASE_URL=web-production-80ac4.up.railway.app:3000

PORT=3000
```

**IMPORTANTE:** 
- Copie e cole EXATAMENTE como está acima
- Não adicione espaços extras
- Não adicione `https://` no BASE_URL

### **PASSO 3: Verificar MySQL e Redis** (1 minuto)

#### **Opção A: Se você JÁ adicionou MySQL e Redis**
- ✅ Pule para o Passo 4

#### **Opção B: Se você NÃO adicionou ainda**

**Adicionar MySQL:**
1. No Railway, clique em **"New"**
2. Escolha **"Database"**
3. Selecione **"Add MySQL"**
4. Aguarde 30 segundos

**Adicionar Redis:**
1. No Railway, clique em **"New"**
2. Escolha **"Database"**
3. Selecione **"Add Redis"**
4. Aguarde 30 segundos

**O Railway conecta automaticamente!** Não precisa adicionar variáveis de conexão.

### **PASSO 4: Reiniciar o Serviço** (30 segundos)

1. Volte para o serviço **`web`**
2. Clique nos **3 pontinhos** (⋮) no canto superior direito
3. Clique em **"Restart"**
4. Aguarde 1-2 minutos

### **PASSO 5: Verificar os Logs** (1 minuto)

1. Clique na aba **"Deployments"**
2. Clique no deployment mais recente
3. Veja os logs
4. Procure por: **"Servidor funcionando na porta 3000"**

Se aparecer essa mensagem, está funcionando! ✅

---

## 🧪 TESTAR SE FUNCIONOU:

### **Teste 1: API Docs**
Acesse: https://web-production-80ac4.up.railway.app/api/docs

Deve aparecer a documentação da API (Swagger).

### **Teste 2: Frontend**
Acesse: https://financial-control1.web.app

Tente:
- Criar uma conta
- Fazer login
- Adicionar uma receita

---

## 🔍 VERIFICAR LOGS NO RAILWAY:

Se ainda não funcionar, veja os logs:

1. No Railway, clique no serviço **`web`**
2. Clique em **"Deployments"**
3. Clique no deployment mais recente
4. Role para baixo e veja os logs

**Procure por erros como:**
- ❌ "Cannot connect to database"
- ❌ "Redis connection failed"
- ❌ "Port already in use"
- ❌ "Module not found"

**Me envie o erro e eu ajudo a resolver!**

---

## 📋 CHECKLIST:

Marque o que você já fez:

- [ ] Adicionei as variáveis de ambiente (NODE_ENV, CHAVE_JWT, BASE_URL, PORT)
- [ ] Adicionei MySQL no Railway
- [ ] Adicionei Redis no Railway
- [ ] Reiniciei o serviço
- [ ] Verifiquei os logs
- [ ] Testei a URL da API

---

## 🆘 PROBLEMAS COMUNS:

### "Application failed to respond" (502)
**Causa:** Faltam variáveis de ambiente ou banco de dados
**Solução:** Siga os passos 2 e 3 acima

### "Cannot connect to database"
**Causa:** MySQL não foi adicionado
**Solução:** Adicione MySQL no Railway (Passo 3)

### "Redis connection failed"
**Causa:** Redis não foi adicionado
**Solução:** Adicione Redis no Railway (Passo 3)

### "Port already in use"
**Causa:** Variável PORT não configurada
**Solução:** Adicione `PORT=3000` nas variáveis

---

## 💡 DICA:

O Railway pode demorar 1-2 minutos para reiniciar após adicionar as variáveis.

Seja paciente! ⏱️

---

## 📞 PRECISA DE AJUDA?

Me envie:
1. Print das variáveis de ambiente no Railway
2. Print dos logs do deployment
3. Mensagem de erro específica

Eu resolvo! 🚀

---

## ⏱️ TEMPO ESTIMADO:

- Adicionar variáveis: 2 minutos
- Adicionar MySQL/Redis: 1 minuto
- Reiniciar e testar: 2 minutos

**Total: 5 minutos** ⏱️

---

**Depois de configurar, me avise que eu testo junto com você!** 🎉
