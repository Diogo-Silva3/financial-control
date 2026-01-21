'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Tag extends Model {
		static associate(models) {
			Tag.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioId'
			});
			Tag.hasMany(models.ItemTags, {
				foreignKey: 'tagId'
			});
		}
	}
	
	Tag.init({
		usuarioId: DataTypes.INTEGER,
		nome: DataTypes.STRING,
		cor: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Tags',
	});
	
	return Tag;
};
