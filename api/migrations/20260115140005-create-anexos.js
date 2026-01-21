'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Anexos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			usuarioId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Usuarios',
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
			nomeArquivo: {
				type: Sequelize.STRING,
				allowNull: false
			},
			caminhoArquivo: {
				type: Sequelize.STRING,
				allowNull: false
			},
			tamanho: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			mimeType: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('Anexos');
	}
};
