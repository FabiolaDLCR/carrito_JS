
let cartBtn = document.querySelector('.cart');
let cartModal = document.querySelector ('.cart-modal-container');
let closeCartBtn = document.querySelector ('.close-btn');
let productsContainer = document.getElementById("products-container")
let listCartProducts = document.querySelector('.cart-list');
let cartProducts = [];
let carts = [];
let products = [];


////////HIDDE AND SHOW MODAL//////////////////////

cartBtn.addEventListener ('click', () => {
    cartModal.style.display = ('block');
})
closeCartBtn.addEventListener ('click', () => {
    cartModal.style.display = ('none')
})

//////////////////// ADD PRODUCTS LIST TO HTML/////////////////////
let productsToHTML = () => {
    if (products.length > 0){
        products.forEach(product => {
            let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                            `<img class= "product-img" src="${product.img}" alt="">
                             <h3>${product.nombre}</h3>
                             <p>$${product.precio}.00</p>
                             <button class="add-btn" id="${product.id}"> Agregar </button>`;
                         productsContainer.appendChild(newProduct);
        });
        
    }
}

///////////////////JSON PRODUCTS//////////////////////// 

let initJSON = () =>{
    fetch("./db/products.JSON")
    .then(response => response.json())
    .then(data => {
        products=data;
        productsToHTML();
     if(localStorage.getItem('cartProducts')){
        cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        cartHTML();
        }
    })
    }
initJSON();


    

////////ADD TO CART BUTTON//////////////////////
productsContainer.addEventListener ('click', (e) => {
    let positionClick = e.target;
    if(positionClick.classList.contains('add-btn')){
        let productId = positionClick.parentElement.dataset.id;
        addToCart (productId);
        
    }
} )

let addToCart = (productId) => {
    let positionInCart = cartProducts.findIndex((value) => value.productId == productId);
    if(cartProducts.length <= 0){
    cartProducts = [{
        productId: productId,
        quantity:1
    }]
}
else if(positionInCart < 0){
cartProducts.push({
    productId: productId,
    quantity:1
});
}
else{
    cartProducts[positionInCart].quantity = cartProducts[positionInCart].quantity + 1;
}


cartHTML();
////////CART STORAGE//////////////////////
cartMemory();
}
let cartMemory = () => {
    localStorage.setItem('cartProduct', JSON.stringify(cartProducts));
}


////////ADD PRODUCTS TO CART AND HTML//////////////////////
let cartHTML = () => {
    listCartProducts.innerHTML = ``;
    if(cartProducts.length > 0){
        cartProducts.forEach(cartProduct => {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cartProduct.productId;
            let positionProduct= products.findIndex((value) => value.id == cartProduct.productId);
            let info = products[positionProduct];
            newCart.innerHTML = `
             <div class="image">
             <img src="${info.img}" alt="cartThumbnail">
             </div>
             <div class="product-name">
              ${info.nombre}
             </div>
             <div class="Price">
              $${info.precio * cartProduct.quantity}
             </div>
             <div class="quantity">
              <span class="minus">-</span>
             <span>${cartProduct.quantity}</span>
              <span class="plus">+</span>
             </div>
      `
         listCartProducts.appendChild(newCart);
        })
    } 
}

listCartProducts.addEventListener ('click', (e) => {
    let positionClick = e.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let productId = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';   
        }
        changeQuantity(productId, type);
    }
})


////////////////MINUS AND ADD ITEMS BUTTONS///////////////////////////
let changeQuantity = (productId, type) => {
    let positionItemInCart= cartProducts.findIndex((value) => value.productId == productId);
    if (positionItemInCart >= 0){
        switch(type){
            case 'plus':
            cartProducts[positionItemInCart].quantity = cartProducts[positionItemInCart].quantity + 1;
            break;
            default:
                let valueChange=cartProducts[positionItemInCart].quantity -1;
                if(valueChange > 0){
                    cartProducts[positionItemInCart].quantity = valueChange;
                }
                else{
                    cartProducts.splice(positionItemInCart,1);
                }
                break;
        }
    }
    cartMemory();
    cartHTML();
}
/////////////////////LIBRERIAS////////////////////////////////
            Toastify({
                text: "Envio gratis en compras mayores a $499",
                duration: 5500,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
    

