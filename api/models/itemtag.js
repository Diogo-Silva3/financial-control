'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class ItemTag extends Model {
		static associate(models) {
			ItemTag.belongsTo(models.Tags, {
				foreignKey: 'tagId',
				as: 'tag'
			});
		}
	}
	
	ItemTag.init({
		tagId: DataTypes.INTEGER,
		tipo: DataTypes.ENUM('receita', 'despesa'),
		itemId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'ItemTags',
	});
	
	return ItemTag;
};
