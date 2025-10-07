const express = require('express');
const router = express.Router();

// Mock data para motoristas
let motoristas = [
    { id: 1, nome: "João da Silva", cnh: "12345678900" },
    { id: 2, nome: "Maria Souza", cnh: "98765432100" }
];

// CREATE - Cadastrar motorista
router.post('/', (req, res) => {
    const novoMotorista = {
        id: motoristas.length + 1,
        nome: req.body.nome,
        cnh: req.body.cnh
    };
    motoristas.push(novoMotorista);
    res.status(201).json({ message: "Motorista cadastrado com sucesso!", motorista: novoMotorista });
});

// READ - Listar todos os motoristas
router.get('/', (req, res) => {
    res.json(motoristas);
});

// READ - Buscar motorista por ID
router.get('/:id', (req, res) => {
    const motorista = motoristas.find(m => m.id === parseInt(req.params.id));
    if (!motorista) return res.status(404).json({ error: 'Motorista não encontrado.' });
    res.json(motorista);
});

// UPDATE - Atualizar motorista
router.put('/:id', (req, res) => {
    const motorista = motoristas.find(m => m.id === parseInt(req.params.id));
    if (!motorista) return res.status(404).json({ error: 'Motorista não encontrado.' });

    motorista.nome = req.body.nome || motorista.nome;
    motorista.cnh = req.body.cnh || motorista.cnh;

    res.json({ message: "Motorista atualizado com sucesso!", motorista });
});

// DELETE - Remover motorista
router.delete('/:id', (req, res) => {
    const index = motoristas.findIndex(m => m.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Motorista não encontrado.' });

    const motoristaRemovido = motoristas.splice(index, 1);
    res.json({ message: "Motorista removido com sucesso!", motoristaRemovido });
});

module.exports = router;
