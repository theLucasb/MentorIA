const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ msg: 'Preencha todos os campos' });
    }

    // Verifique se tipo é válido
    if (!['aluno', 'professor'].includes(tipo)) {
      return res.status(400).json({ msg: 'Tipo inválido' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Insere no banco
    const query = 'INSERT INTO users (nome, email, senha, tipo, criado_em) VALUES (?, ?, ?, ?, NOW())';

    db.query(query, [nome, email, hashedPassword, tipo], (err, result) => {
      if (err) {
        console.error('Erro ao inserir usuário:', err);
        return res.status(500).json({ msg: 'Erro no servidor ao cadastrar usuário' });
      }
      return res.status(201).json({ msg: 'Usuário cadastrado com sucesso' });
    });
  } catch (error) {
    console.error('Erro catch:', error);
    res.status(500).json({ msg: 'Erro inesperado no servidor' });
  }
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
