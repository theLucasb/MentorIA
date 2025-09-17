// client/js/script.js
const API = "http://localhost:3000";
let token = localStorage.getItem("token");

// Função de login
async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    alert("Login realizado!");
    listarCursos();
  } else {
    alert(data.error || "Erro no login");
  }
}

// Listar cursos
async function listarCursos() {
  const res = await fetch(`${API}/cursos`);
  const cursos = await res.json();

  const container = document.getElementById("cursos");
  container.innerHTML = "";
  cursos.forEach((c) => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${c.titulo}</h3><p>${c.descricao}</p>`;
    container.appendChild(div);
  });
}

// Exemplo: adicionar evento no botão de login
document.getElementById("btnLogin").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  login(email, senha);
});
