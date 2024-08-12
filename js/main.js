
////////////////////////////////////2do intento

let cartBtn = document.querySelector('.cart');
let cartModal = document.querySelector('.cart-modal-container');
let closeCartBtn = document.querySelector('.close-btn');
let productsContainer = document.getElementById("products-container");
let listCartProducts = document.querySelector('.cart-list');
let cartProducts = [];
let products = [];

// /////mostrar carrito
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Renderizar productos en la lista HTML
let productsToHTML = () => {
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
                `<img class="product-img" src="${product.img}" alt="">
                <h3>${product.nombre}</h3>
                <p>$${product.precio}.00</p>
                <button class="add-btn" id="${product.id}">Agregar</button>`;
            productsContainer.appendChild(newProduct);
        });
    }
}

// Inicializar los productos desde el JSON
let initJSON = () => {
    fetch("./db/products.JSON")
        .then(response => response.json())
        .then(data => {
            products = data;
            productsToHTML();
            if (localStorage.getItem('cartProducts')) {
                cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
                cartHTML();
                updateTotal();
            }
        });
}
initJSON();


// Agregar producto al carrito
productsContainer.addEventListener('click', (e) => {
    let positionClick = e.target;
    if (positionClick.classList.contains('add-btn')) {
        let productId = positionClick.parentElement.dataset.id;
        addToCart(productId);
    }
});

let addToCart = (productId) => {
    let positionInCart = cartProducts.findIndex((value) => value.productId == productId);
    if (positionInCart < 0) {
        cartProducts.push({
            productId: productId,
            quantity: 1
        });
    } else {
        cartProducts[positionInCart].quantity += 1;
    }

    cartHTML();
    updateTotal();
    cartMemory();
}

// Guardar productos del carrito en localStorage
let cartMemory = () => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

// Renderizar productos del carrito en el modal
let cartHTML = () => {
    listCartProducts.innerHTML = '';
    if (cartProducts.length > 0) {
        cartProducts.forEach(cartProduct => {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cartProduct.productId;
            let positionProduct = products.findIndex((value) => value.id == cartProduct.productId);
            let info = products[positionProduct];
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.img}" alt="cartThumbnail">
                </div>
                <div class="product-name">
                    ${info.nombre}
                </div>
                <div class="price">
                    $${info.precio * cartProduct.quantity}
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cartProduct.quantity}</span>
                    <span class="plus">+</span>
                </div>`;
            listCartProducts.appendChild(newCart);
        });
    }
}

// Calcular el total a pagar

function calculateTotal() {
    let total = 0;
    
    cartProducts.forEach(cartProduct => {
        let productInfo = products.find(product => product.id == cartProduct.productId);
        
        if (productInfo) {
            total += productInfo.precio * cartProduct.quantity;
        } else {
            console.log("Producto no encontrado para el ID:", cartProduct.productId);
        }
    });
    return total;
}

// Actualizar el total en el modal
function updateTotal() {
    console.log("Ejecutando updateTotal");
    let total = calculateTotal();
    let totalPriceElement = document.getElementById('total-price');
    console.log("Total a mostrar:", total);
    totalPriceElement.innerHTML = total.toFixed(2);
}

// Cambiar la cantidad de productos en el carrito
listCartProducts.addEventListener('click', (e) => {
    let positionClick = e.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let productId = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantity(productId, type);
    }
});

let changeQuantity = (productId, type) => {
    let positionItemInCart = cartProducts.findIndex((value) => value.productId == productId);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cartProducts[positionItemInCart].quantity += 1;
                break;
            case 'minus':
                let valueChange = cartProducts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    cartProducts[positionItemInCart].quantity = valueChange;
                } else {
                    cartProducts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    cartMemory();
    cartHTML();
    updateTotal();
}

// Mostrar mensaje con Toastify
Toastify({
    text: "Envio gratis en compras mayores a $499",
    duration: 5500,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} 
}).showToast();
