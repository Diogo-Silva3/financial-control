'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Transferencias', {
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
			contaOrigemId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Contas',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			contaDestinoId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Contas',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			valor: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false
			},
			descricao: {
				type: Sequelize.STRING,
				allowNull: true
			},
			data: {
				type: Sequelize.DATE,
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
		await queryInterface.dropTable('Transferencias');
	}
};
