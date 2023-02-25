import { sayHello } from "./beverage.js";

sayHello();

const pratos = [
    {
        nome: "Frango Yin Yang",
        imagem: "images/frango.png",
        descricao: "Um pouco de batata, um pouco de salada",
        preco: 14.9,
    },
    {
        nome: "Macarrão médio",
        imagem: "images/frango.png",
        descricao: "Massa fresquinha",
        preco: 28.5,
    },
    {
        nome: "Yakissoba tradicional",
        imagem: "images/frango.png",
        descricao: "Receita familiar!",
        preco: 19.9,
    },
];

const bebidas = [
    {
        nome: "Coquinha gelada",
        imagem: "images/coca.png",
        descricao: "Lata 350ml",
        preco: 4.9,
    },
    {
        nome: "Cervejinha",
        imagem: "images/coca.png",
        descricao: "Lata 350ml",
        preco: 5.5,
    },
    {
        nome: "Água com gás",
        imagem: "images/coca.png",
        descricao: "Garrafa 500ml",
        preco: 2.9,
    },
];

const sobremesas = [
    {
        nome: "Pudim",
        imagem: "images/pudim.png",
        descricao: "Apenas pudim",
        preco: 7.9,
    },
    {
        nome: "Gelatina",
        imagem: "images/pudim.png",
        descricao: "Feita com muito carinho",
        preco: 5.8,
    },
    {
        nome: "Salada de frutas",
        imagem: "images/pudim.png",
        descricao: "Para os Fitness de plantão",
        preco: 9.9,
    },
];

const pratosContainer = document.querySelector(".Pratos");
const bebidasContainer = document.querySelector(".Bebidas");
const sobremesaContainer = document.querySelector(".Sobremesa");

pratos.forEach((prato) => {
    renderizarItem(prato, pratosContainer);
});

bebidas.forEach((bebida) => {
    renderizarItem(bebida, bebidasContainer);
});

sobremesas.forEach((sobremesa) => {
    renderizarItem(sobremesa, sobremesaContainer);
});

function SelecionarProduto(ElementoClicado) {
    let ElementoPai = ElementoClicado.parentNode;
    let ItemJaSelecionado = ElementoPai.querySelector(".ItemSelecionado");
    if (ItemJaSelecionado !== null) {
        ItemJaSelecionado.classList.remove("ItemSelecionado");
    }
    ElementoClicado.classList.add("ItemSelecionado");
    EstadoSelecao();
}

const productList = document.querySelectorAll("article");
for (let i = 0; i < productList.length; i++) {
    productList[i].addEventListener("click", function () {
        SelecionarProduto(productList[i]);
    });
}

function ProdutosSelecionados() {
    let SelectedArticles = Array.from(
        document.querySelectorAll(".ItemSelecionado")
    );
    return SelectedArticles;
}

function NumeroDeProdutosSelecionados() {
    let num = document.querySelectorAll(".ItemSelecionado").length;
    return num;
}

function EstadoSelecao() {
    if (NumeroDeProdutosSelecionados() === 3) {
        let BotaoCinza = document.querySelector(".SelecioneOs3Itens");
        let BotaoVerde = document.querySelector(".FecharPedido");
        BotaoCinza.classList.add("Escondido");
        BotaoVerde.classList.remove("Escondido");
    }
}

function InterruptorInterfaceCheckout() {
    let TransparentBackground = document.querySelector(".BlurBackground");
    let OrderStats = document.querySelector(".DetalhesPedidoContainer");
    TransparentBackground.classList.toggle("Escondido");
    OrderStats.classList.toggle("Escondido");
}

document
    .querySelector(".Cancelar")
    .addEventListener("click", InterruptorInterfaceCheckout);

function StringReaistoFloat(price) {
    let PriceString = price.substr(3);
    PriceString = PriceString.replace(",", ".");
    return Number(PriceString);
}

