const admin = require('firebase-admin');
const db = admin.firestore();

class TagsController {
  
  static async listaTags(req, res) {
    try {
      const snapshot = await db.collection('tags').get();
      
      const tags = [];
      snapshot.forEach(doc => {
        tags.push({ id: doc.id, ...doc.data() });
      });
      
      res.json(tags);
    } catch (erro) {
      console.error('Erro ao listar tags:', erro);
      res.status(500).json({ erro: 'Erro ao listar tags' });
    }
  }
  
  static async adicionarTag(req, res) {
    try {
      const { nome, cor } = req.body;
      
      const novaTag = {
        nome,
        cor: cor || '#3498db',
        criadoEm: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection('tags').add(novaTag);
      
      res.status(201).json({ 
        id: docRef.id,
        ...novaTag,
        mensagem: 'Tag adicionada com sucesso!'
      });
    } catch (erro) {
      console.error('Erro ao adicionar tag:', erro);
      res.status(500).json({ erro: 'Erro ao adicionar tag' });
    }
  }
}

module.exports = TagsController;
