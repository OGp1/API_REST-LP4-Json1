// Importando o Express
const express = require('express');
const rotas = express.Router();

// Me permite usar o JSON
rotas.use(express.json())

// Criei essa Array para não precisar usar um Banco de Dados
const veiculos = [];

// Adicionar um veículo
rotas.post('/', (req, res) => {
  // Pega informações a partir do corpo da requisição(body)
  veiculos.push(req.body);
  // Status 201 para mostra que deu certo e retorna o veículo criado
  res.status(201).json(req.body);
});

// Rota para listar os veículos
rotas.get('/', (req, res) => {
  // Responde em JSON e mostra o Status 200 para mostrar que deu certo
  res.status(200).json(veiculos);
});

// Fiz esse trecho só para mostrar uma mensagem quando colocar na rota PUT
rotas.put('/', (req, res) => {
  return res.status(400).json({ error: 'Não há ID na URL, porém a rota PUT está funcionando !!! ' });
});

// Atualiza os dados do veiculo usando só o ID (Não vai funcionar pois necessita da URL) / Mas você pode testar a mensagem de erro colocando "/Qualquer ID"
rotas.put('/:id', (req, res) => {

  // Pegaria o id do veículo a partir da url
  const { id } = req.params;

  // Pega as informações do corpo da requisição(body)
  const { modelo, marca } = req.body;

  // Procura o veículo com o ID certo no array
  let veiculo = veiculos.find(og => og.id === parseInt(id, 10));

  // Mensagem de erro se não achar o veículo, o operador ! ativa o IF se o valor de Veículos for undefined, null, etc.
  if (!veiculo) {
    return res.status(404).json({ error: 'veiculo não encontrado, porém a rota Put está funcionando !!!' });
  }

  // Atualiza o veículo
  veiculo.modelo = modelo || veiculo.modelo; 
  veiculo.marca = marca || veiculo.marca;

  // Responde com o veículo atualizado
  res.json(veiculo);
});

// Fiz esse trecho só para mostrar uma mensagem quando colocar na rota Delete (igual a rota PUT)
rotas.delete('/', (req, res) => {
  return res.status(400).json({ error: 'Não há ID na URL, porém a rota Delete está funcionando !!! ' });
});

// Remove o veículo pelo ID (Não vai funcionar pelos mesmos motivos da rota PUT)
rotas.delete('/:id', (req, res) => {
  // Pegaria o id do veículo a partir da url
  const { id } = req.params;

  // Procura o veiculo com o id especificado
  let veiculo = veiculos.find(og => og.id !== parseInt(id, 10));

  // Mensagem de erro se não achar o veículo, o operador ! ativa o IF se o valor de Veículos for undefined, null, etc.
  if (!veiculo) {
    return res.status(404).json({ error: 'Veículo não encontrado, porém a rota Delete está funcionando !!!' });
  } else {
    // Mensagem de sucesso
  res.json({ message: 'Veículo removido com sucesso!' });
  }

});


module.exports = rotas;
