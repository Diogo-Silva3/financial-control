'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ItemTags', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			tagId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Tags',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			tipo: {
				type: Sequelize.ENUM('receita', 'despesa'),
				allowNull: false
			},
			itemId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('ItemTags');
	}
};
