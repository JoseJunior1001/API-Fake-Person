const express = require('express');
const gerarpessoa = require('./utils/gerarpessoa');

const app = express();
const port = 3000;

app.get('/pessoa', (req,res) => {
  const qtd = parseInt(req.query.qtd) || 1;
  const formato = req.query.formato || "json";

    const lista = []
    for(let i = 1; i <= qtd; i++) {
        lista.push(gerarpessoa());
    }

    if (formato ==='sql') {
      const values = lista.map( p => {
        return `('${p.nomecompleto}', '${p.cpf}', '${p.nomepai}','${p.nomemae}', '${p.data_nascimento}','${p.idade}','${p.enderecofinal}','${p.bairro}','${p.cidade}','${p.estado}','${p.cep}','${p.naturalidade}')`;
      }).join(',\n');

      const sql = `INSERT INTO pessoas (nome, cpf, nm_pai, nm_mae, dt_nascimento, idade, endereco, bairro, cidade, estado, cep, naturalidade) VALUES\n${values};`;
      res.type('text/plain').send(sql);
    } else {
      res.json(lista);
    }
});

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);

});


