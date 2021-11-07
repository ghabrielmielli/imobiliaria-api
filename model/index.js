module.exports = () => {
	const db = require("./db");
	const Usuario = require("./Cliente");
	const Endereco = require("./Endereco");
	const Imovel = require("./Imovel");
	const Contrato = require("./Contrato");
	const LogImovel = require("./LogImovel");

	db.sync().then(async () => {
		await db.query(`
        create or replace function public.logAlteracaoImovel() returns trigger as $$
        declare
        dataatual date := current_date;
        operacao character := substring(tg_op, 1, 1);
        begin
        insert into public."log_imovel"(data, operacao, id_imovel, descricao_antiga, descricao_nova) values (dataatual, operacao, old.id, old.descricao, new.descricao);
        return new;
        end;
        $$ language plpgsql;
        
        `);

		await db.query("drop trigger if exists alteracaoImovel on public.imovel").catch((e) => console.log(e));
		await db
			.query("create trigger alteracaoImovel after update of descricao or delete on public.imovel for each row execute function public.logAlteracaoImovel();")
			.catch((e) => console.log(e));
	});
};
