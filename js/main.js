const productos = [
    {
        id: 1, 
        nombre: "Frasco de vidrio hermético",
        precio: 120, 
        cantidad:0,
        img: "./images/frasco-vidrio.jpg"
    },
    {
        id: 2,
        nombre: "Popote de acero inoxidable",
        precio: 35,
        cantidad:0,
        img: "./images/straw.jpg"
    },
    {
        id: 3,
        nombre: "Infusor de acero inoxidable",
        precio: 45,
        cantidad:0,
        img: "./images/infusor.jpg"
    },
    {
        id: 4,
        nombre: "Bolsa de tela",
        precio: 345,
        cantidad:0,
        img: "./images/totebag.jpg"
    },
    {
        id: 5,
        nombre: "Termo 450ml",
        precio: 360,
        cantidad:0,
        img: "./images/termo-inox.jpg"
    }
] 

let cartBtn = document.querySelector('.cart');
let cartModal = document.querySelector ('.cart-modal-container');
let closeCartBtn = document.querySelector ('.close-btn');
let productsContainer = document.getElementById("products-container")
let listCartProducts = document.querySelector('.cart-list')
let cartProducts = [];


///////////////PRODUCT LIST//////////////////////////////
function renderProductos (productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.dataset.id = producto.id;
        card.innerHTML = `<img class= "product-img" src="${producto.img}" alt="">
                          <h3>${producto.nombre}</h3>
                          <p>$${producto.precio}.00</p>
                          <button class="add-btn" id="${producto.id}"> Agregar </button>
                        `
        productsContainer.appendChild(card)
    })  
}

renderProductos(productos)


////////HIDDE AND SHOW MODAL//////////////////////

cartBtn.addEventListener ('click', () => {
    cartModal.style.display = ('block');
})
closeCartBtn.addEventListener ('click', () => {
    cartModal.style.display = ('none')
})

productsContainer.addEventListener ('click', (e) => {
    let positionClick = e.target;
    if(positionClick.classList.contains('add-btn')){
        let productId = positionClick.parentElement.dataset.id;
        addToCart (productId);
    }
} )

////////ADD TO CART BUTTON//////////////////////
let addToCart = (productId) => {
    let positionInCart = cartProducts.findIndex((value) => value.productId == productId);
    if(cartProducts.length <= 0){
    cartProducts = [{
        productId: productId,
        quantity:1
    }]
}
else if(positionInCart<0)
    {
cartProducts.push({
    productId: productId,
    quantity:1
});}
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



////////CART PRODUCTS//////////////////////
let cartHTML = () => {
    listCartProducts.innerHTML = ``;
    if(cartProducts.length > 0){
        cartProducts.forEach(cartProduct => {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cartProduct.productId;
            let positionProduct= productos.findIndex((value) => value.id == cartProduct.productId);
            let info = productos[positionProduct];
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
let changeQuantity = (productId,type) => {
    let positionItemInCart= cartProducts.findIndex((value) => value.productId == productId);
    if (positionItemInCart >= 0){
        switch(type){
            case 'plus':
            cartProducts[positionItemInCart].quantity = cartProducts[positionItemInCart].quantity =1;
            break;
            default:
                let valueChange=cartProducts[positionItemInCart].quantity -1;
                if(valueChange > 0){
                    cartProducts[positionItemInCart].quantity = valueChange;
                }
                else{
                    cartProducts.slice(positionItemInCart,1)
                }
                break;
        }
    }
    cartMemory();
    cartHTML();
}

if(localStorage.getItem('cartProduct')){
    cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
    cartHTML();
}
