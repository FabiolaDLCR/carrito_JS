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

        
        let initJSON = () =>{
            fetch("./db/products.JSON")
            .then(response => response.json())
            .then(data => {
                products=data;
                renderCheckout();
             if(localStorage.getItem('cartProducts')){
                item = JSON.parse(localStorage.getItem('cartProducts'));
                }
            })
            }
        initJSON();
        

////////////////////////////////CHAT GPT////////////////////////
// let products = [];

// let initJSON = () => {
//     fetch("./db/products.JSON")
//         .then(response => response.json())
//         .then(data => {
//             products = data;
//             renderCheckout(checkoutStorage);
//             if(localStorage.getItem('cartProducts')){
//                         item = JSON.parse(localStorage.getItem('cartProducts'));
//                         } // Pasamos `checkoutStorage` como argumento
//         })
// }

// initJSON();

// let checkoutStorage = localStorage.getItem("cartProducts");
// checkoutStorage = JSON.parse(checkoutStorage);

// let checkoutContainer = document.querySelector(".checkout-list");

// function renderCheckout(checkoutItems) {
//     if (!checkoutItems || checkoutItems.length === 0) {
//         console.error("No hay productos en el carrito para mostrar.");
//         return;
//     }

//     checkoutItems.forEach(product => {
//         let item = document.createElement("div");
//         let productInfo = products.find(p => p.id === product.productId);

//         if (productInfo) {
//             item.innerHTML = `
//                 <img src="${productInfo.img}" alt="">
//                 <div class="item-info">
//                     <div class="name">${productInfo.nombre}</div>
//                     <div class="price">$${productInfo.precio}</div>
//                 </div>
//                 <div class="quantity">${product.quantity}</div>
//                 <div class="total-price">$${productInfo.precio * product.quantity}</div>`;
//             checkoutContainer.appendChild(item);
//         }
//     });
// }

// if (checkoutStorage && products.length > 0) {
//     renderCheckout(checkoutStorage);
// }


