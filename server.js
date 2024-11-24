// importação da biblioteca Express
const express = require('express')

// criação de um app Express
const app = express();

// importação das rotas
const clientesRotas = require('./routes/clientes');
const veiculosRotas = require('./routes/veiculos');

// definição de parâmetros do servidor
const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
  res.send('Esta é a <b>raiz</b> do servidor.')
})

// utilizar as rotas
app.use('/clientes', clientesRotas);
app.use('/veiculos', veiculosRotas);


// rodar a aplicação
app.listen(port, hostname, console.log('Servidor rodando...'));