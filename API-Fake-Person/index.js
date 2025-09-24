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

    // Inserts fixos para tipos
    sql += `-- Tipos de Contato e Endereço (inseridos uma vez)\n`;
    sql += `INSERT IGNORE INTO tb_tipo_contato (cd_tipo_contato, nm_tipo_contato) VALUES (1, 'Telefone');\n`;
    sql += `INSERT IGNORE INTO tb_tipo_endereco (cd_tipo_endereco, nm_tipo_endereco) VALUES (1, 'Residencial');\n\n`;

    lista.forEach((pessoa, index) => {
      const id = index + 1;

      const idNacionalidade = id;
      const idUF = id;
      const idCidade = id;
      const idBairro = id;
      const idCliente = id;
      const idEndereco = id;
      const idContato = id;
      const idDependente = id;

      // Nacionalidade
      sql += `-- Nacionalidade\n`;
      sql += `INSERT INTO tb_nacionalidade (cd_nacionalidade, nm_nacionalidade)\n`;
      sql += `VALUES (${idNacionalidade}, '${pessoa.nacionalidade}');\n\n`;

      // UF
      sql += `-- UF (Estado)\n`;
      sql += `INSERT INTO tb_uf (cd_uf, sg_uf, nm_uf)\n`;
      sql += `VALUES (${idUF}, '${pessoa.estado}', '${pessoa.estado}');\n\n`;

      // Cidade
      sql += `-- Cidade\n`;
      sql += `INSERT INTO tb_cidade (cd_cidade, nm_cidade, cd_uf)\n`;
      sql += `VALUES (${idCidade}, '${pessoa.cidade}', ${idUF});\n\n`;

      // Bairro
      sql += `-- Bairro\n`;
      sql += `INSERT INTO tb_bairro (cd_bairro, nm_bairro, cd_cidade)\n`;
      sql += `VALUES (${idBairro}, '${pessoa.bairro}', ${idCidade});\n\n`;

      // Cliente
      sql += `-- Cliente\n`;
      sql += `INSERT INTO tb_cliente (\n`;
      sql += `  cd_cliente, nm_cliente, nm_pai, nm_mae, nm_conjuge, cd_cpf, dt_nascimento,\n`;
      sql += `  nm_naturalidade, cd_rg, cd_nacionalidade\n`;
      sql += `) VALUES (\n`;
      sql += `  ${idCliente}, '${pessoa.nomecompleto}', '${pessoa.nomepai}', '${pessoa.nomemae}', NULL,\n`;
      sql += `  '${pessoa.cpf.replace(/\D/g, '')}', STR_TO_DATE('${pessoa.data_nascimento}', '%d/%m/%Y'),\n`;
      sql += `  '${pessoa.naturalidade}', '${pessoa.rg}', ${idNacionalidade}\n`;
      sql += `);\n\n`;

      // Endereço
      sql += `-- Endereço\n`;
      sql += `INSERT INTO tb_endereco (\n`;
      sql += `  cd_endereco, nm_endereco, ds_complemento, cd_cep,\n`;
      sql += `  cd_cliente, cd_tipo_endereco, cd_bairro\n`;
      sql += `) VALUES (\n`;
      sql += `  ${idEndereco}, '${pessoa.enderecofinal}', '', '${pessoa.cep}',\n`;
      sql += `  ${idCliente}, 1, ${idBairro}\n`;
      sql += `);\n\n`;

      // Contato
      sql += `-- Contato\n`;
      sql += `INSERT INTO tb_contato (\n`;
      sql += `  cd_contato, cd_telefone, cd_cliente, cd_tipo_contato\n`;
      sql += `) VALUES (\n`;
      sql += `  ${idContato}, '${pessoa.telefone.replace(/\D/g, '')}', ${idCliente}, 1\n`;
      sql += `);\n\n`;

      // Dependente (mockado)
      sql += `-- Dependente\n`;
      sql += `INSERT INTO tb_dependente (\n`;
      sql += `  cd_dependente, nm_dependente, dt_nascimento, cd_cliente\n`;
      sql += `) VALUES (\n`;
      sql += `  ${idDependente}, 'Filho de ${pessoa.nomecompleto}', '2010-01-01', ${idCliente}\n`;
      sql += `);\n\n`;
    });

    res.type('text/plain').send(sql);
  } else {
    res.json(lista);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
