const express = require('express');
const router = express.Router();

let curriculos = [
  { id: 1, candidato_id: 1, resumo: "Formada em Sistemas de Informação", experiencia: "3 anos em desenvolvimento" }
];

// CREATE
router.post('/', (req, res) => {
  const novoCurriculo = {
    id: curriculos.length + 1,
    candidato_id: req.body.candidato_id,
    resumo: req.body.resumo,
    experiencia: req.body.experiencia
  };
  curriculos.push(novoCurriculo);
  res.status(201).json({ message: "Currículo cadastrado com sucesso!", curriculo: novoCurriculo });
});

// READ all
router.get('/', (req, res) => {
  res.json(curriculos);
});

// READ one
router.get('/:id', (req, res) => {
  const curriculo = curriculos.find(c => c.id === parseInt(req.params.id));
  if (!curriculo) return res.status(404).json({ error: "Currículo não encontrado." });
  res.json(curriculo);
});

// UPDATE
router.put('/:id', (req, res) => {
  const curriculo = curriculos.find(c => c.id === parseInt(req.params.id));
  if (!curriculo) return res.status(404).json({ error: "Currículo não encontrado." });

  curriculo.candidato_id = req.body.candidato_id || curriculo.candidato_id;
  curriculo.resumo = req.body.resumo || curriculo.resumo;
  curriculo.experiencia = req.body.experiencia || curriculo.experiencia;

  res.json({ message: "Currículo atualizado com sucesso!", curriculo });
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = curriculos.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Currículo não encontrado." });

  curriculos.splice(index, 1);
  res.json({ message: "Currículo deletado com sucesso!" });
});

module.exports = router;
