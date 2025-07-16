const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  if (!nome || !email || !senha || !tipo) return res.status(400).json({ msg: 'Preencha todos os campos' });

  const hashedPassword = await bcrypt.hash(senha, 10);

  const sql = 'INSERT INTO users (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, email, hashedPassword, tipo], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Erro ao cadastrar', error: err });
    res.status(201).json({ msg: 'Usuário cadastrado com sucesso' });
  });
};

exports.loginUser = (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ msg: 'Informe e-mail e senha' });

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ msg: 'Usuário não encontrado' });

    const user = results[0];
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(401).json({ msg: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token, user: { id: user.id, nome: user.nome, tipo: user.tipo } });
  });
};
