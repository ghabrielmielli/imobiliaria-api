const router = require("express").Router();

const Usuario = require("../model/Usuario");

router.route("/")
	//Retorna todos os clientes
	.get((req, res) => {
		/*	let sql = "SELECT * FROM todo";

       db.query(sql, (err, results) => {
           if (err) throw err;
           res.send(results);
       }); */

		Usuario.findAll({
			attributes: ["id", "nome", "cpf", "tipo"],
		})
			.then((clientes) => {
				res.send(clientes);
			})
			.catch((e) => {
				console.error("Erro ao recuperar clientes:\n" + e);
			});
	});

module.exports = router;
