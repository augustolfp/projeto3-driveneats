function SelecionarProduto(ElementoClicado) {
    let ElementoPai = ElementoClicado.parentNode;
    let ItemJaSelecionado = ElementoPai.querySelector(".ItemSelecionado");
    if(ItemJaSelecionado!==null) {
        ItemJaSelecionado.classList.remove("ItemSelecionado");
    }
    ElementoClicado.classList.add("ItemSelecionado")
}
