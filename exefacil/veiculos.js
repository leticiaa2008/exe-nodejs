const express = require('express');
const router = express.Router();

// Mock data para veículos
let veiculos = [
    { id: 1, modelo: "Fiat Uno", placa: "ABC-1234", ano: 2010 },
    { id: 2, modelo: "Ford Ka", placa: "XYZ-5678", ano: 2015 }
];

// CREATE - Cadastrar veículo
router.post('/', (req, res) => {
    const novoVeiculo = {
        id: veiculos.length + 1,
        modelo: req.body.modelo,
        placa: req.body.placa,
        ano: req.body.ano
    };
    veiculos.push(novoVeiculo);
    res.status(201).json({ message: "Veículo cadastrado com sucesso!", veiculo: novoVeiculo });
});

// READ - Listar todos os veículos
router.get('/', (req, res) => {
    res.json(veiculos);
});

// READ - Buscar veículo por ID
router.get('/:id', (req, res) => {
    const veiculo = veiculos.find(v => v.id === parseInt(req.params.id));
    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado.' });
    res.json(veiculo);
});

// UPDATE - Atualizar veículo
router.put('/:id', (req, res) => {
    const veiculo = veiculos.find(v => v.id === parseInt(req.params.id));
    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado.' });

    veiculo.modelo = req.body.modelo || veiculo.modelo;
    veiculo.placa = req.body.placa || veiculo.placa;
    veiculo.ano = req.body.ano || veiculo.ano;

    res.json({ message: "Veículo atualizado com sucesso!", veiculo });
});

// DELETE - Remover veículo
router.delete('/:id', (req, res) => {
    const index = veiculos.findIndex(v => v.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Veículo não encontrado.' });

    const veiculoRemovido = veiculos.splice(index, 1);
    res.json({ message: "Veículo removido com sucesso!", veiculoRemovido });
});

module.exports = router;
