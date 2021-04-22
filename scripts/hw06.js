
// Basket object

const basket = {

    goods: {},

    totalPrice: 0,

    renderCart() {
        const cart = document.getElementById("cart");
        cart.innerHTML = "";
        const total = document.createElement("h3");
        total.innerText = `TOTAL: $${this.totalPrice}.`;
        cart.appendChild(total);

        let i = 1;
        for (const good in this.goods) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `${i}) ${good}. ${this.goods[good][0]} pcs. $${this.goods[good][1]}.`
            cart.appendChild(paragraph);
            i += 1;
        }
    },

    clickToBasket(event) {

        let product = (event.target.parentNode.querySelector('h3')).innerText;
        let price = Number((event.target.parentNode.querySelector('span')).innerText);

        if (event.target.className === "addBtn") {
            if (product in basket.goods === false) {
                basket.goods[product] = [1, price];
            } else {
                basket.goods[product][0] += 1;
            }

            basket.totalPrice += price;

        } else {
            if (product in basket.goods === false) {
                return null;
            } else if (basket.goods[product][0] === 1) {
                basket.totalPrice -= price;
                delete basket.goods[product];
            } else {
                basket.goods[product][0] -= 1;
                basket.totalPrice -= price;
            }
        }
        basket.renderCart();
    },
}

// Gallery + Slider

function openImage(event) {
    const target = event.target;
    const id = target.id.slice(-1);
    renderBigImage(id);
}

function renderBigImage(id) {
    const image = document.createElement("img");
    const gallery = document.getElementsByClassName("gallery")[0];
    gallery.innerHTML = "";
    image.id = `image-${id}`;
    image.src = `https://picsum.photos/seed/${id}/800`;
    image.alt = `Изображение ${id}`;
    gallery.appendChild(image);

    image.addEventListener("error", function () {
        image.alt = "⛔ Keep calm. This is a placeholder. Image not found. ⛔";
    });
};

function nextImage(event) {

    const img = document.querySelector('.gallery img');
    const thumbnails = document.querySelectorAll('.thumbnails > img');
    let id = img.id.slice(-1);

    if (event.target.id === 'rightArrow') { id++; } else { id--; }
    if (id < 1) { id = thumbnails.length; }
    if (id > thumbnails.length) { id = 1; }

    renderBigImage(id);
}

// Init for both modules

function init() {

    basket.renderCart();

    const addButtons = document.getElementsByClassName("addBtn")
    for (const addButton of addButtons) {
        addButton.addEventListener('click', basket.clickToBasket);
    }

    const remButtons = document.getElementsByClassName("remBtn")
    for (const remButton of remButtons) {
        remButton.addEventListener('click', basket.clickToBasket);
    }

    const images = document.querySelectorAll(".thumbnails > img");
    for (const image of images) {
        image.addEventListener('click', openImage);
    }

    const rightArrow = document.getElementById('rightArrow');
    rightArrow.addEventListener('click', nextImage);

    const leftArrow = document.getElementById('leftArrow');
    leftArrow.addEventListener('click', nextImage);
}

window.addEventListener('load', init);

