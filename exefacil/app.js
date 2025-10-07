const express = require('express');
const app = express();
const veiculosRoutes = require('./veiculos');
const motoristasRoutes = require('./motoristas');

app.use(express.json());

app.use('/veiculos', veiculosRoutes);
app.use('/motoristas', motoristasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
