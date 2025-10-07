const express = require('express');
const router = express.Router();

let etapas = [
  { id: 1, vaga_id: 1, nome: "Triagem", descricao: "Análise inicial do currículo" },
  { id: 2, vaga_id: 1, nome: "Entrevista", descricao: "Entrevista com o gestor" }
];

// CREATE
router.post('/', (req, res) => {
  const novaEtapa = {
    id: etapas.length + 1,
    vaga_id: req.body.vaga_id,
    nome: req.body.nome,
    descricao: req.body.descricao
  };
  etapas.push(novaEtapa);
  res.status(201).json({ message: "Etapa criada com sucesso!", etapa: novaEtapa });
});

// READ all
router.get('/', (req, res) => {
  res.json(etapas);
});

// READ one
router.get('/:id', (req, res) => {
  const etapa = etapas.find(e => e.id === parseInt(req.params.id));
  if (!etapa) return res.status(404).json({ error: "Etapa não encontrada." });
  res.json(etapa);
});

// UPDATE
router.put('/:id', (req, res) => {
  const etapa = etapas.find(e => e.id === parseInt(req.params.id));
  if (!etapa) return res.status(404).json({ error: "Etapa não encontrada." });

  etapa.vaga_id = req.body.vaga_id || etapa.vaga_id;
  etapa.nome = req.body.nome || etapa.nome;
  etapa.descricao = req.body.descricao || etapa.descricao;

  res.json({ message: "Etapa atualizada com sucesso!", etapa });
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = etapas.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Etapa não encontrada." });

  etapas.splice(index, 1);
  res.json({ message: "Etapa deletada com sucesso!" });
});

module.exports = router;
