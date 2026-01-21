// Sistema de Internacionalização (i18n)

const translations = {
    pt: {
        // Página de Login
        'app.name': 'Controle Financeiro',
        'login.title': 'Faça o login',
        'login.email': 'E-mail',
        'login.password': 'Senha',
        'login.remember': 'Lembrar',
        'login.button': 'Login',
        'login.google': 'Continuar com Google',
        'login.or': 'ou',
        'login.error.empty': 'Campo E-mail ou Senha vazio!',
        'login.error.invalid': 'Email ou senha inválidos!',
        'login.error.many': 'Muitas tentativas. Aguarde alguns minutos.',
        'login.loading': 'Entrando...',
        'login.success': 'Login realizado!',
        
        // Cadastro
        'signup.title': 'Cadastre-se',
        'signup.subtitle': 'Faça seu cadastro gratuito e controle suas finanças.',
        'signup.name': 'Primeiro Nome',
        'signup.button': 'Cadastre Agora!',
        'signup.error.empty': 'Preencha todos os campos!',
        'signup.error.exists': 'Este email já está cadastrado!',
        'signup.error.weak': 'A senha deve ter pelo menos 6 caracteres!',
        'signup.loading': 'Criando conta...',
        'signup.success': 'Conta criada com sucesso! Redirecionando...',
        
        // Menu Sidebar
        'menu.user': 'Usuário',
        'menu.dashboard': 'Painel',
        'menu.about': 'Sobre',
        'menu.tools': 'FERRAMENTAS',
        'menu.accounts': 'Minhas Contas',
        'menu.security': 'Segurança',
        'menu.import': 'Importar CSV',
        'menu.themes': 'Temas',
        'menu.achievements': 'Conquistas',
        'menu.logout': 'Sair',
        
        // Dashboard
        'dashboard.title': 'Dashboard Financeiro',
        'dashboard.search': 'Digite sua busca!',
        'dashboard.searchButton': 'Buscar',
        'dashboard.addIncome': 'Adicionar Receitas',
        'dashboard.addExpense': 'Adicionar Despesas',
        'dashboard.changeMonth': 'Mudar Mês',
        'dashboard.recurrent': 'Recorrentes',
        'dashboard.exportPDF': 'Exportar PDF',
        'dashboard.limit': 'Limite',
        'dashboard.goal': 'Meta',
        'dashboard.income': 'RECEITAS',
        'dashboard.expense': 'DESPESAS',
        'dashboard.balance': 'SALDO',
        'dashboard.connection.error': 'Problemas de conexão com o servidor!',
        
        // Botões Comuns
        'button.cancel': 'Cancelar',
        'button.save': 'Salvar',
        'button.edit': 'Editar',
        'button.delete': 'Excluir',
        'button.close': 'Fechar',
        'button.confirm': 'Confirmar',
        
        // Mensagens
        'message.loading': 'Carregando...',
        'message.success': 'Sucesso!',
        'message.error': 'Erro!',
        'message.noData': 'Nenhum dado encontrado',
    },
    
    en: {
        // Login Page
        'app.name': 'Financial Control',
        'login.title': 'Sign in',
        'login.email': 'Email',
        'login.password': 'Password',
        'login.remember': 'Remember me',
        'login.button': 'Login',
        'login.google': 'Continue with Google',
        'login.or': 'or',
        'login.error.empty': 'Email or Password field is empty!',
        'login.error.invalid': 'Invalid email or password!',
        'login.error.many': 'Too many attempts. Please wait a few minutes.',
        'login.loading': 'Signing in...',
        'login.success': 'Login successful!',
        
        // Signup
        'signup.title': 'Sign up',
        'signup.subtitle': 'Create your free account and manage your finances.',
        'signup.name': 'First Name',
        'signup.button': 'Sign Up Now!',
        'signup.error.empty': 'Please fill in all fields!',
        'signup.error.exists': 'This email is already registered!',
        'signup.error.weak': 'Password must be at least 6 characters!',
        'signup.loading': 'Creating account...',
        'signup.success': 'Account created successfully! Redirecting...',
        
        // Sidebar Menu
        'menu.user': 'User',
        'menu.dashboard': 'Dashboard',
        'menu.about': 'About',
        'menu.tools': 'TOOLS',
        'menu.accounts': 'My Accounts',
        'menu.security': 'Security',
        'menu.import': 'Import CSV',
        'menu.themes': 'Themes',
        'menu.achievements': 'Achievements',
        'menu.logout': 'Logout',
        
        // Dashboard
        'dashboard.title': 'Financial Dashboard',
        'dashboard.search': 'Type your search!',
        'dashboard.searchButton': 'Search',
        'dashboard.addIncome': 'Add Income',
        'dashboard.addExpense': 'Add Expense',
        'dashboard.changeMonth': 'Change Month',
        'dashboard.recurrent': 'Recurrent',
        'dashboard.exportPDF': 'Export PDF',
        'dashboard.limit': 'Limit',
        'dashboard.goal': 'Goal',
        'dashboard.income': 'INCOME',
        'dashboard.expense': 'EXPENSES',
        'dashboard.balance': 'BALANCE',
        'dashboard.connection.error': 'Server connection problems!',
        
        // Common Buttons
        'button.cancel': 'Cancel',
        'button.save': 'Save',
        'button.edit': 'Edit',
        'button.delete': 'Delete',
        'button.close': 'Close',
        'button.confirm': 'Confirm',
        
        // Messages
        'message.loading': 'Loading...',
        'message.success': 'Success!',
        'message.error': 'Error!',
        'message.noData': 'No data found',
    },
    
    es: {
        // Página de Inicio de Sesión
        'app.name': 'Control Financiero',
        'login.title': 'Iniciar sesión',
        'login.email': 'Correo electrónico',
        'login.password': 'Contraseña',
        'login.remember': 'Recordarme',
        'login.button': 'Iniciar sesión',
        'login.google': 'Continuar con Google',
        'login.or': 'o',
        'login.error.empty': '¡Campo de correo o contraseña vacío!',
        'login.error.invalid': '¡Correo o contraseña inválidos!',
        'login.error.many': 'Demasiados intentos. Espere unos minutos.',
        'login.loading': 'Iniciando sesión...',
        'login.success': '¡Inicio de sesión exitoso!',
        
        // Registro
        'signup.title': 'Regístrate',
        'signup.subtitle': 'Crea tu cuenta gratuita y controla tus finanzas.',
        'signup.name': 'Nombre',
        'signup.button': '¡Regístrate Ahora!',
        'signup.error.empty': '¡Complete todos los campos!',
        'signup.error.exists': '¡Este correo ya está registrado!',
        'signup.error.weak': '¡La contraseña debe tener al menos 6 caracteres!',
        'signup.loading': 'Creando cuenta...',
        'signup.success': '¡Cuenta creada con éxito! Redirigiendo...',
        
        // Menú Lateral
        'menu.user': 'Usuario',
        'menu.dashboard': 'Panel',
        'menu.about': 'Acerca de',
        'menu.tools': 'HERRAMIENTAS',
        'menu.accounts': 'Mis Cuentas',
        'menu.security': 'Seguridad',
        'menu.import': 'Importar CSV',
        'menu.themes': 'Temas',
        'menu.achievements': 'Logros',
        'menu.logout': 'Salir',
        
        // Panel de Control
        'dashboard.title': 'Panel Financiero',
        'dashboard.search': '¡Escribe tu búsqueda!',
        'dashboard.searchButton': 'Buscar',
        'dashboard.addIncome': 'Agregar Ingresos',
        'dashboard.addExpense': 'Agregar Gastos',
        'dashboard.changeMonth': 'Cambiar Mes',
        'dashboard.recurrent': 'Recurrentes',
        'dashboard.exportPDF': 'Exportar PDF',
        'dashboard.limit': 'Límite',
        'dashboard.goal': 'Meta',
        'dashboard.income': 'INGRESOS',
        'dashboard.expense': 'GASTOS',
        'dashboard.balance': 'SALDO',
        'dashboard.connection.error': '¡Problemas de conexión con el servidor!',
        
        // Botones Comunes
        'button.cancel': 'Cancelar',
        'button.save': 'Guardar',
        'button.edit': 'Editar',
        'button.delete': 'Eliminar',
        'button.close': 'Cerrar',
        'button.confirm': 'Confirmar',
        
        // Mensajes
        'message.loading': 'Cargando...',
        'message.success': '¡Éxito!',
        'message.error': '¡Error!',
        'message.noData': 'No se encontraron datos',
    }
};

// Idioma atual (padrão: português)
let currentLanguage = localStorage.getItem('language') || 'pt';

// Função para obter tradução
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Função para mudar idioma
function changeLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        translatePage();
    }
}

// Função para traduzir a página
function translatePage() {
    // Traduzir elementos com atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Traduzir placeholders com atributo data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Traduzir títulos com atributo data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });
}

// Inicializar tradução quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', translatePage);
} else {
    translatePage();
}

// Exportar funções
window.t = t;
window.changeLanguage = changeLanguage;
window.translatePage = translatePage;
window.currentLanguage = () => currentLanguage;
