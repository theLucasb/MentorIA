// server/models/mockDB.js

// Mock em memória (reinicia sempre que o servidor cai)
// usuários pré-cadastrados
let users = [
  {
    id: 1,
    name: "Professor X",
    email: "prof@x.com",
    password_hash: "$2a$10$Q/P8MJeWQafXUyNqNfSZ1eA9bkD7TqnDKLsl/G0Z6YlHgO.k7HjU6", // senha: 123456
    role: "professor",
  },
  {
    id: 2,
    name: "Aluno Y",
    email: "aluno@y.com",
    password_hash: "$2a$10$Q/P8MJeWQafXUyNqNfSZ1eA9bkD7TqnDKLsl/G0Z6YlHgO.k7HjU6", // senha: 123456
    role: "aluno",
  },
];

// cursos simulados
let cursos = [
  {
    id: 1,
    titulo: "Introdução à Lógica de Programação",
    descricao: "Aprenda os fundamentos de lógica.",
    autor_id: 1,
  },
];

// materiais simulados
let materiais = [
  {
    id: 1,
    curso_id: 1,
    titulo: "Aula 1 - Variáveis",
    tipo: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

module.exports = {
  users,
  cursos,
  materiais,
};
