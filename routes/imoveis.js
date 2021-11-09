const router = require("express").Router();
const Sequelize = require("sequelize");

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

router.route("/isLocador/:id")
	//Retorna todos os imoveis
	.get((req, res) => {
		/*	let sql = "SELECT * FROM todo";

       db.query(sql, (err, results) => {
           if (err) throw err;
           res.send(results);
       }); */

		Imovel.findOne({
			attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "n_imoveis"]],
			where: {
				proprietario: req.params.id,
			},
		})
			.then((numero) => {
				console.log(numero);
				res.send(numero);
			})
			.catch((e) => {
				console.error("Erro ao recuperar numero:\n" + e);
			});
	});

router.route("/:id")
	.get((req, res) => {
		Imovel.findOne({
			attributes: ["id", "descricao"],
			where: {
				id: req.params.id,
			},
			include: [
				{ model: Endereco, required: true },
				{ model: Cliente, required: true, attributes: ["id", "nome"] },
			],
		})
			.then((imovel) => {
				res.send(imovel);
			})
			.catch((e) => {
				console.error("Erro ao recuperar imovel:\n" + e);
			});
	})
	.put(async (req, res) => {
		const { endereco, cliente, ...imovel } = req.body;

		await Endereco.update(endereco, {
			where: {
				id: endereco.id,
			},
		});

		const imovelPronto = { ...imovel, proprietario: cliente.id, enderecoId: endereco.id };
		console.log(imovelPronto);
		await Imovel.update(imovelPronto, {
			where: {
				id: imovelPronto.id,
			},
		});
		res.send();
	});

module.exports = router;
