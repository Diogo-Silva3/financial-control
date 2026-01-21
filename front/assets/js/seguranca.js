// ========== AUTENTICAÇÃO 2FA ==========

function gerar2FACode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function ativar2FA() {
    const codigo = gerar2FACode();
    localStorage.setItem('2fa_enabled', 'true');
    localStorage.setItem('2fa_secret', codigo);
    
    alert(`Código 2FA gerado: ${codigo}\n\nGuarde este código em local seguro!\n\nNa próxima vez que fizer login, você precisará deste código.`);
}

function desativar2FA() {
    if (confirm('Tem certeza que deseja desativar a autenticação de dois fatores?')) {
        localStorage.removeItem('2fa_enabled');
        localStorage.removeItem('2fa_secret');
        alert('2FA desativado com sucesso!');
    }
}

function verificar2FA(codigo) {
    const secret = localStorage.getItem('2fa_secret');
    return codigo === secret;
}

function modal2FA() {
    const enabled = localStorage.getItem('2fa_enabled') === 'true';
    
    const modal = `
        <div class="modal fade" id="modal2FA" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Autenticação de Dois Fatores (2FA)</h5>
                        