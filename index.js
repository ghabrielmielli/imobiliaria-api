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

(async () => {
	await db.sync();

	/* const novoUsuario = await Usuario.create({
		nome: "Ghabriel",
		cpf: "733.311.041-91",
	}); */
})();

// express config
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

//clientes router
const clientesRoutes = require("./routes/clientes");
app.use("/clientes", clientesRoutes);

//Server start
app.listen("3000", (err) => {
	console.log(err ? `There was an error starting the server:\n${err}` : "Server listening at port 3000...");
});
