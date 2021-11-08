const Sequelize = require("sequelize");
const Cliente = require("./Cliente");
const db = require("./db");
const Imovel = require("./Imovel");

const Contrato = db.define(
	"contrato",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		/* locatario: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: Cliente,

				key: "id",
			},
		},
		imovel: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: Imovel,

				key: "id",
			},
		}, */
		inicio: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		fim: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		valorMensal: {
			type: Sequelize.REAL,
			allowNull: false,
		},
		incluiIptu: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
		incluiCondominio: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		},
		incluiAgua: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
		incluiGas: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
		observacao: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	},
	{
		schema: "public",
		timestamps: false,
	}
);

Contrato.belongsTo(Cliente, {
	foreignKey: {
		name: "clienteId",
		allowNull: false,
	},
	onDelete: "RESTRICT",
	onUpdate: "RESTRICT",
});
Cliente.hasMany(Contrato);

Contrato.belongsTo(Imovel, {
	foreignKey: {
		name: "imovelId",
		allowNull: "false",
	},
	onDelete: "RESTRICT",
	onUpdate: "RESTRICT",
});
Imovel.hasMany(Contrato);

module.exports = Contrato;
