export class Session {
    constructor(dishes, beverages, desserts) {
        this.dishes = this.buildMenu(dishes, "dish");
        this.beverages = this.buildMenu(beverages, "beverage");
        this.desserts = this.buildMenu(desserts, "dessert");
        this.order = new Order();
    }

    buildMenu(items, type) {
        let container = null;
        if (type === "dish") container = document.querySelector(".Pratos");
        if (type === "beverage") container = document.querySelector(".Bebidas");
        if (type === "dessert") {
            container = document.querySelector(".Sobremesa");
        }

        return items.map(({ name, image, description, price }) => {
            const dish = new Item(name, image, description, price, type);
            dish.render(container);
        });
    }
}

export class Order {
    constructor() {
        this.dish = null;
        this.beverage = null;
        this.dessert = null;
        this.user = null;
    }

    isValid() {
        return this.dish && this.beverage && this.dessert;
    }

    getTotalPrice() {
        return this.dish.price + this.beverage.price + this.dessert.price;
    }

    sendWhatsApp() {
        const message = `
        Olá, gostaria de fazer o pedido:
        -Prato: ${this.dish.name} 
        -Bebida: ${this.beverage.name} 
        -Sobremesa: ${this.dessert.name}
        Total: R$ ${this.getTotalPrice().toFixed(2)}
        Nome: ${this.user.name}
        Endereço: ${this.user.address}
        `;

        window.open(
            "https://wa.me/5535988005349?text=" + encodeURIComponent(message),
            "_self"
        );
    }
}

export class Item {
    constructor(name, image, description, price, type) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.element = null;
        this.type = type;
    }

    render(container) {
        const article = document.createElement("article");
        article.innerHTML = `
        <div>
            <img src="${this.image}" />
            <h4 class="ItemName">${this.name}</h4>
            <h5>${this.description}</h5>
            <p class="Price">R$ ${this.price.toFixed(2)}</p>
        </div>
        <ion-icon name="checkmark-circle"></ion-icon>
`;
        this.element = article;
        container.appendChild(article);
        this.element.addEventListener("click", function () {
            article.classList.add("ItemSelecionado");
        });
    }
}

export class User {
    constructor() {
        this.name = null;
        this.address = null;
    }
}