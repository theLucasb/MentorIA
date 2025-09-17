// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const cursosRoutes = require('./routes/cursos'); // deixaremos pronto para o próximo passo

const app = express();

app.use(cors());
app.use(express.json());

// Rotas API
app.use('/auth', authRoutes);
app.use('/cursos', cursosRoutes); // será implementado no próximo passo

// Servir o client (opcional por enquanto)
app.use(express.static(path.join(__dirname, '..', 'client')));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MentorIA rodando na porta ${PORT}`));