function FloattoStringReais(price) {
    let Valor = price.toFixed(2).toString();
    Valor = Valor.replace(".", ",");
    return Valor;
}

function CalculaValorTotal() {
    let VetorPrecos = RetornaArrayPrecosSelecionados();
    let ArrayPrecosNumber = [];
    let total = 0;
    for (let i = 0; i < NumeroDeProdutosSelecionados(); i++) {
        total = total + StringReaistoFloat(VetorPrecos[i]);
    }
    return total;
}

function FecharPedido() {
    InterruptorInterfaceCheckout();
    let VetorPrecos = RetornaArrayPrecosSelecionados();
    let VetorProdutos = RetornaArrayProdutosSelecionados();
    let NomesProdutos = Array.from(
        document.getElementById("DetalhesPedido").querySelectorAll("h4")
    );
    let PrecosProdutos = Array.from(
        document.getElementById("DetalhesPedido").querySelectorAll("h6")
    );
    for (let i = 0; i < NumeroDeProdutosSelecionados(); i++) {
        NomesProdutos[i].innerHTML = VetorProdutos[i];
        PrecosProdutos[i].innerHTML = VetorPrecos[i];
    }
    let StringValorTotal = FloattoStringReais(CalculaValorTotal());
    document.getElementById("ValorTotal").innerHTML = "R$ " + StringValorTotal;
}

document.querySelector(".FecharPedido").addEventListener("click", FecharPedido);

function RetornaNomeDeUmProduto(i) {
    let Produtos = ProdutosSelecionados();
    let nome = Produtos[i].querySelector(".ItemName");
    return nome.innerText;
}

function RetornaPrecoDeUmProduto(i) {
    let Produtos = ProdutosSelecionados();
    let preco = Produtos[i].querySelector(".Price");
    return preco.innerText;
}

function RetornaArrayProdutosSelecionados() {
    let ArrayProdutosSelecionados = [];
    for (let i = 0; i < NumeroDeProdutosSelecionados(); i++) {
        ArrayProdutosSelecionados.push(RetornaNomeDeUmProduto(i));
    }
    return ArrayProdutosSelecionados;
}

function RetornaArrayPrecosSelecionados() {
    let ArrayPrecosSelecionados = [];
    for (let i = 0; i < NumeroDeProdutosSelecionados(); i++) {
        ArrayPrecosSelecionados.push(RetornaPrecoDeUmProduto(i));
    }
    return ArrayPrecosSelecionados;
}
function TextoMensagem(nome, endereco) {
    let Produtos = RetornaArrayProdutosSelecionados();
    let ValorTotal = CalculaValorTotal();
    ValorTotal = ValorTotal.toFixed(2);
    let Mensagem = `Olá, gostaria de fazer o pedido:
    -Prato: ${Produtos[0]} 
    -Bebida: ${Produtos[1]} 
    -Sobremesa: ${Produtos[2]}
    Total: R$ ${ValorTotal}
    Nome: ${nome}
    Endereço: ${endereco}`;
    Mensagem = encodeURIComponent(Mensagem);
    return Mensagem;
}
function EnviaMensagem(nome, endereco) {
    let Mensagem = TextoMensagem(nome, endereco);
    window.open("https://wa.me/5535988005349?text=" + Mensagem, "_self");
}

function FinalizarPedido() {
    let nome = prompt("Qual é o seu nome?");
    let endereco = prompt("Digite o seu endereço");
    EnviaMensagem(nome, endereco);
}

document.querySelector(".Confirmar").addEventListener("click", FinalizarPedido);

function renderizarItem(item, container) {
    const article = document.createElement("article");
    article.innerHTML = `
                    <div>
                        <img src="${item.imagem}" />
                        <h4 class="ItemName">${item.nome}</h4>
                        <h5>${item.descricao}</h5>
                        <p class="Price">R$ ${item.preco.toFixed(2)}</p>
                    </div>
                    <ion-icon name="checkmark-circle"></ion-icon>
    `;
    container.appendChild(article);
}
