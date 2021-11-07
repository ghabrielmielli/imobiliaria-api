const router = require("express").Router();

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
		console.log(req.body);
		Contrato.create(req.body)
			.then(() => {
				res.send();
			})
			.catch((e) => {
				console.error("ERRO post contrato: \n");
				res.status(500).send(e.errors[0].message);
			});
	});

module.exports = router;
