export class Session {
    constructor(dishes, beverages, desserts) {
        this.dishes = this.buildDishes(dishes);
        this.beverages = this.buildBeverages(beverages);
        this.desserts = this.buildDesserts(desserts);
        this.order = new Order();
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

export class Dish {
    constructor(name, image, description, price) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
    }
}

export class Beverage {
    constructor(name, image, description, price) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
    }
}

export class Dessert {
    constructor(name, image, description, price) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
    }
}

export class User {
    constructor() {
        this.name = null;
        this.address = null;
    }
}
