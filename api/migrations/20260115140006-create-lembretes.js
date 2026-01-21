'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Lembretes', {
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
			titulo: {
				type: Sequelize.STRING,
				allowNull: false
			},
			descricao: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			dataLembrete: {
				type: Sequelize.DATE,
				allowNull: false
			},
			tipo: {
				type: Sequelize.STRING,
				defaultValue: 'geral'
			},
			itemId: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			ativo: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			},
			notificado: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
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
		await queryInterface.dropTable('Lembretes');
	}
};
