const Sequelize = require("sequelize");
const db = require("./db");

const LogImovel = db.define(
	"log_imovel",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		data: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		operacao: {
			type: Sequelize.CHAR,
			allowNull: false,
		},
		id_imovel: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		descricao_antiga: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		descricao_nova: {
			type: Sequelize.STRING,
		},
	},
	{
		schema: "public",
		timestamps: false,
	}
);

module.exports = LogImovel;
