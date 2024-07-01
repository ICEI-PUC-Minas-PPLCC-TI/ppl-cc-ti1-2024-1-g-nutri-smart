const BATCH_SIZE = 3;

async function loadFavoritos() {
  const response = await fetch('receitas');
  const receitas = await response.json();
  
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || { recipes: [] };
  const favoritosReceitas = receitas.filter(receita => favoritos.recipes.includes(receita.id.toString()));

  const favoritosContainer = document.getElementById('favoritos-container');
  const favoritosBatch = Array.from({ length: Math.ceil(favoritosReceitas.length / BATCH_SIZE) }, (_, i) => {
    return favoritosReceitas.slice(i * BATCH_SIZE, i * BATCH_SIZE + BATCH_SIZE);
  });

  favoritosContainer.innerHTML = "";
  
  favoritosBatch.forEach(batch => {
    receitasDivs = batch.map(receita => `
      <div class="col-md-4 col-sm-6 mb-4 g-4 row">
    <div class="card" style="max-width: 400px">
        <img class="card-img-top img-fluid" src="static/${receita.imagem}" alt="Card image cap" style="object-fit: cover; height: 150px;">
        <div class="card-body">
            <h5 class="card-title">${receita.nome}</h5>
            <p class="card-text">${receita.descricao}</p>
            <a href="receita?id=${receita.id}" class="btn btn-success">Ver Receita</a>
            <button id="desfavoritar" onclick="removeFavorite(${receita.id})" class="btn btn-danger">Remover dos Favoritos</button>
        </div>
    </div>
</div>

    `);
    
    favoritosContainer.innerHTML += `
      <div class="row g-4" style="justify-content: center">
        ${receitasDivs}
      </div>`
  });
}

async function removeFavorite(id) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || { recipes: [] };
  const index = favoritos.recipes.indexOf(id);
  favoritos.recipes.splice(index, 1);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  await loadFavoritos();
}

document.addEventListener('DOMContentLoaded', loadFavoritos);