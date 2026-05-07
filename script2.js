const livros = [
  { id: 1, titulo: "Dom Casmurro", preco: 29.9 },
  { id: 2, titulo: "Clean Code", preco: 49.9 },
  { id: 3, titulo: "O Senhor dos Anéis", preco: 79.9 },
  { id: 4, titulo: "O Alquimista", preco: 39.9 },
];

let carrinho = [];
let total = 0;

const listaLivrosHtml = document.getElementById("lista-livros");
const itensCarrinhoHtml = document.getElementById("itens-carrinho");
const valorTotalHtml = document.getElementById("valor-total");

function carregarCatalogo() {
  livros.forEach((livro) => {
    const div = document.createElement("div");
    div.classList.add("livro");
    div.innerHTML = `
        <h3>${livro.titulo}</h3>
        <p>R$ ${livro.preco.toFixed(2)}</p>
        <button onclick='adicionarAoCarrinho(${livro.id})'>Adicionar</button>

      `;
    listaLivrosHtml.appendChild(div);
  });
}

function adicionarAoCarrinho(id) {
  const livro = livros.find((l) => l.id === id);
  carrinho.push(livro);
  total += livro.preco;
  atualizarInterfaceCarrinho();
}

function removerItem(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  if (carrinho.length === 0) total = 0;

  atualizarInterfaceCarrinho();
}

function esvaziarCarrinho() {
  carrinho = [];
  total = 0;
  atualizarInterfaceCarrinho();
}

function atualizarInterfaceCarrinho() {
  itensCarrinhoHtml.innerHTML = "";

  carrinho.forEach((item, index) => {

    const li = document.createElement("li");

    li.textContent = `${item.titulo} - R$ ${item.preco.toFixed(2)} `;

    const remover = document.createElement("span");
    remover.textContent = "(remover)";
    remover.style.color = "red";
    remover.style.marginLeft = "10px";
    remover.style.cursor = "pointer";

    remover.onclick = () => removerItem(index);

    li.appendChild(remover);

    itensCarrinhoHtml.appendChild(li);
  });

  valorTotalHtml.textContent = total.toFixed(2);

  if (total > 100) {
    valorTotalHtml.classList.add("total-alerta");
    valorTotalHtml.classList.remove("total-normal");
  } else {
    valorTotalHtml.classList.add("total-normal");
    valorTotalHtml.classList.remove("total-alerta");
  }
}

carregarCatalogo();
