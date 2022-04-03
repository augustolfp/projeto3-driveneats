function SelecionarProduto(ElementoClicado) {
    let ElementoPai = ElementoClicado.parentNode;
    let ItemJaSelecionado = ElementoPai.querySelector(".ItemSelecionado");
    if(ItemJaSelecionado!==null) {
        ItemJaSelecionado.classList.remove("ItemSelecionado");
    }
    ElementoClicado.classList.add("ItemSelecionado")
    EstadoSelecao();
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

function Checkout() {
    let TransparentBackground = document.querySelector(".BlurBackground");
    let OrderStats = document.querySelector(".DetalhesPedidoContainer");
    TransparentBackground.classList.remove("Escondido");
    OrderStats.classList.remove("Escondido");

}
