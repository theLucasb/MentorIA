const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cursoRoutes = require('./routes/cursos');
const verifyToken = require('./middleware/verifyToken');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/cursos', verifyToken, cursoRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
