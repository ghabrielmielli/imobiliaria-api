const Sequelize = require("sequelize");
const Cliente = require("./Cliente");
const db = require("./db");
const Endereco = require("./Endereco");

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
				model: Endereco,

				key: "id",
			},
			allowNull: false,
		},
		proprietario: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: Cliente,

				key: "id",
			},
		},
	},
	{
		schema: "public",
	}
);

module.exports = Imovel;
