// server/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../models/mockDB");

function gerarToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "1d" }
  );
}

exports.register = async (req, res) => {
  const { name, email, password, role = "aluno" } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email já cadastrado" });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password_hash: hash,
    role,
  };
  users.push(newUser);

  const token = gerarToken(newUser);
  return res.status(201).json({ user: newUser, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = gerarToken(user);
  return res.json({ user, token });
};

exports.me = (req, res) => {
  return res.json({ user: req.user });
};
