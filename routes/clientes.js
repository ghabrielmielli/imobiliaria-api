const router = require("express").Router();

const Cliente = require("../model/Cliente");

router.route("/")
	.get((req, res) => {
		Cliente.findAll({
			attributes: ["id", "nome", "cpf", "tipo"],
		})
			.then((clientes) => {
				console.log("fetch");
				res.send(clientes);
			})
			.catch((e) => {
				console.error("Erro ao recuperar clientes:\n" + e);
			});
	})
	.post((req, res) => {
		Cliente.create(req.body)
			.then(() => {
				res.send();
			})
			.catch((e) => {
				console.error("ERRO post cliente: \n");
				res.status(500).send(e.errors[0].message);
			});
	});

module.exports = router;
