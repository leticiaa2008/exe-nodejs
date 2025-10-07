const express = require('express');
const router = express.Router();

let candidatos = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com", telefone: "11999999999" },
  { id: 2, nome: "Carlos Lima", email: "carlos@email.com", telefone: "11988888888" }
];

// CREATE
router.post('/', (req, res) => {
  const novoCandidato = {
    id: candidatos.length + 1,
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone
  };
  candidatos.push(novoCandidato);
  res.status(201).json({ message: "Candidato cadastrado com sucesso!", candidato: novoCandidato });
});

// READ all
router.get('/', (req, res) => {
  res.json(candidatos);
});

// READ one
router.get('/:id', (req, res) => {
  const candidato = candidatos.find(c => c.id === parseInt(req.params.id));
  if (!candidato) return res.status(404).json({ error: "Candidato não encontrado." });
  res.json(candidato);
});

// UPDATE
router.put('/:id', (req, res) => {
  const candidato = candidatos.find(c => c.id === parseInt(req.params.id));
  if (!candidato) return res.status(404).json({ error: "Candidato não encontrado." });

  candidato.nome = req.body.nome || candidato.nome;
  candidato.email = req.body.email || candidato.email;
  candidato.telefone = req.body.telefone || candidato.telefone;

  res.json({ message: "Candidato atualizado com sucesso!", candidato });
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = candidatos.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Candidato não encontrado." });

  candidatos.splice(index, 1);
  res.json({ message: "Candidato deletado com sucesso!" });
});

module.exports = router;
