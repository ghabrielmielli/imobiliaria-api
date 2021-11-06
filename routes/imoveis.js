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
			attributes: ["id", "descricao", "endereco", "proprietario"],
			include: [{ model: Cliente }, { model: Endereco }],
		})
			.then((imoveis) => {
				console.log(imoveis);
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
				Imovel.create({ ...imovel, endereco: endereco.id })
					.then((imovel) => {
						console.log("inseriu:");
						console.log(imovel);
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

		res.send();

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
