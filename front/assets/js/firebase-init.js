// Configuração do Firebase para uso no navegador
// Versão compatível sem módulos ES6

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2xLKYgZXu0bjVpZwr4p7YvIhVdQkMVLs",
  authDomain: "financial-control1.firebaseapp.com",
  projectId: "financial-control1",
  storageBucket: "financial-control1.firebasestorage.app",
  messagingSenderId: "316674158632",
  appId: "1:316674158632:web:b4ac12b072cd428e32851d",
  measurementId: "G-4GHT48RQR9"
};

// Initialize Firebase
let firebaseApp;
let firebaseAnalytics;
let firebaseStorage;
let firebaseAuth;

// Função para inicializar Firebase
function initFirebase() {
  try {
    // Inicializar Firebase App
    firebaseApp = firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado com sucesso!');
    
    // Inicializar Analytics
    if (typeof firebase.analytics !== 'undefined') {
      firebaseAnalytics = firebase.analytics();
      console.log('✅ Firebase Analytics inicializado!');
    }
    
    // Inicializar Storage
    if (typeof firebase.storage !== 'undefined') {
      firebaseStorage = firebase.storage();
      console.log('✅ Firebase Storage inicializado!');
    }
    
    // Inicializar Auth
    if (typeof firebase.auth !== 'undefined') {
      firebaseAuth = firebase.auth();
      console.log('✅ Firebase Auth inicializado!');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
    return false;
  }
}

// Função para fazer upload de arquivo
async function uploadFileToFirebase(file, path) {
  try {
    if (!firebaseStorage) {
      throw new Error('Firebase Storage não está inicializado');
    }
    
    const storageRef = firebaseStorage.ref();
    const fileRef = storageRef.child(path);
    
    // Upload do arquivo
    const snapshot = await fileRef.put(file);
    console.log('✅ Upload concluído:', snapshot);
    
    // Obter URL de download
    const downloadURL = await fileRef.getDownloadURL();
    console.log('✅ URL do arquivo:', downloadURL);
    
    return {
      success: true,
      url: downloadURL,
      path: path
    };
  } catch (error) {
    console.error('❌ Erro no upload:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Função para deletar arquivo
async function deleteFileFromFirebase(path) {
  try {
    if (!firebaseStorage) {
      throw new Error('Firebase Storage não está inicializado');
    }
    
    const storageRef = firebaseStorage.ref();
    const fileRef = storageRef.child(path);
    
    await fileRef.delete();
    console.log('✅ Arquivo deletado:', path);
    
    return {
      success: true,
      message: 'Arquivo deletado com sucesso'
    };
  } catch (error) {
    console.error('❌ Erro ao deletar:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Função para obter URL de download
async function getFileURL(path) {
  try {
    if (!firebaseStorage) {
      throw new Error('Firebase Storage não está inicializado');
    }
    
    const storageRef = firebaseStorage.ref();
    const fileRef = storageRef.child(path);
    
    const url = await fileRef.getDownloadURL();
    return {
      success: true,
      url: url
    };
  } catch (error) {
    console.error('❌ Erro ao obter URL:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Inicializar quando o documento estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebase);
} else {
  initFirebase();
}
