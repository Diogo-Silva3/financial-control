'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Conta extends Model {
		static associate(models) {
			Conta.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioId'
			});
			Conta.hasMany(models.Transferencias, {
				foreignKey: 'contaOrigemId',
				as: 'transferenciasOrigem'
			});
			Conta.hasMany(models.Transferencias, {
				foreignKey: 'contaDestinoId',
				as: 'transferenciasDestino'
			});
		}
	}
	
	Conta.init({
		usuarioId: DataTypes.INTEGER,
		nome: DataTypes.STRING,
		tipo: DataTypes.ENUM('corrente', 'poupanca', 'cartao', 'dinheiro', 'investimento'),
		saldoInicial: DataTypes.DECIMAL(10, 2),
		saldoAtual: DataTypes.DECIMAL(10, 2),
		cor: DataTypes.STRING,
		icone: DataTypes.STRING,
		ativa: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Contas',
	});
	
	return Conta;
};
