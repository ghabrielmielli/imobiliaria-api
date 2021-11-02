const Sequelize = require("sequelize");
const db = require("./db");

const Imovel = db.define(
	"imovel",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		descricao: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		endereco: {
			type: Sequelize.INTEGER,
			references: {
				model: "endereco",

				key: "id",
			},
			allowNull: false,
		},
		proprietario: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "usuario",

				key: "id",
			},
		},
	},
	{
		schema: "public",
	}
);

module.exports = Imovel;
