const router = require("express").Router();

const Cliente = require("../model/Cliente");

router.route("/")
	//Retorna todos os clientes
	.get((req, res) => {
		/*	let sql = "SELECT * FROM todo";

       db.query(sql, (err, results) => {
           if (err) throw err;
           res.send(results);
       }); */

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
				console.error("ERRO post cliente: \n" + e);
				res.status(500).send({ error: "A operação falhou!" });
			});
	});

module.exports = router;
