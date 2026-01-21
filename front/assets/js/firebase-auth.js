// Importar Firebase (já está carregado via firebase-init.js)
const auth = firebase.auth();
const db = firebase.firestore();

// Função para cadastrar usuário
async function cadastrarUsuario(nome, email, senha) {
    try {
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
        auth.onAuthStateChanged((user) => {
            resolve(user);
        });
    });
}

// Função para obter usuário atual
function getUsuarioAtual() {
    return auth.currentUser;
}
