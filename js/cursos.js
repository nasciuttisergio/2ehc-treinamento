// cursos.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('listaCursos');
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const comprados = JSON.parse(localStorage.getItem('cursosComprados') || '[]');

  // Função para atualizar o LocalStorage
  function salvarComprados() {
    localStorage.setItem('cursosComprados', JSON.stringify(comprados));
  }

  // Cria um card para cada curso
  todosCursos.forEach(curso => {
    const card = document.createElement('div');
    card.className = 'card-curso';
    card.innerHTML = `
      <img src="${curso.thumbnail}" alt="${curso.titulo}" />
      <h3>${curso.titulo}</h3>
      <p>${curso.descricao}</p>
      <p>R$ ${curso.preco.toFixed(2)}</p>
      <button id="btn-${curso.id}">
        ${comprados.includes(curso.id) ? 'Acessar Curso' : 'Comprar'}
      </button>
    `;
    container.appendChild(card);

    const btn = document.getElementById(`btn-${curso.id}`);
    btn.addEventListener('click', () => {
      if (comprados.includes(curso.id)) {
        // já comprado → ir para a página do curso
        window.location.href = `curso.html?id=${curso.id}`;
      } else {
        // “comprar”
        if (curso.preco === 0) {
          // curso grátis: libera imediatamente
          comprados.push(curso.id);
          salvarComprados();
          btn.textContent = 'Acessar Curso';
          alert('Curso liberado gratuitamente!');
        } else {
          // simula pagamento
          const confirma = confirm(`Deseja comprar "${curso.titulo}" por R$ ${curso.preco.toFixed(2)}?`);
          if (confirma) {
            comprados.push(curso.id);
            salvarComprados();
            btn.textContent = 'Acessar Curso';
            alert('Compra realizada com sucesso!');
          }
        }
      }
    });
  });
});
// cursos.js

document.addEventListener('DOMContentLoaded', () => {
  const etapas = document.querySelectorAll('.etapa');
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    alert("Usuário não logado.");
    window.location.href = "index.html";
    return;
  }

  const progressoKey = `progresso_${usuario.email}_fundamentos`;

  // Carrega progresso salvo
  const progressoSalvo = JSON.parse(localStorage.getItem(progressoKey) || '[]');
  etapas.forEach(etapa => {
    if (progressoSalvo.includes(etapa.value)) {
      etapa.checked = true;
    }

    etapa.addEventListener('change', () => {
      const etapasConcluidas = Array.from(etapas)
        .filter(e => e.checked)
        .map(e => e.value);

      localStorage.setItem(progressoKey, JSON.stringify(etapasConcluidas));
    });
  });

  document.getElementById('concluirCurso').addEventListener('click', () => {
    const todasMarcadas = Array.from(etapas).every(e => e.checked);
    if (!todasMarcadas) {
      alert("Conclua todas as etapas para finalizar o curso.");
      return;
    }

    alert("Curso concluído! Seu certificado está disponível.");
    localStorage.setItem(`certificado_${usuario.email}_fundamentos`, 'ok');
    window.location.href = 'certificado.html';
  });
});
