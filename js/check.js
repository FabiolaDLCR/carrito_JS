let products = [];
let cartProducts = [];

/////// Cargar productos del JSON dese localStorage
let initJSON = () => {
    fetch("./db/products.JSON")
    .then(response => response.json())
    .then(data => {
        products = data;
        cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        renderCheckout(cartProducts);
        updateCheckoutTotal();
    })
    .catch(error => {
        console.error("Error en la carga del JSON:", error);
    });
}

initJSON();

let checkoutContainer = document.querySelector('.checkout-list');

////// Renderizar productos del checkout
function renderCheckout(checkoutItems) {
    checkoutContainer.innerHTML = '';  

    checkoutItems.forEach(cartProduct => {
        let productInfo = products.find(product => product.id == cartProduct.productId);

        if (productInfo) {
            let item = document.createElement("div");
            item.classList.add("checkout-item");
            item.innerHTML = `
                <img src="${productInfo.img}" alt="${productInfo.nombre}">
                <div class="item-info">
                    <div class="name">${productInfo.nombre}</div>
                    <div class="price">$${productInfo.precio}</div>
                </div>
                <div class="quantity">${cartProduct.quantity}</div>
                <div class="total-price">$${productInfo.precio * cartProduct.quantity}</div>
            `;
            checkoutContainer.appendChild(item);
        }
    });
}

////////// Calcular y actualizar el total en el checkout
function calculateCheckoutTotal() {
    let total = 0;

    cartProducts.forEach(cartProduct => {
        let productInfo = products.find(product => product.id == cartProduct.productId);

        if (productInfo) {
            total += productInfo.precio * cartProduct.quantity;
        }
    });

    return total;
}

function updateCheckoutTotal() {
    let total = calculateCheckoutTotal();
    let totalCheckElement = document.querySelector('.total-check-number h2');
    totalCheckElement.textContent = `Total: $${total.toFixed(2)}`;
}

        
