const Sequelize = require("sequelize");
const db = require("./db");

const Cliente = db.define(
	"cliente",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		cpf: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		tipo: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	},
	{
		schema: "public",
	}
);

module.exports = Cliente;
