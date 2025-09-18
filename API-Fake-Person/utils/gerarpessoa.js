const nomes = require('../data/nomes.json');
const nomesmae = require('../data/nomesmae.json');
const nomespai = require('../data/nomespai.json');
const enderecos = require('../data/enderecos.json');
const nacionalidade = require('../data/nacionalidade.json');
const sobrenomes = require('../data/sobrenomes.json');
const cpf = require('gerar-cpf');
const rg = require('gerar-rg');
const { faker } = require('@faker-js/faker');

function gerardtnascimento(idade){
    const ano = new Date().getFullYear() - idade;
    const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    const dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')

    return `${dia}/${mes}/${ano}`;
}


function gerarpessoa() {
const nome = nomes[Math.floor(Math.random() * nomes.length)];
const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
const nomepai = nomespai[Math.floor(Math.random() * nomespai.length)];
const nomemae = nomesmae[Math.floor(Math.random() * nomesmae.length)];
const idade = Math.floor(Math.random() * 60) +18;
const endereco = enderecos.enderecos[Math.floor(Math.random() * enderecos.enderecos.length)];
const bairro = endereco.bairro;
const cidade = endereco.cidade;
const estado = endereco.estado;
const cep = endereco.cep;
const naturalidade = endereco.naturalidade;
const enderecofinal = `${endereco.rua}, ${endereco.numero}`;


const tel = faker.phone.number('(DD) 9XXXX-XXXX');
return {
    nomecompleto: `${nome} ${sobrenome}`,
    cpf: cpf(),
    rg: rg();
    nomepai: `${nomepai} ${sobrenome}`,
    nomemae: `${nomemae} ${sobrenome}`,
    data_nascimento: gerardtnascimento(idade),
    idade,
    enderecofinal,
    bairro,
    cidade,
    estado,
    cep,
    naturalidade,   
};
}


module.exports = gerarpessoa;
