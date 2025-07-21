const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');  // seu arquivo de conexão
require('dotenv').config();

// Cadastro
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ msg: 'Preencha todos os campos' });

  // Verificar se já existe usuário
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Erro no servidor' });
    if (results.length > 0) return res.status(400).json({ msg: 'Email já cadastrado' });

    // Hash da senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Inserir usuário
    db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedSenha], (err) => {
      if (err) return res.status(500).json({ msg: 'Erro ao cadastrar usuário' });
      res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ msg: 'Preencha todos os campos' });

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Erro no servidor' });
    if (results.length === 0) return res.status(400).json({ msg: 'Usuário não encontrado' });

    const user = results[0];
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ msg: 'Senha incorreta' });

    // Criar token JWT
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
});


module.exports = router;
