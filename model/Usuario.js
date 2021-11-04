const Sequelize = require("sequelize");
const db = require("./db");

const Usuario = db.define(
	"usuario",
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

module.exports = Usuario;
