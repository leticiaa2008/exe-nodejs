const express = require('express');
const app = express();

const vagasRoutes = require('./vagas');
const candidatosRoutes = require('./candidatos');
const curriculosRoutes = require('./curriculos');
const etapasRoutes = require('./etapas');

app.use(express.json());

app.use('/vagas', vagasRoutes);
app.use('/candidatos', candidatosRoutes);
app.use('/curriculos', curriculosRoutes);
app.use('/etapas', etapasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
