// Aguardar Firebase estar pronto
let auth, db;
let firebaseReady = false;

// Inicializar quando Firebase estiver pronto
function initFirebaseServices() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase não está carregado!');
        return false;
    }
    
    try {
        // Aguardar Firebase App estar inicializado
        if (firebase.apps.length === 0) {
            console.log('⏳ Aguardando Firebase App ser inicializado...');
            return false;
        }
        
        auth = firebase.auth();
        db = firebase.firestore();
        firebaseReady = true;
        console.log('✅ Firebase Auth e Firestore prontos!');
        return true;
    } catch (erro) {
        console.error('Erro ao inicializar serviços:', erro);
        return false;
    }
}

// Função para aguardar Firebase estar pronto
function waitForFirebase() {
    return new Promise((resolve) => {
        if (firebaseReady) {
            resolve(true);
            return;
        }
        
        const checkInterval = setInterval(() => {
            if (initFirebaseServices()) {
                clearInterval(checkInterval);
                resolve(true);
            }
        }, 100);
        
        // Timeout após 10 segundos
        setTimeout(() => {
            clearInterval(checkInterval);
            resolve(false);
        }, 10000);
    });
}

// Função para cadastrar usuário
async function cadastrarUsuario(nome, email, senha) {
    try {
        await waitForFirebase();
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
        await waitForFirebase();
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

// Função para login com Google
async function loginComGoogle() {
    try {
        await waitForFirebase();
        if (!auth) initFirebaseServices();
        
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // Verificar se usuário já existe no Firestore
        const docRef = db.collection('usuarios').doc(user.uid);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            // Criar novo usuário no Firestore
            await docRef.set({
                nome: user.displayName,
                email: user.email,
                fotoPerfil: user.photoURL,
                criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
                verificado: true,
                loginGoogle: true
            });
        }
        
        return {
            sucesso: true,
            usuario: user,
            nome: user.displayName
        };
    } catch (erro) {
        console.error('Erro ao fazer login com Google:', erro);
        
        // Tratar erros específicos
        if (erro.code === 'auth/popup-closed-by-user') {
            return { sucesso: false, erro: 'Login cancelado pelo usuário' };
        } else if (erro.code === 'auth/popup-blocked') {
            return { sucesso: false, erro: 'Pop-up bloqueado. Permita pop-ups para este site.' };
        }
        
        return { sucesso: false, erro: erro.message };
    }
}

// Função para fazer logout
async function fazerLogout() {
    try {
        await waitForFirebase();
        if (!auth) initFirebaseServices();
        
        await auth.signOut();
        return { sucesso: true };
    } catch (erro) {
        console.error('Erro ao fazer logout:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

// Função para verificar se usuário está logado
async function verificarUsuarioLogado() {
    await waitForFirebase();
    if (!auth) initFirebaseServices();
    
    return new Promise((resolve) => {
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
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initFirebaseServices, 500);
    });
} else {
    // Se já carregou, aguardar um pouco para Firebase estar pronto
    setTimeout(initFirebaseServices, 500);
}
