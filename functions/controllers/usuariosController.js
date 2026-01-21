const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = admin.firestore();
const CHAVE_JWT = process.env.CHAVE_JWT || 'sua-chave-secreta-aqui';

class UsuariosController {
  
  static async adicionarUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body;
      
      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
      }
      
      // Verificar se usuário já existe
      const usuarioExistente = await db.collection('usuarios')
        .where('email', '==', email)
        .get();
      
      if (!usuarioExistente.empty) {
        return res.status(400).json({ erro: 'Email já cadastrado' });
      }
      
      // Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 12);
      
      // Criar usuário
      const novoUsuario = {
        nome,
        email,
        senha: senhaHash,
        verificado: true, // Por enquanto, sem verificação de email
        criadoEm: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection('usuarios').add(novoUsuario);
      
      res.status(201).json({ 
        id: docRef.id,
        nome,
        email,
        mensagem: 'Usuário criado com sucesso!'
      });
      
    } catch (erro) {
      console.error('Erro ao criar usuário:', erro);
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  }
  
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
      }
      
      // Buscar usuário
      const snapshot = await db.collection('usuarios')
        .where('email', '==', email)
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
      }
      
      const usuario = snapshot.docs[0];
      const userData = usuario.data();
      
      // Verificar senha
      const senhaValida = await bcrypt.compare(senha, userData.senha);
      
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
      }
      
      // Gerar tokens
      const accessToken = jwt.sign(
        { id: usuario.id, email: userData.email },
        CHAVE_JWT,
        { expiresIn: '15m' }
      );
      
      const refreshToken = jwt.sign(
        { id: usuario.id, email: userData.email },
        CHAVE_JWT,
        { expiresIn: '7d' }
      );
      
      // Salvar refresh token
      await db.collection('usuarios').doc(usuario.id).update({
        refreshToken,
        ultimoLogin: admin.firestore.FieldValue.serverTimestamp()
      });
      
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.json({
        refreshToken,
        nomeUsuario: userData.nome,
        mensagem: 'Login realizado com sucesso!'
      });
      
    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      res.status(500).json({ erro: 'Erro ao fazer login' });
    }
  }
  
  static async listaUsuario(req, res) {
    try {
      // Por enquanto, retornar apenas o usuário autenticado
      // TODO: Implementar autenticação JWT
      
      const snapshot = await db.collection('usuarios').limit(10).get();
      const usuarios = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        usuarios.push({
          id: doc.id,
          nome: data.nome,
          email: data.email,
          criadoEm: data.criadoEm
        });
      });
      
      res.json(usuarios);
      
    } catch (erro) {
      console.error('Erro ao listar usuários:', erro);
      res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  }
}

module.exports = UsuariosController;
