const router = require("express").Router();

const LogImovel = require("../model/LogImovel");

router.route("/imoveis").get((req, res) => {
	LogImovel.findAll()
		.then((logs) => {
			res.send(logs);
		})
		.catch((e) => {
			console.error("Erro ao recuperar logs:\n" + e);
		});
});
module.exports = router;
