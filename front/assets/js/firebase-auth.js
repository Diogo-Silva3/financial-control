// Aguardar Firebase estar pronto
let auth, db;

// Inicializar quando Firebase estiver pronto
function initFirebaseServices() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase não está carregado!');
        return false;
    }
    
    try {
        auth = firebase.auth();
        db = firebase.firestore();
        console.log('✅ Firebase Auth e Firestore prontos!');
        return true;
    } catch (erro) {
        console.error('Erro ao inicializar serviços:', erro);
        return false;
    }
}

// Função para cadastrar usuário
async function cadastrarUsuario(nome, email, senha) {
    try {
        if (!auth) initFirebaseServices();
        
        // Criar usuário no Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        
        // Salvar dados adicionais no Firestore
        await db.collection('usuarios').doc(user.uid).set({
            nome: nome,
            email: email,
            criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
            verificado: true
        });
        
        // Atualizar nome no perfil
        await user.updateProfile({
            displayName: nome
        });
        
        return { sucesso: true, usuario: user };
    } catch (erro) {
        console.error('Erro ao cadastrar:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

// Função para fazer login
async function fazerLogin(email, senha) {
    try {
        if (!auth) initFirebaseServices();
        
        const userCredential = await auth.signInWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        
        // Buscar dados do usuário no Firestore
        const doc = await db.collection('usuarios').doc(user.uid).get();
        const userData = doc.data();
        
        return { 
            sucesso: true, 
            usuario: user,
            nome: userData?.nome || user.displayName
        };
    } catch (erro) {
        console.error('Erro ao fazer login:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

// Função para fazer logout
async function fazerLogout() {
    try {
        if (!auth) initFirebaseServices();
        
        await auth.signOut();
        return { sucesso: true };
    } catch (erro) {
        console.error('Erro ao fazer logout:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

// Função para verificar se usuário está logado
function verificarUsuarioLogado() {
    return new Promise((resolve) => {
        if (!auth) initFirebaseServices();
        
        auth.onAuthStateChanged((user) => {
            resolve(user);
        });
    });
}

// Função para obter usuário atual
function getUsuarioAtual() {
    if (!auth) initFirebaseServices();
    return auth.currentUser;
}

// Inicializar quando o documento estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebaseServices);
} else {
    // Se já carregou, aguardar um pouco para Firebase estar pronto
    setTimeout(initFirebaseServices, 500);
}
