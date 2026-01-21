'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Anexo extends Model {
		static associate(models) {
			Anexo.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioId'
			});
		}
	}
	
	Anexo.init({
		usuarioId: DataTypes.INTEGER,
		tipo: DataTypes.ENUM('receita', 'despesa'),
		itemId: DataTypes.INTEGER,
		nomeArquivo: DataTypes.STRING,
		caminhoArquivo: DataTypes.STRING,
		tamanho: DataTypes.INTEGER,
		mimeType: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Anexos',
	});
	
	return Anexo;
};
