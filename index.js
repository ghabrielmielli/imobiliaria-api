require("dotenv").config();
require("./model")();

// express config
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//clientes router
const clientesRoutes = require("./routes/clientes");
const imoveisRoutes = require("./routes/imoveis");

app.use("/clientes", clientesRoutes);
app.use("/imoveis", imoveisRoutes);

//Server start
app.listen("3000", (err) => {
	console.log(err ? `There was an error starting the server:\n${err}` : "Server listening at port 3000...");
});
