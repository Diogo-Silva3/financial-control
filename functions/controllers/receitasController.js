const admin = require('firebase-admin');
const db = admin.firestore();

class ReceitasController {
  
  static async listaReceitas(req, res) {
    try {
      const snapshot = await db.collection('receitas')
        .orderBy('data', 'desc')
        .limit(50)
        .get();
      
      const receitas = [];
      snapshot.forEach(doc => {
        receitas.push({ id: doc.id, ...doc.data() });
      });
      
      res.json(receitas);
    } catch (erro) {
      console.error('Erro ao listar receitas:', erro);
      res.status(500).json({ erro: 'Erro ao listar receitas' });
    }
  }
  
  static async adicionarReceita(req, res) {
    try {
      const { descricao, valor, data, categoria, contaId } = req.body;
      
      const novaReceita = {
        descricao,
        valor: parseFloat(valor),
        data: new Date(data),
        categoria: categoria || 'Outros',
        contaId: contaId || null,
        criadoEm: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection('receitas').add(novaReceita);
      
      res.status(201).json({ 
        id: docRef.id,
        ...novaReceita,
        mensagem: 'Receita adicionada com sucesso!'
      });
    } catch (erro) {
      console.error('Erro ao adicionar receita:', erro);
      res.status(500).json({ erro: 'Erro ao adicionar receita' });
    }
  }
}

module.exports = ReceitasController;
