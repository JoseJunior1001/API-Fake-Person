const express = require('express');
const gerarpessoa = require('./utils/gerarpessoa');

const app = express();
const port = 3000;

app.get('/pessoa', (req, res) => {
  const qtd = parseInt(req.query.qtd) || 1;
  const formato = req.query.formato || "json";

  const lista = [];
  for (let i = 1; i <= qtd; i++) {
    lista.push(gerarpessoa());
  }

  if (formato === 'sql') {
    let sql = '';

    lista.forEach((pessoa, index) => {
      const idCliente = index + 1;
      const idNacionalidade = index + 1;
      const idUF = index + 1;
      const idCidade = index + 1;
      const idBairro = index + 1;
      const idEndereco = index + 1;
      const idContato = index + 1;
      const idDependente = index + 1;

      // Nacionalidade
      sql += `INSERT INTO tb_nacionalidade (cd_nacionalidade, nm_nacionalidade) VALUES (${idNacionalidade}, '${pessoa.nacionalidade}');\n`;

      // UF
      sql += `INSERT INTO tb_uf (cd_uf, sg_uf, nm_uf) VALUES (${idUF}, '${pessoa.estado}', '${pessoa.estado}');\n`;

      // Cidade
      sql += `INSERT INTO tb_cidade (cd_cidade, nm_cidade, cd_uf) VALUES (${idCidade}, '${pessoa.cidade}', ${idUF});\n`;

      // Bairro
      sql += `INSERT INTO tb_bairro (cd_bairro, nm_bairro, cd_cidade) VALUES (${idBairro}, '${pessoa.bairro}', ${idCidade});\n`;

      // Cliente
      sql += `INSERT INTO tb_cliente (cd_cliente, nm_cliente, nm_pai, nm_mae, nm_conjuge, cd_cpf, dt_nascimento, nm_naturalidade, cd_rg, cd_nacionalidade) VALUES\n`;
      sql += `(${idCliente}, '${pessoa.nomecompleto}', '${pessoa.nomepai}', '${pessoa.nomemae}', NULL, '${pessoa.cpf}', '${pessoa.data_nascimento}', '${pessoa.naturalidade}', '123456789', ${idNacionalidade});\n`;

      // Endereço (tipo = 1)
      sql += `INSERT INTO tb_endereco (cd_endereco, nm_endereco, ds_complemento, cd_cep, cd_cliente, cd_tipo_endereco, cd_bairro) VALUES\n`;
      sql += `(${idEndereco}, '${pessoa.enderecofinal}', '', '${pessoa.cep}', ${idCliente}, 1, ${idBairro});\n`;

      // Contato (tipo = 1)
      sql += `INSERT INTO tb_contato (cd_contato, cd_telefone, cd_cliente, cd_tipo_contato) VALUES\n`;
      sql += `(${idContato}, '11999999999', ${idCliente}, 1);\n`;

      // Dependente (mockado)
      sql += `INSERT INTO tb_dependente (cd_dependente, nm_dependente, dt_nascimento, cd_cliente) VALUES\n`;
      sql += `(${idDependente}, 'Filho de ${pessoa.nomecompleto}', '2010-01-01', ${idCliente});\n\n`;
    });

    res.type('text/plain').send(sql);
  } else {
    res.json(lista);
  }
});

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});
