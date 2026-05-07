const btnRegistrar = document.getElementById("btnRegistrar");

btnRegistrar.addEventListener("click", adicionarLivro);

function adicionarLivro() {

  const nomeInput = document.getElementById("nomeLivro");
  const atrasoInput = document.getElementById("diasAtraso");

  const nomeLivro = nomeInput.value;

  // Converte string para número
  const diasAtraso = Number(atrasoInput.value);

  // Validação
  if (nomeLivro === "" || atrasoInput.value === "") {
    alert("Preencha todos os campos!");
    return;
  }

  const listaLivros = document.getElementById("listaLivros");

  const linha = document.createElement("tr");

  let status = "NO PRAZO";

  // Condicional visual
  if (diasAtraso > 0) {

    linha.classList.add("atrasado");

    status = "ATRASADO";
  }

  // Template String
  linha.innerHTML = `
    <td>${nomeLivro}</td>
    <td>${diasAtraso}</td>
    <td class="status">${status}</td>

    <td>
      <button onclick="removerLivro(this)">
        Confirmar Arquivamento
      </button>
    </td>
  `;

  listaLivros.appendChild(linha);

  limparCampos();

  atualizarContadores();
}

function removerLivro(botao) {

  const linha = botao.parentElement.parentElement;

  linha.remove();

  atualizarContadores();
}

function atualizarContadores() {

  const linhas = document.querySelectorAll("#listaLivros tr");

  const totalLivros = linhas.length;

  let livrosComMulta = 0;

  linhas.forEach((linha) => {

    if (linha.classList.contains("atrasado")) {
      livrosComMulta++;
    }

  });

  document.getElementById("totalLivros").textContent =
    `Total de livros processados: ${totalLivros}`;

  document.getElementById("livrosMulta").textContent =
    `Livros com multa: ${livrosComMulta}`;
}

function limparCampos() {

  document.getElementById("nomeLivro").value = "";

  document.getElementById("diasAtraso").value = "";
}