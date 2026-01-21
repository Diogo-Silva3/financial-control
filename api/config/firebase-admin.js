// Configuração do Firebase Admin SDK
const admin = require('firebase-admin');

// Inicializar Firebase Admin
const initializeFirebaseAdmin = () => {
  try {
    // Verificar se já foi inicializado
    if (admin.apps.length > 0) {
      console.log('✅ Firebase Admin já inicializado');
      return admin;
    }

    // Configuração usando variáveis de ambiente
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID || "financial-control1",
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY ? 
        process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CERT_URL
    };

    // Inicializar com credenciais
    if (serviceAccount.private_key) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "financial-control1.firebasestorage.app"
      });
      console.log('✅ Firebase Admin inicializado com credenciais');
    } else {
      // Inicializar com credenciais padrão (para desenvolvimento local)
      admin.initializeApp({
        projectId: "financial-control1",
        storageBucket: "financial-control1.firebasestorage.app"
      });
      console.log('✅ Firebase Admin inicializado (modo desenvolvimento)');
    }

    return admin;
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase Admin:', error.message);
    throw error;
  }
};

// Obter instâncias
const getFirestore = () => {
  const admin = initializeFirebaseAdmin();
  return admin.firestore();
};

const getStorage = () => {
  const admin = initializeFirebaseAdmin();
  return admin.storage();
};

const getAuth = () => {
  const admin = initializeFirebaseAdmin();
  return admin.auth();
};

module.exports = {
  initializeFirebaseAdmin,
  getFirestore,
  getStorage,
  getAuth,
  admin
};
