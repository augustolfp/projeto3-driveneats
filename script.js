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

function InterruptorInterfaceCheckout() {
    let TransparentBackground = document.querySelector(".BlurBackground");
    let OrderStats = document.querySelector(".DetalhesPedidoContainer");
    TransparentBackground.classList.toggle("Escondido");
    OrderStats.classList.toggle("Escondido");
}

function StringReaistoFloat(price) {
    let PriceString = price.substr(3);
    PriceString = PriceString.replace(",", ".");
    return Number(PriceString)
}

function CalculaValorTotal() {
    let VetorPrecos = RetornaArrayPrecosSelecionados();
    let ArrayPrecosNumber = [];
    let total = 0;
    for(let i=0; i < NumeroDeProdutosSelecionados(); i++) {
        total = total + StringReaistoFloat(VetorPrecos[i]);
    }
    return total;
}

function FecharPedido() {
    InterruptorInterfaceCheckout();
    let VetorPrecos = RetornaArrayPrecosSelecionados();
    let VetorProdutos = RetornaArrayProdutosSelecionados();
    let NomesProdutos = Array.from(document.getElementById("DetalhesPedido").querySelectorAll("h4"));
    let PrecosProdutos = Array.from(document.getElementById("DetalhesPedido").querySelectorAll("h6"));
    for(let i = 0; i < NumeroDeProdutosSelecionados(); i++) {
        NomesProdutos[i].innerHTML = VetorProdutos[i];
        PrecosProdutos[i].innerHTML = VetorPrecos[i];
    }
    document.getElementById("ValorTotal").innerHTML = String(CalculaValorTotal());
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