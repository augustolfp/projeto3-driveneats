function SelecionarProduto(ElementoClicado) {
    let ElementoPai = ElementoClicado.parentNode;
    let ItemJaSelecionado = ElementoPai.querySelector(".ItemSelecionado");
    if(ItemJaSelecionado!==null) {
        ItemJaSelecionado.classList.remove("ItemSelecionado");
    }
    ElementoClicado.classList.add("ItemSelecionado")
    EstadoSelecao();
}

function ProdutosSelecionados() {
    let SelectedArticles = Array.from(document.querySelectorAll(".ItemSelecionado"));
    return SelectedArticles;
}

function NumeroDeProdutosSelecionados() {
    let num = document.querySelectorAll(".ItemSelecionado").length;
    return num;
}

function EstadoSelecao() {
    if(NumeroDeProdutosSelecionados()===3) {
        let BotaoCinza = document.querySelector(".SelecioneOs3Itens");
        let BotaoVerde = document.querySelector(".FecharPedido");
        BotaoCinza.classList.add("Escondido");
        BotaoVerde.classList.remove("Escondido");
    }
}

function FecharPedido() {
    let TransparentBackground = document.querySelector(".BlurBackground");
    let OrderStats = document.querySelector(".DetalhesPedidoContainer");
    TransparentBackground.classList.toggle("Escondido");
    OrderStats.classList.toggle("Escondido");
}

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
    for(let i=0; i < NumeroDeProdutosSelecionados(); i++) {
        ArrayProdutosSelecionados.push(RetornaNomeDeUmProduto(i));
    }
    return ArrayProdutosSelecionados;
}

function RetornaArrayPrecosSelecionados() {
    let ArrayPrecosSelecionados = [];
    for(let i=0; i < NumeroDeProdutosSelecionados(); i++) {
        ArrayPrecosSelecionados.push(RetornaPrecoDeUmProduto(i));
    }
    return ArrayPrecosSelecionados;
}