'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Transferencia extends Model {
		static associate(models) {
			Transferencia.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioId'
			});
			Transferencia.belongsTo(models.Contas, {
				foreignKey: 'contaOrigemId',
				as: 'contaOrigem'
			});
			Transferencia.belongsTo(models.Contas, {
				foreignKey: 'contaDestinoId',
				as: 'contaDestino'
			});
		}
	}
	
	Transferencia.init({
		usuarioId: DataTypes.INTEGER,
		contaOrigemId: DataTypes.INTEGER,
		contaDestinoId: DataTypes.INTEGER,
		valor: DataTypes.DECIMAL(10, 2),
		descricao: DataTypes.STRING,
		data: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Transferencias',
	});
	
	return Transferencia;
};
