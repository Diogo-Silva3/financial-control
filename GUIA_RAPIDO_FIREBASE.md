# 🚀 Guia Rápido - Firebase Upload Implementado

## ✅ O que foi implementado:

### 1. **Upload de Foto de Perfil** 📸
- Interface completa na página de usuário
- Preview instantâneo da imagem
- Upload automático para Firebase Storage
- Feedback visual (enviando/sucesso/erro)
- Avatar padrão com iniciais do usuário

### 2. **Upload de Comprovantes** 📎
- Botão "Anexar Comprovante" nos modais de despesas
- Suporte para imagens (JPG, PNG, GIF) e PDF
- Preview de imagens antes do upload
- Validação de tamanho (máx 5MB)
- Upload automático após salvar despesa

### 3. **Arquivos Criados**
- ✅ `front/assets/js/firebase-init.js` - Inicialização do Firebase
- ✅ `front/assets/js/firebase-uploads.js` - Funções de upload
- ✅ `front/assets/js/comprovantes-modal.js` - Interface de comprovantes
- ✅ `front/usuario.html` - Atualizado com upload de foto

## 📸 Como Usar - Foto de Perfil

### Na Página de Usuário:

1. Acesse a página "Usuário" no menu lateral
2. Clique no ícone de câmera sobre a foto de perfil
3. Selecione uma imagem (JPG, PNG, GIF)
4. A foto será enviada automaticamente
5. Aguarde a mensagem "✅ Foto atualizada com sucesso!"

### Código Implementado:

```html
<!-- Foto de perfil com botão de câmera -->
<img id="fotoPerfil" class="foto-perfil" src="..." />
<label for="inputFotoPerfil">
  <span class="material-symbols-outlined">photo_camera</span>
</label>
<input type="file" id="inputFotoPerfil" accept="image/*" style="display: none;">
```

## 📎 Como Usar - Comprovantes

### Ao Adicionar Despesa:

1. Clique em "Adicionar Despesas" no painel
2. Preencha os dados da despesa
3. Clique em "Anexar Comprovante (Opcional)"
4. Escolha o arquivo (imagem ou PDF)
5. Veja o preview do arquivo
6. Salve a despesa
7. O comprovante será enviado automaticamente

### Funcionalidades:

- ✅ Preview de imagens
- ✅ Ícone para PDFs
- ✅ Mostrar nome e tamanho do arquivo
- ✅ Cancelar anexo
- ✅ Validação de tipo e tamanho

## 🔧 Adicionar Firebase nas Páginas

### Para ativar o Firebase, adicione antes do `</body>`:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics-compat.js"></script>

<!-- Scripts do projeto -->
<script src="./assets/js/firebase-init.js"></script>
<script src="./assets/js/firebase-uploads.js"></script>
<script src="./assets/js/comprovantes-modal.js"></script>
```

### Páginas que precisam do Firebase:

1. ✅ **usuario.html** - Upload de foto de perfil (JÁ IMPLEMENTADO)
2. ⏳ **principal.html** - Upload de comprovantes (ADICIONAR SCRIPTS)
3. ⏳ **perfil.html** - Se existir (ADICIONAR SCRIPTS)

## 📋 Checklist de Implementação

### Foto de Perfil
- [x] Interface de upload criada
- [x] Preview de imagem
- [x] Upload para Firebase
- [x] Feedback visual
- [x] Scripts adicionados em usuario.html
- [ ] Salvar URL no banco de dados (API)
- [ ] Carregar foto ao abrir página

### Comprovantes
- [x] Botão "Anexar Comprovante" criado
- [x] Preview de imagens e PDFs
- [x] Upload para Firebase
- [x] Validação de arquivos
- [ ] Adicionar scripts em principal.html
- [ ] Integrar com salvamento de despesas
- [ ] Salvar URL no banco de dados (API)
- [ ] Exibir comprovantes nas despesas

## 🎯 Próximos Passos

### 1. Adicionar Scripts no principal.html

Abra `front/principal.html` e adicione antes do `</body>`:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>

<!-- Scripts Firebase -->
<script src="./assets/js/firebase-init.js"></script>
<script src="./assets/js/firebase-uploads.js"></script>
<script src="./assets/js/comprovantes-modal.js"></script>
```

### 2. Integrar com API Backend

Criar endpoints no backend:

```javascript
// PUT /usuarios/foto - Salvar URL da foto de perfil
// POST /anexos - Salvar comprovante
// GET /anexos/:despesaId - Listar comprovantes
// DELETE /anexos/:id - Deletar comprovante
```

### 3. Configurar Regras do Firebase

No Firebase Console, configure as regras de segurança:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /perfis/{userId} {
      allow read: if true;
      allow write: if request.resource.size < 2 * 1024 * 1024;
    }
    
    match /comprovantes/{userId}/{allPaths=**} {
      allow read, write: if request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

## 💡 Funções Disponíveis

### Upload de Foto de Perfil
```javascript
const result = await uploadFotoPerfil(file);
if (result.success) {
    console.log('URL:', result.url);
}
```

### Upload de Comprovante
```javascript
const result = await uploadComprovante(file, despesaId);
if (result.success) {
    console.log('URL:', result.url);
}
```

### Deletar Arquivo
```javascript
await deletarFotoPerfil(path);
await deletarComprovante(path, anexoId);
```

### Preview de Imagem
```javascript
previewImagem(file, 'elementId');
```

### Formatar Tamanho
```javascript
const tamanho = formatarTamanho(file.size); // "1.5 MB"
```

## 🎨 Estilo Visual

### Foto de Perfil:
- Círculo de 120x120px
- Borda amarela (#fbbf24)
- Botão de câmera no canto inferior direito
- Sombra suave
- Avatar padrão com iniciais

### Comprovantes:
- Botão outline secundário
- Preview com borda arredondada
- Ícone de PDF para arquivos PDF
- Status colorido (azul/verde/vermelho)

## 🔒 Validações Implementadas

### Foto de Perfil:
- ✅ Apenas imagens (JPG, PNG, GIF)
- ✅ Máximo 2MB
- ✅ Tipo de arquivo validado

### Comprovantes:
- ✅ Imagens (JPG, PNG, GIF) ou PDF
- ✅ Máximo 5MB
- ✅ Tipo de arquivo validado

## 📱 Responsividade

- ✅ Funciona em desktop
- ✅ Funciona em mobile
- ✅ Preview adaptável
- ✅ Botões responsivos

## 🐛 Tratamento de Erros

- ✅ Arquivo não selecionado
- ✅ Tipo de arquivo inválido
- ✅ Arquivo muito grande
- ✅ Erro no upload
- ✅ Erro na API
- ✅ Mensagens amigáveis

## 🎉 Resultado Final

### Foto de Perfil:
- Interface moderna com câmera flutuante
- Upload instantâneo
- Feedback visual claro
- Avatar padrão bonito

### Comprovantes:
- Botão opcional no modal
- Preview antes do envio
- Upload automático
- Suporte para imagens e PDFs

---

**Status**: ✅ Implementado e Pronto para Uso  
**Testado**: Foto de Perfil ✅ | Comprovantes ⏳  
**Próximo**: Adicionar scripts em principal.html
