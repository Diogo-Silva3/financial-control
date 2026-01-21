# 🔥 Firebase Configurado no Projeto

## ✅ Instalação Concluída

O Firebase foi instalado e configurado com sucesso no seu projeto!

```bash
npm install firebase ✅
```

## 📁 Arquivos Criados

### 1. `front/assets/js/firebase-config.js`
Configuração moderna com módulos ES6 (para uso com bundlers como Webpack/Vite)

### 2. `front/assets/js/firebase-init.js`
Configuração compatível com navegador (uso direto no HTML)

## 🔧 Configuração do Firebase

```javascript
Project ID: financial-control1
Storage Bucket: financial-control1.firebasestorage.app
Auth Domain: financial-control1.firebaseapp.com
```

## 🚀 Como Usar no HTML

### Passo 1: Adicionar Scripts do Firebase no HTML

Adicione antes do fechamento do `</body>`:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>

<!-- Sua configuração -->
<script src="./assets/js/firebase-init.js"></script>
```

### Passo 2: Usar as Funções

```javascript
// Upload de arquivo
const file = document.getElementById('fileInput').files[0];
const result = await uploadFileToFirebase(file, 'comprovantes/recibo.pdf');

if (result.success) {
    console.log('URL do arquivo:', result.url);
    // Salvar URL no banco de dados
}

// Obter URL de um arquivo
const urlResult = await getFileURL('comprovantes/recibo.pdf');
if (urlResult.success) {
    console.log('URL:', urlResult.url);
}

// Deletar arquivo
const deleteResult = await deleteFileFromFirebase('comprovantes/recibo.pdf');
if (deleteResult.success) {
    console.log('Arquivo deletado!');
}
```

## 💡 Casos de Uso no Projeto

### 1. Upload de Comprovantes
```javascript
// Quando usuário anexar comprovante em uma despesa
async function anexarComprovante(despesaId, file) {
    const path = `comprovantes/${despesaId}_${file.name}`;
    const result = await uploadFileToFirebase(file, path);
    
    if (result.success) {
        // Salvar URL no banco de dados
        await salvarComprovanteNoBanco(despesaId, result.url);
        alert('Comprovante anexado com sucesso!');
    }
}
```

### 2. Upload de Foto de Perfil
```javascript
// Quando usuário atualizar foto de perfil
async function atualizarFotoPerfil(file) {
    const userId = localStorage.getItem('userId');
    const path = `perfis/${userId}.jpg`;
    
    const result = await uploadFileToFirebase(file, path);
    
    if (result.success) {
        // Atualizar no banco de dados
        await atualizarFotoNoBanco(result.url);
        document.getElementById('fotoPerfil').src = result.url;
    }
}
```

### 3. Backup de Relatórios PDF
```javascript
// Salvar relatório PDF gerado
async function salvarRelatorioPDF(pdfBlob, mesAno) {
    const path = `relatorios/${mesAno}.pdf`;
    const result = await uploadFileToFirebase(pdfBlob, path);
    
    if (result.success) {
        console.log('Relatório salvo:', result.url);
    }
}
```

## 🎯 Funcionalidades Disponíveis

### Firebase Storage
- ✅ Upload de arquivos (imagens, PDFs, etc)
- ✅ Download de arquivos
- ✅ Deletar arquivos
- ✅ Obter URLs públicas
- ✅ Gerenciar permissões

### Firebase Analytics
- ✅ Rastrear eventos do usuário
- ✅ Análise de comportamento
- ✅ Métricas de uso

### Firebase Auth (opcional)
- ✅ Autenticação com email/senha
- ✅ Login com Google
- ✅ Login com Facebook
- ✅ Recuperação de senha

## 📊 Exemplo Completo: Anexar Comprovante

```html
<!-- HTML -->
<input type="file" id="comprovanteInput" accept="image/*,application/pdf">
<button onclick="anexarComprovante()">Anexar Comprovante</button>
<div id="preview"></div>

<script>
async function anexarComprovante() {
    const fileInput = document.getElementById('comprovanteInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Selecione um arquivo!');
        return;
    }
    
    // Mostrar loading
    document.getElementById('preview').innerHTML = 'Enviando...';
    
    // Upload para Firebase
    const despesaId = 123; // ID da despesa atual
    const path = `comprovantes/despesa_${despesaId}_${Date.now()}_${file.name}`;
    
    const result = await uploadFileToFirebase(file, path);
    
    if (result.success) {
        // Salvar URL no banco de dados via API
        await fetch(`${endereco}/despesas/${despesaId}/comprovante`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${at}`
            },
            body: JSON.stringify({
                comprovanteUrl: result.url,
                comprovantePath: result.path
            })
        });
        
        // Mostrar preview
        if (file.type.startsWith('image/')) {
            document.getElementById('preview').innerHTML = 
                `<img src="${result.url}" style="max-width: 200px;">`;
        } else {
            document.getElementById('preview').innerHTML = 
                `<a href="${result.url}" target="_blank">Ver Comprovante</a>`;
        }
        
        alert('✅ Comprovante anexado com sucesso!');
    } else {
        alert('❌ Erro ao anexar comprovante: ' + result.error);
    }
}
</script>
```

## 🔒 Segurança

### Regras do Firebase Storage

Configure as regras no Firebase Console:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Comprovantes - apenas usuários autenticados
    match /comprovantes/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024; // Max 5MB
    }
    
    // Perfis - apenas usuários autenticados
    match /perfis/{userId} {
      allow read: if true; // Público
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 2 * 1024 * 1024; // Max 2MB
    }
    
    // Relatórios - apenas o próprio usuário
    match /relatorios/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
  }
}
```

## 📝 Próximos Passos

1. ✅ Firebase instalado e configurado
2. ⏳ Adicionar scripts no HTML das páginas
3. ⏳ Implementar upload de comprovantes
4. ⏳ Implementar upload de foto de perfil
5. ⏳ Configurar regras de segurança no Firebase Console
6. ⏳ Testar uploads e downloads

## 🔗 Links Úteis

- [Firebase Console](https://console.firebase.google.com/project/financial-control1)
- [Documentação Firebase Storage](https://firebase.google.com/docs/storage)
- [Documentação Firebase Analytics](https://firebase.google.com/docs/analytics)

## ⚠️ Importante

- Mantenha as credenciais do Firebase seguras
- Configure as regras de segurança no Firebase Console
- Limite o tamanho dos arquivos (recomendado: 5MB)
- Use nomes únicos para os arquivos (timestamp + nome original)

---

**Status**: ✅ Firebase Instalado e Configurado  
**Data**: 21/01/2026  
**Versão**: 10.7.1
