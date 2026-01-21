const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializar Firebase Admin
admin.initializeApp();

// Criar app Express
const app = express();

// Configurar CORS - aceitar todas as origens
app.use(cors({ origin: true }));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rotas da API existente
const usuariosController = require('./controllers/usuariosController');
const receitasController = require('./controllers/receitasController');
const despesasController = require('./controllers/despesasController');
const contasController = require('./controllers/contasController');
const tagsController = require('./controllers/tagsController');
const perfilController = require('./controllers/perfilController');

// Rotas básicas (sem autenticação por enquanto para testar)
app.post('/usuarios', usuariosController.adicionarUsuario);
app.post('/usuarios/login', usuariosController.login);
app.get('/usuarios', usuariosController.listaUsuario);

app.get('/receitas', receitasController.listaReceitas);
app.post('/receitas', receitasController.adicionarReceita);

app.get('/despesas', despesasController.listaDespesas);
app.post('/despesas', despesasController.adicionarDespesa);

app.get('/contas', contasController.listaContas);
app.post('/contas', contasController.adicionarConta);

app.get('/tags', tagsController.listaTags);
app.post('/tags', tagsController.adicionarTag);

app.get('/perfil', perfilController.getPerfil);
app.put('/perfil', perfilController.atualizarPerfil);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'API Controle Financeiro - Firebase Functions',
    version: '1.0.0'
  });
});

// Exportar como Firebase Function
exports.api = functions.https.onRequest(app);
