const token = "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";
const org = "ICEI-PUC-Minas-PPLCC-TI";
const teamSlug = "nutri-smart";

function loadMembers() {
  fetch(`https://api.github.com/orgs/${org}/teams/${teamSlug}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const divAmigos = document.getElementById("div-amigos");

      data.forEach((member) => {
        divAmigos.innerHTML += `
        <div class="amigo">
          <img class= "imagem" src="${member.avatar_url}"/>
          <p class= "amigos" >${member.login}</p>
          
        </div>
      `;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", loadMembers());
