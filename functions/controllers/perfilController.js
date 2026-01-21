const admin = require('firebase-admin');
const db = admin.firestore();

class PerfilController {
  
  static async getPerfil(req, res) {
    try {
      // TODO: Pegar ID do usuário autenticado
      const userId = req.query.userId || req.headers['user-id'];
      
      if (!userId) {
        return res.status(400).json({ erro: 'ID do usuário não fornecido' });
      }
      
      const doc = await db.collection('usuarios').doc(userId).get();
      
      if (!doc.exists) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      
      const userData = doc.data();
      
      res.json({
        id: doc.id,
        nome: userData.nome,
        email: userData.email,
        fotoPerfil: userData.fotoPerfil || null,
        criadoEm: userData.criadoEm
      });
    } catch (erro) {
      console.error('Erro ao buscar perfil:', erro);
      res.status(500).json({ erro: 'Erro ao buscar perfil' });
    }
  }
  
  static async atualizarPerfil(req, res) {
    try {
      const userId = req.query.userId || req.headers['user-id'];
      const { nome, fotoPerfil } = req.body;
      
      if (!userId) {
        return res.status(400).json({ erro: 'ID do usuário não fornecido' });
      }
      
      const updateData = {};
      if (nome) updateData.nome = nome;
      if (fotoPerfil) updateData.fotoPerfil = fotoPerfil;
      updateData.atualizadoEm = admin.firestore.FieldValue.serverTimestamp();
      
      await db.collection('usuarios').doc(userId).update(updateData);
      
      res.json({ 
        mensagem: 'Perfil atualizado com sucesso!',
        ...updateData
      });
    } catch (erro) {
      console.error('Erro ao atualizar perfil:', erro);
      res.status(500).json({ erro: 'Erro ao atualizar perfil' });
    }
  }
}

module.exports = PerfilController;
