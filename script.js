import { dishes, beverages, desserts } from "./data.js";
import { Session } from "./classes";

new Session(dishes, beverages, desserts);

let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;

function SelecionarProduto(ElementoClicado, tipo, nome, preco) {
    let ElementoPai = ElementoClicado.parentNode;
    let ItemJaSelecionado = ElementoPai.querySelector(".ItemSelecionado");
    if (ItemJaSelecionado !== null) {
        ItemJaSelecionado.classList.remove("ItemSelecionado");
    }
    ElementoClicado.classList.add("ItemSelecionado");

    if (tipo === "prato") pratoSelecionado = { nome, preco };
    if (tipo === "bebida") bebidaSelecionada = { nome, preco };
    if (tipo === "sobremesa") sobremesaSelecionada = { nome, preco };

    EstadoSelecao();
}

function EstadoSelecao() {
    if (NumeroDeProdutosSelecionados() === 3) {
        let BotaoCinza = document.querySelector(".SelecioneOs3Itens");
        let BotaoVerde = document.querySelector(".FecharPedido");
        BotaoCinza.classList.add("Escondido");
        BotaoVerde.classList.remove("Escondido");
    }
}

function NumeroDeProdutosSelecionados() {
    let num = document.querySelectorAll(".ItemSelecionado").length;
    return num;
}

function FecharPedido() {
    InterruptorInterfaceCheckout();

    const prato = document.querySelector(".DetalhePrato");
    prato.innerHTML = `
        <h4>${pratoSelecionado.nome}</h4>
        <h6>R$ ${pratoSelecionado.preco.toFixed(2)}</h6>
    `;

    const bebida = document.querySelector(".DetalheBebida");
    bebida.innerHTML = `
    <h4>${bebidaSelecionada.nome}</h4>
    <h6>R$ ${bebidaSelecionada.preco.toFixed(2)}</h6>
`;
    const sobremesa = document.querySelector(".DetalheSobremesa");
    sobremesa.innerHTML = `
    <h4>${sobremesaSelecionada.nome}</h4>
    <h6>R$ ${sobremesaSelecionada.preco.toFixed(2)}</h6>
`;
    const total = document.getElementById("ValorTotal");
    total.innerHTML = `
    R$ ${(
        pratoSelecionado.preco +
        bebidaSelecionada.preco +
        sobremesaSelecionada.preco
    ).toFixed(2)}
    `;
}

document.querySelector(".FecharPedido").addEventListener("click", FecharPedido);

function InterruptorInterfaceCheckout() {
    let TransparentBackground = document.querySelector(".BlurBackground");
    let OrderStats = document.querySelector(".DetalhesPedidoContainer");
    TransparentBackground.classList.toggle("Escondido");
    OrderStats.classList.toggle("Escondido");
}

document
    .querySelector(".Cancelar")
    .addEventListener("click", InterruptorInterfaceCheckout);

function FinalizarPedido() {
    let nome = prompt("Qual é o seu nome?");
    let endereco = prompt("Digite o seu endereço");
    EnviaMensagem(nome, endereco);
}

document.querySelector(".Confirmar").addEventListener("click", FinalizarPedido);

function EnviaMensagem(nome, endereco) {
    let Mensagem = TextoMensagem(nome, endereco);
    window.open("https://wa.me/5535988005349?text=" + Mensagem, "_self");
}

function TextoMensagem(nome, endereco) {
    let Mensagem = `Olá, gostaria de fazer o pedido:
    -Prato: ${pratoSelecionado.nome} 
    -Bebida: ${bebidaSelecionada.nome} 
    -Sobremesa: ${sobremesaSelecionada.nome}
    Total: R$ ${(
        pratoSelecionado.preco +
        bebidaSelecionada.preco +
        sobremesaSelecionada.preco
    ).toFixed(2)}
    Nome: ${nome}
    Endereço: ${endereco}`;
    Mensagem = encodeURIComponent(Mensagem);
    return Mensagem;
}
