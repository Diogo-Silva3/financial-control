# 🔐 HABILITAR AUTENTICAÇÃO NO FIREBASE

## 🔴 ERRO ATUAL:

```
Firebase: Error (auth/configuration-not-found)
```

Isso significa que a autenticação por email/senha não está habilitada no Firebase Console.

---

## ✅ SOLUÇÃO (2 minutos):

### **PASSO 1: Acessar Firebase Console**

1. Acesse: https://console.firebase.google.com
2. Clique no projeto **"financial-control1"**

### **PASSO 2: Habilitar Authentication**

1. No menu lateral esquerdo, clique em **"Authentication"** (ícone de cadeado)
2. Clique em **"Get started"** (se aparecer)
3. Clique na aba **"Sign-in method"** (Método de login)

### **PASSO 3: Habilitar Email/Password**

1. Na lista de provedores, encontre **"Email/Password"**
2. Clique nele
3. Ative o primeiro switch: **"Enable"** (Ativar)
4. **NÃO** ative o segundo (Email link)
5. Clique em **"Save"** (Salvar)

---

## 🎯 RESUMO VISUAL:

```
Firebase Console
  └─ financial-control1
      └─ Authentication
          └─ Sign-in method
              └─ Email/Password
                  └─ [✓] Enable
                  └─ [ ] Email link (passwordless sign-in)
                  └─ [Save]
```

---

## ⏱️ TEMPO: 2 minutos

Depois de habilitar, o sistema vai funcionar imediatamente!

---

## 🧪 DEPOIS DE HABILITAR:

1. Volte para: https://financial-control1.web.app
2. Tente criar uma conta novamente
3. Deve funcionar! ✅

---

## 📸 ONDE CLICAR:

1. **Firebase Console** → https://console.firebase.google.com
2. **Projeto:** financial-control1
3. **Menu:** Authentication (🔒)
4. **Aba:** Sign-in method
5. **Provedor:** Email/Password
6. **Ativar:** Enable ✓
7. **Salvar:** Save

---

## 💡 POR QUE ISSO ACONTECEU:

O Firebase Auth precisa ser habilitado manualmente no console por questões de segurança. Não pode ser ativado via código.

---

**Faça isso agora e me avise quando terminar!** 🚀

Leva apenas 2 minutos! ⏱️
