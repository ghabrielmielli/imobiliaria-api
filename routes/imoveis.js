const router = require("express").Router();

const Imovel = require("../model/Imovel");
const Endereco = require("../model/Endereco");
const Cliente = require("../model/Cliente");

router.route("/")
	//Retorna todos os imoveis
	.get((req, res) => {
		/*	let sql = "SELECT * FROM todo";

       db.query(sql, (err, results) => {
           if (err) throw err;
           res.send(results);
       }); */

		Imovel.findAll({
			attributes: ["id", "descricao"],
			include: [
				{ model: Endereco, required: true },
				{ model: Cliente, required: true, attributes: ["id", "nome"] },
			],
		})
			.then((imoveis) => {
				console.log("\n\n\n\nAAAA\n\n\n");
				console.log(imoveis);
				console.log("\n\n\n\nAAAA\n\n\n");
				res.send(imoveis);
			})
			.catch((e) => {
				console.error("Erro ao recuperar imoveis:\n" + e);
			});
	})
	.post((req, res) => {
		const { endereco, ...imovel } = req.body;
		console.log(endereco);
		console.log(imovel);

		Endereco.create(endereco)
			.then((endereco) => {
				const imovelpronto = { ...imovel, enderecoId: endereco.id };
				console.log(imovelpronto);
				Imovel.create(imovelpronto)
					.then(() => {
						console.log("inseriu!");
						res.send();
					})
					.catch((e) => {
						console.log(e);
						res.status(500).send();
					});
			})
			.catch((e) => {
				console.log(e);
				res.status(500).send();
			});

		/* 
		Imovel.create(req.body)
			.then(() => {
				res.send();
			})
			.catch((e) => {
				console.error("ERRO post Imovel: \n" + e);
				res.status(500).send({ error: "A operação falhou!" });
		 	});
			  */
	});

module.exports = router;
