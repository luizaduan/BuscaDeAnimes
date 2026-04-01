async function searchAnime() {
  const query = document.querySelector('#animeInput').value.trim();
  const resultsContainer = document.querySelector('#results');
  const loadingDiv = document.querySelector('#loading');
  const errorDiv = document.querySelector('#error');

  if (!query) return;

  resultsContainer.innerHTML = "";
  errorDiv.textContent = "";
  loadingDiv.style.display = "block";

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const { data } = await response.json();

    if (!data || data.length === 0) {
      errorDiv.textContent = "Nada encontrado.";
      return;
    }

    
    const top3 = data.slice(0, 3);

    resultsContainer.innerHTML = top3.map(anime => `
      <div class="anime-card">
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>Nota: ${anime.score || 'N/A'}</p>
      </div>
    `).join('');

  } catch (error) {
    console.error(error);
    errorDiv.textContent = "Erro na busca.";
  } finally {
    loadingDiv.style.display = "none";
  }
}

document.querySelector('#searchBtn').addEventListener('click', searchAnime);