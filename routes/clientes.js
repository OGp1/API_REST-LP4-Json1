/* UTILIZEI O MESMO CÓDIGO DA ROTA VEICULOS, SÓ FIZ ALGUMAS MODIFICAÇÕES */

// Importando o Express
const express = require('express');

const rotas = express.Router();

// Me permite usar o JSON
rotas.use(express.json())

// Criei essa Array para não precisar usar um Banco de Dados
const clientes = [];

// Adicionar um cliente
rotas.post('/', (req, res) => {
  // Pega informações a partir do corpo da requisição(body)
  clientes.push(req.body);
  // Status 201 para mostrar que deu certo e retorna o cliente criado
  res.status(201).json(req.body);
});

// Rota para listar os clientes
rotas.get('/', (req, res) => {
  // Responde em JSON e mostra o Status 200 para mostrar que deu certo
  res.status(200).json(clientes);
});

// Fiz esse trecho só para mostrar uma mensagem quando colocar na rota PUT
rotas.put('/', (req, res) => {
  return res.status(400).json({ error: 'Não há ID na URL, porém a rota PUT está funcionando !!! ' });
});

// Atualiza os dados do cliente usando só o ID (Não vai funcionar pois necessita da URL) / Mas você pode testar a mensagem de erro colocando "/Qualquer ID"
rotas.put('/:id', (req, res) => {

  // Pegaria o id do cliente a partir da url
  const { id } = req.params;

  // Pega as informações do corpo da requisição(body)
  const { nome, email } = req.body;

  // Procura o cliente com o ID certo no array
  let cliente = clientes.find(og => og.id === parseInt(id, 10));

  // Mensagem de erro se não achar o cliente, o operador ! ativa o IF se o valor de Clientes for undefined, null, etc.
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado, porém a rota Put está funcionando !!!' });
  }

  // Atualiza o cliente
  cliente.nome = nome || cliente.nome; 
  cliente.email = email || clientes.email;

  // Responde com o cliente atualizado
  res.json(cliente);
});

// Fiz esse trecho só para mostrar uma mensagem quando colocar na rota Delete (igual a rota PUT)
rotas.delete('/', (req, res) => {
  return res.status(400).json({ error: 'Não há ID na URL, porém a rota Delete está funcionando !!! ' });
});

// Remove o cliente pelo ID (Não vai funcionar pelos mesmos motivos da rota PUT)
rotas.delete('/:id', (req, res) => {
  // Pegaria o id do cliente a partir da url
  const { id } = req.params;

  // Procura o cliente com o ID especificado
  let cliente = clientes.find(og => og.id !== parseInt(id, 10));

  // Mensagem de erro se não achar o cliente
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado, porém a rota Delete está funcionando !!!' });
  } else {
    // mensagem de sucesso
    res.json({ message: 'Cliente removido com sucesso!' });
  }
  
  
});


module.exports = rotas;