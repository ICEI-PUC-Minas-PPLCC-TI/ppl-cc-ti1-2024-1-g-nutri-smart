async function loadReceita() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.error('ID não fornecido na URL.');
        return;
    }

    try {
        const response = await fetch('receitas');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON.');
        }

        const receitas = await response.json();
        const receita = receitas.find(receita => receita.id === Number(id));

        if (!receita) {
            console.error('Receita não encontrada.');
            return;
        }

        document.getElementById('nome').innerText = receita.nome;
        document.getElementById('imagem').src = `static/${receita.imagem}`;
        document.getElementById('ingredientes').innerHTML = receita.ingredientes
            .map(ingrediente => `<li>${ingrediente}</li>`).join('\n');
        document.getElementById('modo-preparo').innerHTML = receita.modoDePreparo
        .map(preparo => `<li>${preparo}</li>`).join('\n');

    } catch (error) {
        console.error('Erro ao carregar a receita:', error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("profileModal");
    const btn = document.querySelector(".open-profile-btn");
    const span = document.querySelector(".close-btn");

    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    const profileImage = document.querySelector('.profile img');
    profileImage.addEventListener('click', () => {
        alert('Cliquei na foto de perfil!');
    });

});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let searchQuery = document.getElementById('searchInput').value.trim();

    fetch('receita.json')
        .then(response => response.json())
        .then(data => {
            let recipeFound = false;
            data.forEach(recipe => {
                if (recipe.nome.toLowerCase() === searchQuery.toLowerCase()) {
                    recipeFound = true;
                    window.location.href = 'receitas.html?id=' + recipe.id;
                }
            });

            if (!recipeFound) {

                window.alert("Receita não encontrada.");
            }
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});


function loadFavoriteButtonState(location) {
  const state = isFavorite(location);
  const button = document.getElementById("favoritar");
  if (state) {
    button.classList.remove("btn-success");
    button.classList.add("btn-danger");
    button.innerText = "Remover dos Favoritos";
  } else {
    button.classList.remove("btn-danger");
    button.classList.add("btn-success");
    button.innerText = "Adicionar aos Favoritos";
  }
}

function getRecipeId(location) {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  return id;
}

function getFavoriteRecipes() {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || { recipes: [] };
  return favoritos;
}

function toggleFavorite(location) {
  const id = getRecipeId(location);
  const state = isFavorite(location);
  const favoritos = getFavoriteRecipes();
  const index = favoritos.recipes.indexOf(id);

  if (state) favoritos.recipes.splice(index, 1);
  else favoritos.recipes.push(id);

  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  loadFavoriteButtonState(window.location);
}

function isFavorite(location) {
  const id = getRecipeId(location);
  const favoritos = getFavoriteRecipes();

  return favoritos.recipes.includes(id);
}

document.addEventListener('DOMContentLoaded', async () => {
  loadFavoriteButtonState(window.location);
});