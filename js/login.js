document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // Busca usuários salvos
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  // Verifica se o usuário existe e a senha confere
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    // Salva o usuário logado
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    // Redireciona para o ambiente do aluno
    window.location.href = 'aluno.html';
  } else {
    alert('Usuário ou senha incorretos!');
  }
});
