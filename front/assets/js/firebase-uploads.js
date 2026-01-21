// Funções de Upload com Firebase Storage

// Upload de Foto de Perfil
async function uploadFotoPerfil(file) {
    try {
        // Validar arquivo
        if (!file) {
            throw new Error('Nenhum arquivo selecionado');
        }
        
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            throw new Error('Apenas imagens são permitidas');
        }
        
        // Validar tamanho (máximo 2MB)
        if (file.size > 2 * 1024 * 1024) {
            throw new Error('Imagem muito grande. Máximo 2MB');
        }
        
        // Obter ID do usuário
        const userId = localStorage.getItem('userId') || 'user_' + Date.now();
        
        // Criar caminho único
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const path = `perfis/${userId}_${timestamp}.${extension}`;
        
        console.log('📤 Iniciando upload da foto de perfil...');
        
        // Upload para Firebase
        const result = await uploadFileToFirebase(file, path);
        
        if (result.success) {
            console.log('✅ Foto de perfil enviada:', result.url);
            
            // Salvar URL no localStorage
            localStorage.setItem('fotoPerfil', result.url);
            
            // Atualizar no banco de dados via API
            try {
                await fetch(`${endereco}/usuarios/foto`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${at}`
                    },
                    body: JSON.stringify({
                        fotoUrl: result.url,
                        fotoPath: result.path
                    })
                });
            } catch (apiError) {
                console.warn('⚠️ Erro ao salvar no banco:', apiError);
            }
            
            return result;
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Erro no upload da foto:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Upload de Comprovante
async function uploadComprovante(file, despesaId) {
    try {
        // Validar arquivo
        if (!file) {
            throw new Error('Nenhum arquivo selecionado');
        }
        
        // Validar tipo de arquivo (imagem ou PDF)
        const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
        if (!tiposPermitidos.includes(file.type)) {
            throw new Error('Apenas imagens (JPG, PNG, GIF) ou PDF são permitidos');
        }
        
        // Validar tamanho (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('Arquivo muito grande. Máximo 5MB');
        }
        
        // Criar caminho único
        const timestamp = Date.now();
        const userId = localStorage.getItem('userId') || 'user';
        const extension = file.name.split('.').pop();
        const path = `comprovantes/${userId}/despesa_${despesaId}_${timestamp}.${extension}`;
        
        console.log('📤 Iniciando upload do comprovante...');
        
        // Upload para Firebase
        const result = await uploadFileToFirebase(file, path);
        
        if (result.success) {
            console.log('✅ Comprovante enviado:', result.url);
            
            // Salvar no banco de dados via API
            try {
                await fetch(`${endereco}/anexos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${at}`
                    },
                    body: JSON.stringify({
                        despesaId: despesaId,
                        tipo: 'comprovante',
                        url: result.url,
                        path: result.path,
                        nomeArquivo: file.name,
                        tamanho: file.size,
                        tipoArquivo: file.type
                    })
                });
            } catch (apiError) {
                console.warn('⚠️ Erro ao salvar no banco:', apiError);
            }
            
            return result;
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Erro no upload do comprovante:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Deletar Foto de Perfil
async function deletarFotoPerfil(path) {
    try {
        const result = await deleteFileFromFirebase(path);
        
        if (result.success) {
            // Remover do localStorage
            localStorage.removeItem('fotoPerfil');
            
            // Atualizar no banco de dados
            try {
                await fetch(`${endereco}/usuarios/foto`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${at}`
                    }
                });
            } catch (apiError) {
                console.warn('⚠️ Erro ao deletar do banco:', apiError);
            }
        }
        
        return result;
    } catch (error) {
        console.error('❌ Erro ao deletar foto:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Deletar Comprovante
async function deletarComprovante(path, anexoId) {
    try {
        const result = await deleteFileFromFirebase(path);
        
        if (result.success) {
            // Deletar do banco de dados
            try {
                await fetch(`${endereco}/anexos/${anexoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${at}`
                    }
                });
            } catch (apiError) {
                console.warn('⚠️ Erro ao deletar do banco:', apiError);
            }
        }
        
        return result;
    } catch (error) {
        console.error('❌ Erro ao deletar comprovante:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Carregar Foto de Perfil
function carregarFotoPerfil() {
    const fotoUrl = localStorage.getItem('fotoPerfil');
    
    if (fotoUrl) {
        // Atualizar todas as imagens de perfil na página
        const fotosPerfilElements = document.querySelectorAll('.foto-perfil, #fotoPerfil, .user-avatar');
        fotosPerfilElements.forEach(img => {
            img.src = fotoUrl;
        });
    }
}

// Preview de imagem antes do upload
function previewImagem(file, elementId) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.getElementById(elementId);
            if (img) {
                img.src = e.target.result;
            }
        };
        
        reader.readAsDataURL(file);
    }
}

// Formatar tamanho de arquivo
function formatarTamanho(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Carregar foto de perfil quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarFotoPerfil);
} else {
    carregarFotoPerfil();
}
