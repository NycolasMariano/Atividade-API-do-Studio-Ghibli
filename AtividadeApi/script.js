function buscarFilme() {
  const nomeDigitado = document.getElementById('filmeInput').value.trim().toLowerCase();
  const resultado = document.getElementById('resultado');

  if (!nomeDigitado) {
    resultado.innerHTML = "<p>Por favor, digite o nome de um filme.</p>";
    return;
  }

  resultado.innerHTML = "<p>Buscando...</p>";

  fetch('https://ghibliapi.vercel.app/films')
    .then(res => res.json())
    .then(filmes => {
      const filme = filmes.find(f => f.title.toLowerCase() === nomeDigitado);

      if (filme) {
        resultado.innerHTML = `
          <h2>${filme.title}</h2>
          <img src="${filme.image}" alt="Imagem do filme ${filme.title}" style="max-width: 100%; border-radius: 10px;">
          <p><strong>Diretor:</strong> ${filme.director}</p>
          <p><strong>Produtor:</strong> ${filme.producer}</p>
          <p><strong>Lançamento:</strong> ${filme.release_date}</p>
          <p><strong>Duração:</strong> ${filme.running_time} minutos</p>
          <p><strong>Descrição:</strong> ${filme.description}</p>
        `;
      } else {
        resultado.innerHTML = "<p>Filme não encontrado. Verifique o nome digitado.</p>";
      }
    })
    .catch(error => {
      console.error(error);
      resultado.innerHTML = "<p>Erro ao buscar os dados.</p>";
    });
}