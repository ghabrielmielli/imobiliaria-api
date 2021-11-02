require("dotenv").config();
const db = require("./model/db");
/* 
async function run() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

run();
 */

const Usuario = require("./model/Usuario");
const Imovel = require("./model/Imovel");
const Endereco = require("./model/Contrato");
const Contrato = require("./model/Contrato");
db.sync()
	.then(() => {
		console.log("BD sincronizado com sucesso!");
	})
	.catch((e) => {
		console.error("ERRO AO SINCRONIZAR COM O BD: \n" + e);
	});
