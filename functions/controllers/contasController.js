const admin = require('firebase-admin');
const db = admin.firestore();

class ContasController {
  
  static async listaContas(req, res) {
    try {
      const snapshot = await db.collection('contas').get();
      
      const contas = [];
      snapshot.forEach(doc => {
        contas.push({ id: doc.id, ...doc.data() });
      });
      
      res.json(contas);
    } catch (erro) {
      console.error('Erro ao listar contas:', erro);
      res.status(500).json({ erro: 'Erro ao listar contas' });
    }
  }
  
  static async adicionarConta(req, res) {
    try {
      const { nome, saldo, tipo } = req.body;
      
      const novaConta = {
        nome,
        saldo: parseFloat(saldo) || 0,
        tipo: tipo || 'Corrente',
        criadoEm: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection('contas').add(novaConta);
      
      res.status(201).json({ 
        id: docRef.id,
        ...novaConta,
        mensagem: 'Conta adicionada com sucesso!'
      });
    } catch (erro) {
      console.error('Erro ao adicionar conta:', erro);
      res.status(500).json({ erro: 'Erro ao adicionar conta' });
    }
  }
}

module.exports = ContasController;
