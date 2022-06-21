# imobiliaria-api

## Sobre o projeto

O objetivo deste projeto é produzir um protótipo minimamente funcional a fim
de explorar as características de um sistema para gestão imobiliária. O foco principal
do protótipo é fornecer um sistema que permita cadastro, leitura, alteração e remoção
(CRUD) de alguns dados que relacionam entre si.
> Existe uma aplicação cliente feita por mim para consumir esta API, acesse o repositório clicando [aqui](https://github.com/ghabrielmielli/imobiliaria-cliente)

## Feito Com

✤ Banco de dados
- Postgres v5.5

✤ Servidor
- Node-js v12.19.0
- npm v8.1.2
- Dependências
- cors | Necessário para aceitar requisições de clientes externos
- dotenv | Para adicionar variáveis de ambiente (para o bd)
- express | Framework para criar servidores em node
- pg | Módulo para trabalhar com o Postgres
- pg-hstore | Dependência para o Sequelize com Postgres
- sequelize | ORM utilizada no projeto

## Rodando o projeto no Docker Swarm

### Pré-requisitos
- [docker](https://docs.docker.com/engine/install/)
- [docker-machine](https://github.com/docker/machine)
- [git](https://git-scm.com/downloads)

### Configurando o projeto
OBS.: Observe o prompt para saber em qual terminal é necessário rodar os comandos
- `$`: qualquer terminal
- `docker@manager1$`: terminal do manager1

Crie três VMs (manager1, worker1 e worker2) através do `docker-machine`
```bash
$ docker-machine create --driver virtualbox <nome_da_vm>
```
```bash
$ docker-machine create --driver virtualbox <nome_da_vm>
```
```bash
$ docker-machine create --driver virtualbox <nome_da_vm>
```
Para ver os IPs das VMs utilize o seguinte comando
```bash
$ docker-machine ls
```
Entre no `manager1` via SSH
```bash
$ docker-machine ssh <nome_da_vm>
```
Abra mais dois terminais e rode o comando acima para `worker1` e `worker2`
```bash
$ docker-machine ssh <nome_da_vm>
```
```bash
$ docker-machine ssh <nome_da_vm>
```
Inicialize o swarm
```bash
docker@manager1$ docker swarm init --advertise-addr <ip_do_manager>
```
Copie o comando `docker swarm join...`
```bash
...
docker swarm join \
    --token <token_gerado> \
    <ip_do_manager>:2377
...
```
Cole o comando acima nos outros dois terminais
```bash
docker@worker1$ docker swarm join...
```
```bash
docker@worker2$ docker swarm join...
```
Para ver os nodes do swarm
```bash
docker@manager1$ docker node ls
```
Inicialize um serviço de registro
```bash
docker@manager1$ docker service create --name localhost --publish 5000:5000 registry:2
```
Verifique o status do serviço de registro
```bash
docker@manager1$ docker service ls
```
Crie uma pasta e entre nela
```bash
docker@manager1$ mkdir app
docker@manager1$ cd app
```
Clone os dois repositórios
```bash
docker@manager1$ git clone https://github.com/ghabrielmielli/imobiliaria-api
docker@manager1$ git clone https://github.com/ghabrielmielli/imobiliaria-cliente
```
Realize o build das imagens
```bash
docker@manager1$ docker build imobiliaria-api/ -t localhost:5000/back:latest
docker@manager1$ docker build imobiliaria-cliente/ -t localhost:5000/front:latest
```
Realize o push das imagens
```bash
docker@manager1$ docker push localhost:5000/back:latest
docker@manager1$ docker push localhost:5000/front:latest
```
Crie os secrets
```bash
docker@manager1$ echo postgres | docker secret create db_username -
docker@manager1$ echo senha_exposta | docker secret create db_password -
docker@manager1$ echo trabalho | docker secret create db_name -
```
Faça o deploy da stack
```bash
docker@manager1$ docker stack deploy --compose-file imobiliaria-api/docker-stack.yml trabalho
```

OBS1.: Altere a URL com o IP de um dos nodes (VMs) em `imobiliaria-cliente/src/utils/axiosRouter.js`

OBS2.: Caso o valor de algum dos secrets seja alterado é necessário alterar as variáveis de ambiente `DB_NAME`, `DB_USERNAME` e `DB_PASSWORD` em `imobiliaria-api/docker-stack.yml`

## Rodando o projeto localmente

Após clonar o repositório, instale os pacotes necessários para rodar a aplicação executando o seguinte comando na pasta raiz do projeto:
```bash
npm install
```

### Configurando o BD
- Primeiro, crie um banco de dados pelo `pgadmin`
- Depois, na pasta raiz do projeto, crie um arquivo e nomeie-o como ‘.env’
- Abra o arquivo ‘.envExemplo’ e copie tudo que está lá para o novo arquivo criado
- Altere as informações para as que você utiliza no pgadmin, e salve o arquivo.
  
### Executando a API
Com o terminal aberto na pasta raiz do projeto, execute o comando:
```bash
node index.js
```
**Pronto!** Agora o servidor está escutando requisições e o esquema do seu
banco já deve estar criado.


## O Esquema Relacional
![Imagem com diagrama ER](model/esquemaRelacional.png)

O esquema relacional foi projetado pensando em ‘Imovel’ como tabela
protagonista. Abaixo, temos uma lista citando as tabelas, assim como uma descrição do
que cada uma representa. Também estão explicados o significado de alguns atributos
que talvez não se autodescrevam. Após isso, serão descritas as relações da tabela.

### Legenda

- **Cliente**: Representa as pessoas, ora locatários, ora locadores, ora ambos.

- **Imovel**: Representa as propriedades disponíveis para aluguel.
  - descricao: Aqui é esperado uma descrição sobre características relevantes para o aluguel desta propriedade, a exemplo: “sobrado com 3 quartos e 2 banheiros; Uma vaga na garagem; Varanda com 13m2; ...”.

- **Endereco**: Representa o logradouro de um imóvel.

- **Contrato**: Representa contratos de aluguel de imóveis.
  - observacao: Por questões de simplicidade, foram reduzidas especificações a respeito das condições do imóvel, presença de mobílias, estado de pintura, conservação, etc a um campo de observação.
  - clienteId: ID do locatário.

- **LogImovel**: Tabela que armazena um histórico de alterações na descrição de imóveis, assim como deleções.


### Relações

❖ Imovel 1..1 - 1..1 Endereco
- Relação obrigatória 1 para 1.

❖ Imovel 1..1 - 0..N LogImovel
- Um imóvel pode ter 0 ou mais logs, e cada log está associado obrigatoriamente a 1 imóvel.

❖ Imovel 0..N - 1..1 Cliente
- Um imóvel está obrigatoriamente associado a um cliente proprietário. Um cliente pode ter zero ou mais imóveis.

❖ Imovel 1..1 - 0..N Contrato 0..N - 1..1 Cliente
- Um imóvel pode fazer parte de 0 ou mais contratos
- Um cliente (locatário) pode fazer parte de 0 ou mais contratos
- Um contrato está associado obrigatoriamente a um imóvel e a um cliente
- A tabela ‘Contrato’ representa uma relação N para N entre imóveis e clientes.
- Observação: A partir desta relação, também podemos obter uma relação N para N entre dois clientes, sendo:
  1. Obtido através do imóvel - locador; e
  2. Já presente na tabela - locatário.
  
