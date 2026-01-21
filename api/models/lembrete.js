'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Lembrete extends Model {
		static associate(models) {
			Lembrete.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioId'
			});
		}
	}
	
	Lembrete.init({
		usuarioId: DataTypes.INTEGER,
		titulo: DataTypes.STRING,
		descricao: DataTypes.TEXT,
		dataLembrete: DataTypes.DATE,
		tipo: DataTypes.STRING,
		itemId: DataTypes.INTEGER,
		ativo: DataTypes.BOOLEAN,
		notificado: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Lembretes',
	});
	
	return Lembrete;
};
