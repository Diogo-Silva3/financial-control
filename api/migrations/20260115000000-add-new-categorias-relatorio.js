'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('relatorios', 'internet', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false
    });
    
    await queryInterface.addColumn('relatorios', 'neoenergia', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false
    });
    
    await queryInterface.addColumn('relatorios', 'compesa', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('relatorios', 'internet');
    await queryInterface.removeColumn('relatorios', 'neoenergia');
    await queryInterface.removeColumn('relatorios', 'compesa');
  }
};
