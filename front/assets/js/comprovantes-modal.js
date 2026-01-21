// Modal de Comprovantes

// Adicionar botão de anexar comprovante no modal de despesas
function adicionarBotaoComprovante() {
    // Verificar se já existe
    if (document.getElementById('btnAnexarComprovante')) {
        return;
    }
    
    // Criar HTML do botão
    const comprovanteHTML = `
        <div id="comprovanteSection" style="margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 10px; display: none;">
            <h6 style="color: #1e293b; font-weight: 600; margin-bottom: 10px;">
                <span class="material-symbols-outlined" style="vertical-align: middle; font-size: 1.2rem;">attach_file</span>
                Anexar Comprovante
            </h6>
            
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <label for="inputComprovante" class="btn btn-outline-primary" style="margin: 0; cursor: pointer;">
                    <span class="material-symbols-outlined" style="vertical-align: middle;">upload_file</span>
                    Escolher Arquivo
                </label>
                <input type="file" id="inputComprovante" accept="image/*,application/pdf" style="display: none;">
                
                <span id="nomeArquivo" style="color: #64748b; font-size: 0.9rem;"></span>
            </div>
            
            <div id="previewComprovante" style="margin-top: 15px;"></div>
            <p id="comprovanteStatus" style="margin-top: 10px; font-size: 0.85rem;"></p>
        </div>
        
        <button type="button" id="btnAnexarComprovante" class="btn btn-outline-secondary" style="width: 100%; margin-top: 10px;">
            <span class="material-symbols-outlined" style="vertical-align: middle;">attach_file</span>
            Anexar Comprovante (Opcional)
        </button>
    `;
    
    // Inserir no modal
    const modalBody = document.getElementById('modal-info');
    if (modalBody) {
        // Criar um container temporário
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = comprovanteHTML;
        
        // Adicionar ao modal
        modalBody.appendChild(tempDiv);
        
        // Adicionar event listeners
        setupComprovanteListeners();
    }
}

// Configurar event listeners
function setupComprovanteListeners() {
    // Botão para mostrar/ocultar seção
    const btnAnexar = document.getElementById('btnAnexarComprovante');
    if (btnAnexar) {
        btnAnexar.addEventListener('click', function() {
            const section = document.getElementById('comprovanteSection');
            if (section.style.display === 'none') {
                section.style.display = 'block';
                btnAnexar.innerHTML = '<span class="material-symbols-outlined" style="vertical-align: middle;">close</span> Cancelar Anexo';
                btnAnexar.classList.remove('btn-outline-secondary');
                btnAnexar.classList.add('btn-outline-danger');
            } else {
                section.style.display = 'none';
                btnAnexar.innerHTML = '<span class="material-symbols-outlined" style="vertical-align: middle;">attach_file</span> Anexar Comprovante (Opcional)';
                btnAnexar.classList.remove('btn-outline-danger');
                btnAnexar.classList.add('btn-outline-secondary');
                limparComprovante();
            }
        });
    }
    
    // Input de arquivo
    const inputComprovante = document.getElementById('inputComprovante');
    if (inputComprovante) {
        inputComprovante.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                mostrarPreviewComprovante(file);
            }
        });
    }
}

// Mostrar preview do comprovante
function mostrarPreviewComprovante(file) {
    const nomeArquivo = document.getElementById('nomeArquivo');
    const preview = document.getElementById('previewComprovante');
    const status = document.getElementById('comprovanteStatus');
    
    // Mostrar nome e tamanho
    nomeArquivo.textContent = `${file.name} (${formatarTamanho(file.size)})`;
    
    // Preview
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `
                <img src="${e.target.result}" 
                     style="max-width: 100%; max-height: 200px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            `;
        };
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        preview.innerHTML = `
            <div style="padding: 20px; background: white; border-radius: 8px; text-align: center; border: 2px dashed #cbd5e1;">
                <span class="material-symbols-outlined" style="font-size: 3rem; color: #ef4444;">picture_as_pdf</span>
                <p style="margin: 10px 0 0 0; color: #64748b;">Arquivo PDF selecionado</p>
            </div>
        `;
    }
    
    status.textContent = '✅ Arquivo pronto para envio';
    status.style.color = '#10b981';
}

// Limpar comprovante
function limparComprovante() {
    const inputComprovante = document.getElementById('inputComprovante');
    const nomeArquivo = document.getElementById('nomeArquivo');
    const preview = document.getElementById('previewComprovante');
    const status = document.getElementById('comprovanteStatus');
    
    if (inputComprovante) inputComprovante.value = '';
    if (nomeArquivo) nomeArquivo.textContent = '';
    if (preview) preview.innerHTML = '';
    if (status) status.textContent = '';
}

// Fazer upload do comprovante após salvar despesa
async function uploadComprovanteSeExistir(despesaId) {
    const inputComprovante = document.getElementById('inputComprovante');
    
    if (!inputComprovante || !inputComprovante.files[0]) {
        return { success: true, message: 'Nenhum comprovante para enviar' };
    }
    
    const file = inputComprovante.files[0];
    const status = document.getElementById('comprovanteStatus');
    
    if (status) {
        status.textContent = '📤 Enviando comprovante...';
        status.style.color = '#3b82f6';
    }
    
    // Upload para Firebase
    const result = await uploadComprovante(file, despesaId);
    
    if (result.success) {
        if (status) {
            status.textContent = '✅ Comprovante anexado com sucesso!';
            status.style.color = '#10b981';
        }
        
        // Limpar após 2 segundos
        setTimeout(() => {
            limparComprovante();
            const section = document.getElementById('comprovanteSection');
            if (section) section.style.display = 'none';
        }, 2000);
    } else {
        if (status) {
            status.textContent = '❌ Erro ao anexar: ' + result.error;
            status.style.color = '#ef4444';
        }
    }
    
    return result;
}

// Inicializar quando o modal for aberto
$(document).on('shown.bs.modal', '#exampleModal', function() {
    // Adicionar botão de comprovante se não existir
    adicionarBotaoComprovante();
});

// Limpar ao fechar modal
$(document).on('hidden.bs.modal', '#exampleModal', function() {
    limparComprovante();
    const section = document.getElementById('comprovanteSection');
    if (section) section.style.display = 'none';
    
    const btnAnexar = document.getElementById('btnAnexarComprovante');
    if (btnAnexar) {
        btnAnexar.innerHTML = '<span class="material-symbols-outlined" style="vertical-align: middle;">attach_file</span> Anexar Comprovante (Opcional)';
        btnAnexar.classList.remove('btn-outline-danger');
        btnAnexar.classList.add('btn-outline-secondary');
    }
});
