const admin = require('firebase-admin');
const db = admin.firestore();

class DespesasController {
  
  static async listaDespesas(req, res) {
    try {
      const snapshot = await db.collection('despesas')
        .orderBy('data', 'desc')
        .limit(50)
        .get();
      
      const despesas = [];
      snapshot.forEach(doc => {
        despesas.push({ id: doc.id, ...doc.data() });
      });
      
      res.json(despesas);
    } catch (erro) {
      console.error('Erro ao listar despesas:', erro);
      res.status(500).json({ erro: 'Erro ao listar despesas' });
    }
  }
  
  static async adicionarDespesa(req, res) {
    try {
      const { descricao, valor, data, categoria, contaId } = req.body;
      
      const novaDespesa = {
        descricao,
        valor: parseFloat(valor),
        data: new Date(data),
        categoria: categoria || 'Outros',
        contaId: contaId || null,
        criadoEm: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection('despesas').add(novaDespesa);
      
      res.status(201).json({ 
        id: docRef.id,
        ...novaDespesa,
        mensagem: 'Despesa adicionada com sucesso!'
      });
    } catch (erro) {
      console.error('Erro ao adicionar despesa:', erro);
      res.status(500).json({ erro: 'Erro ao adicionar despesa' });
    }
  }
}

module.exports = DespesasController;
