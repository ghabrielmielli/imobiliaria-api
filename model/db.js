const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: "postgres",
	port: 5432,
	dialect: "postgres",
	define: {
		freezeTableName: true,
	},
});

module.exports = sequelize;
