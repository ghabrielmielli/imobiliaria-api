const Sequelize = require("sequelize");
const db = require("./db");

const Endereco = db.define(
	"endereco",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		cep: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		uf: {
			type: Sequelize.STRING(2),
			allowNull: false,
		},
		cidade: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		rua: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		numero: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		complemento: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	},
	{
		schema: "public",
	}
);

module.exports = Endereco;
