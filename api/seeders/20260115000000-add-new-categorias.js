'use strict'

require('dotenv').config()
const process = require('process')
const env = process.env.NODE_ENV

const {database, username, password, dialect} = require(__dirname + '/../config/config.json')[env];

console.log(`Ambiente de desenvolvimento "${env}"`)

module.exports = {
	async up (queryInterface, Sequelize) {
    	const sequelize = new Sequelize("", username, password, {
      		dialect: dialect,
    	});

		return sequelize.query(
			`INSERT INTO ${database}.categoria (id, nome) VALUES` +
			` (9, 'Internet'),` +
			` (10, 'Neoenergia'),` +
			` (11, 'Compesa');`
    	)
	},
    
	async down (queryInterface, Sequelize) {
    	const sequelize = new Sequelize("", username, password, {
        	dialect: dialect,
      	});

      	return sequelize.query(
			`DELETE FROM ${database}.categoria WHERE id IN (9, 10, 11);`
    	);
    },
};
