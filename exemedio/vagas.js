const express = require('express');
const router = express.Router();

let vagas = [
  { id: 1, titulo: "Desenvolvedor Frontend", descricao: "Desenvolvimento de interfaces web", local: "Remoto" },
  { id: 2, titulo: "Analista de RH", descricao: "Gerenciamento de processos seletivos", local: "São Paulo" }
];

// CREATE
router.post('/', (req, res) => {
  const novaVaga = {
    id: vagas.length + 1,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    local: req.body.local
  };
  vagas.push(novaVaga);
  res.status(201).json({ message: "Vaga criada com sucesso!", vaga: novaVaga });
});

// READ all
router.get('/', (req, res) => {
  res.json(vagas);
});

// READ one
router.get('/:id', (req, res) => {
  const vaga = vagas.find(v => v.id === parseInt(req.params.id));
  if (!vaga) return res.status(404).json({ error: "Vaga não encontrada." });
  res.json(vaga);
});

// UPDATE
router.put('/:id', (req, res) => {
  const vaga = vagas.find(v => v.id === parseInt(req.params.id));
  if (!vaga) return res.status(404).json({ error: "Vaga não encontrada." });

  vaga.titulo = req.body.titulo || vaga.titulo;
  vaga.descricao = req.body.descricao || vaga.descricao;
  vaga.local = req.body.local || vaga.local;

  res.json({ message: "Vaga atualizada com sucesso!", vaga });
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = vagas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Vaga não encontrada." });

  vagas.splice(index, 1);
  res.json({ message: "Vaga deletada com sucesso!" });
});

module.exports = router;
