// auth.js

// Função para salvar novo usuário
document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.getElementById('cadastroForm');
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const tipo = document.getElementById('tipoUsuario').value;

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      usuarios.push({ nome, email, senha, tipo });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      alert('Cadastro realizado com sucesso!');
      window.location.href = 'index.html';
    });
  }

  // Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const user = usuarios.find(u => u.email === email && u.senha === senha);

      if (user) {
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
        if (user.tipo === 'empresa') {
          window.location.href = 'empresa.html';
        } else {
          window.location.href = 'aluno.html';
        }
      } else {
        alert('Usuário ou senha inválidos.');
      }
    });
  }
});

function cadastrar(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const tipo = document.getElementById("tipo").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const jaExiste = usuarios.some(u => u.email === email);
  if (jaExiste) {
    alert("Este e-mail já está cadastrado.");
    return;
  }

  const novoUsuario = { nome, email, senha, tipo };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "index.html";
}
// auth.js

// CADASTRO
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.find(u => u.email === email)) {
      alert('Este e-mail já está cadastrado.');
      return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html';
  });
}

// LOGIN
const formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      alert('E-mail ou senha incorretos!');
      return;
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    window.location.href = 'aluno.html';
  });
}
