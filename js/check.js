//  let listCart = [];

//  let checkoutStorage = localStorage.getItem("cartProducts");
//  checkoutStorage = JSON.parse(checkoutStorage)

// // function checkCart (){
// //     let cookieValue = document.cookie
// //     .split ('; ')
// //     .find (row => row.startsWith('listCart='));
// //     if(cookieValue){
// //         listCart = JSON.parse(cookieValue.split(' ')[1]);
// //     }
// // }
// // checkCart();
// addCartToHTML();

// function addCartToHTML(){
//     let listCartHTML = document.querySelector('.checkout-list');
//     listCartHTML = '';
//     let totalPriceHTML = document.querySelector('.total-checkout-number');
//     let totalPrice = 0;

//     if (listCart){
//         listCart.forEach(product => {
//          if(product){
//             let newP = document.createElement ('div');
//             newP.classList.add('item');
//             newP.innerHTML = `
//                <img src="${product.img}" alt="">
//                <div class="item-info">
//                <div class="name">${product.nombre}</div>
//                <div class="price">${product.precio}</div>
//                </div>
//                <div class="quantity">${product.quantity}</div>
//                <div class="total-price">$${product.precio * product.quantity}</div>`
//             listCartHTML.appendChild(newP);
//             totalQuantity = totalQuantity + product.quantity;
//             totalPrice = totalPrice + (product.precio * product.quantity);
//          }
//         })
//     }
// }

// addCartToHTML()


////////////////////////INTENTO 2 ////////////////////////////////
let products = [];
let cartProducts = [];

let checkoutStorage = localStorage.getItem("cartProducts");
checkoutStorage = JSON.parse(checkoutStorage);

let initJSON = () =>{
    fetch("./db/products.JSON")
    .then(response => response.json())
    .then(data => {
        products = data;
        renderCheckout();
     if(localStorage.getItem('cartProducts')){
        item = JSON.parse(localStorage.getItem('cartProducts'));
        }
    })
    }
initJSON();



   let checkoutContainer = document.querySelector ('.checkout-list');
    function renderCheckout (checkoutItems){
        checkoutItems.forEach ( product => {
            let item = document.createElement("div");
            item.innerHTML = `
                  <img src="${product.img}" alt="">
                  <div class="item-info">
                  <div class="name">${product.nombre}</div>
                  <div class="price">$${product.precio}</div>
                  </div>
                  <div class="quantity">${product.quantity}</div>
                  <div class="total-price">$${product.precio * product.quantity}</div>`;
              checkoutContainer.appendChild(item);
        })
    }
        renderCheckout(checkoutStorage)

    //////////////////////intento 3 ///////////////////////////////
        // let renderCheckout = () => {
        //     if (cartProducts.length > 0) {
        //         cartProducts.forEach (cartProduct => {
        //             let item = document.createElement ("div");
        //             item.classList.add ('checkout-item');
        //             item.dataset.id = cartProduct.productId;
        //             let positionProduct= products.findIndex((value) => value.id == cartProduct.productId);
        //             let info = products[positionProduct];

        //             item.innerHTML = `
        //             <img src="${info.img}" alt="">
        //             <div class="item-info">
        //             <div class="name">${info.nombre}</div>
        //              <div class="price">$${info.precio}</div>
        //             </div>
        //             <div class="quantity">${info.quantity}</div>
        //             <div class="total-price">$${info.precio * info.quantity}</div>`
        //             checkoutContainer.appendChild(item);
        //         })
        //     }
        // }
        
        // renderCheckout();

        
