async function loadReceitas() {
    console.log("teste");

    const response = await fetch("receitas");
    const receitas = await response.json();

    let doces = receitas.filter((receita) => receita.categoria == "Doces");
    let carnes = receitas.filter((receita) => receita.categoria == "Carnes");
    let saladas = receitas.filter((receita) => receita.categoria == "Salada");
    let massas = receitas.filter((receita) => receita.categoria == "Massa");
    let bebidas = receitas.filter((receita) => receita.categoria == "Bebida");

    loadRow(doces);
    loadRow(carnes);
    loadRow(saladas);
    loadRow(massas);
    loadRow(bebidas);
}

function loadRow(receitas) {
    let rows = receitas.map((receita) => {
        let cartao = `
            <div class="col-md-2">
             <a class="nav-link" href="receita?id=${receita.id}"><span class="sr-only"></span>
              <div class="recipe-card">
                <img src="static/${receita.imagem}" class="d-block w-100" alt="Image 3">
                <div class="recipe-name">${receita.tempodeprep}</div>
              </div>
             </a>
             <p>${receita.nome}</p>
            </div>`;
        return cartao;
    });

    receitas.forEach((receita, i) => {
        document.getElementById(
            `${receita.categoria.toLowerCase()}-${i > 4 ? 2 : 1}-row`,
        ).innerHTML += rows[i];
    });
}

document.addEventListener("DOMContentLoaded", loadReceitas);
document.addEventListener("DOMContentLoaded", (event) => {
    const modal = document.getElementById("profileModal");
    const btn = document.querySelector(".open-profile-btn");
    const span = document.querySelector(".close-btn");

    btn.onclick = function () {
        modal.style.display = "block";
    };
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    const profileImage = document.querySelector(".profile img");
    profileImage.addEventListener("click", () => {
        alert("Cliquei na foto de perfil!");
    });

    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) return;

    const email = document.getElementById("perfil-email");
    const nome = document.getElementById("perfil-nome");
    const idade = document.getElementById("perfil-idade");
    const imc = document.getElementById("perfil-imc");

    email.innerText = login.email;
    nome.innerText = login.nome;
    idade.innerText = login.idade;
});

document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        let searchQuery = document.getElementById("searchInput").value.trim();

        fetch("receitas")
            .then((response) => response.json())
            .then((data) => {
                let recipeFound = false;
                data.forEach((recipe) => {
                    if (
                        recipe.nome.toLowerCase() === searchQuery.toLowerCase()
                    ) {
                        recipeFound = true;
                        window.location.href = "receita?id=" + recipe.id;
                    }
                });

                if (!recipeFound) {
                    window.alert("Receita não encontrada.");
                }
            })
            .catch((error) => console.error("Erro ao carregar o JSON:", error));
    });
