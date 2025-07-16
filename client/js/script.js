
// Login functionality
document.getElementById('login-btn').addEventListener('click', function () {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
});

document.getElementById('login-btn').addEventListener('click', async function () {
    const email = document.querySelector('input[type="email"]').value;
    const senha = document.querySelector('input[type="password"]').value;

    const res = await fetch('http://localhost:5500/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (res.ok) {
        alert(`Bem-vindo, ${data.user.nome}!`);
        localStorage.setItem('token', data.token); // guardar token
        // redirecionar ou mostrar dashboard
    } else {
        alert(data.msg || 'Erro no login');
    }
});


// Toggle user type (student/professor)
document.getElementById('toggle-user-type').addEventListener('click', function () {
    this.textContent = this.textContent === 'Sou professor' ? 'Sou aluno' : 'Sou professor';
});

// Sidebar toggle for mobile
document.getElementById('menu-toggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
});

// Chat with MentorIA
document.getElementById('chat-with-mentor').addEventListener('click', function () {
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('mentoria-view').classList.remove('hidden');
});

// Back to dashboard from chat
document.getElementById('back-dashboard').addEventListener('click', function () {
    document.getElementById('mentoria-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
});

// Navigation tabs
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href').substring(1);
        document.querySelectorAll('#main-content > div').forEach(div => {
            div.classList.add('hidden');
        });
        document.getElementById(`${target}-view`).classList.remove('hidden');
    });
});