'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Contas', {
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
			nome: {
				type: Sequelize.STRING,
				allowNull: false
			},
			tipo: {
				type: Sequelize.ENUM('corrente', 'poupanca', 'cartao', 'dinheiro', 'investimento'),
				allowNull: false
			},
			saldoInicial: {
				type: Sequelize.DECIMAL(10, 2),
				defaultValue: 0
			},
			saldoAtual: {
				type: Sequelize.DECIMAL(10, 2),
				defaultValue: 0
			},
			cor: {
				type: Sequelize.STRING,
				defaultValue: '#667eea'
			},
			icone: {
				type: Sequelize.STRING,
				defaultValue: 'account_balance'
			},
			ativa: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
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
		await queryInterface.dropTable('Contas');
	}
};
