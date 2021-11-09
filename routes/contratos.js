const router = require("express").Router();
const Sequelize = require("sequelize");

const Cliente = require("../model/Cliente");
const Contrato = require("../model/Contrato");
const Endereco = require("../model/Endereco");
const Imovel = require("../model/Imovel");

router.route("/")
	.get((req, res) => {
		Contrato.findAll({
			attributes: ["id", "inicio", "fim", "valorMensal", "incluiIptu", "incluiCondominio", "incluiAgua", "incluiGas", "observacao"],
			include: [
				{
					model: Imovel,
					required: true,
					attributes: [["id", "imovelId"], "descricao"],
					include: [
						{ model: Endereco, required: true },
						{
							model: Cliente,
							required: true,
							attributes: [
								["id", "locadorId"],
								["nome", "nomeLocador"],
							],
						},
					],
				},
				{
					model: Cliente,
					required: true,
					attributes: [
						["id", "locatarioId"],
						["nome", "locatarioNome"],
					],
				},
			],
		})
			.then((contratos) => {
				res.send(contratos);
			})
			.catch((e) => {
				console.error("Erro ao recuperar contratos:\n" + e);
			});
	})
	.post((req, res) => {
		let contrato = req.body;
		console.log(contrato);
		Contrato.create(contrato)
			.then(() => {
				res.send();
			})
			.catch((e) => {
				console.error("ERRO post contrato: \n");
				console.error(e);
				res.status(500).send(e.errors[0].message);
			});
	});

router.route("/imovel/:id").get((req, res) => {
	Contrato.findAll({
		attributes: ["id", "inicio", "fim", "valorMensal", "incluiIptu", "incluiCondominio", "incluiAgua", "incluiGas", "observacao"],
		where: {
			imovelId: req.params.id,
		},
		order: [["fim", "DESC"]],
		include: [
			{
				model: Imovel,
				required: true,
				attributes: [["id", "imovelId"], "descricao"],
				include: [
					{ model: Endereco, required: true },
					{
						model: Cliente,
						required: true,
						attributes: [
							["id", "locadorId"],
							["nome", "nomeLocador"],
						],
					},
				],
			},
			{
				model: Cliente,
				required: true,
				attributes: [
					["id", "locatarioId"],
					["nome", "locatarioNome"],
				],
			},
		],
	})
		.then((contratos) => {
			res.send(contratos);
		})
		.catch((e) => {
			console.error("Erro ao recuperar contratos:\n" + e);
			res.status(500).send(e.errors[0].message);
		});
});

router.route("/isLocatario/:id").get((req, res) => {
	Contrato.findOne({
		attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "n_contratos"]],
		where: {
			clienteId: req.params.id,
		},
	})
		.then((numero) => {
			res.send(numero);
		})
		.catch((e) => {
			console.error("Erro ao recuperar numero:\n" + e);
			res.status(500).send(e.errors[0].message);
		});
});

module.exports = router;
