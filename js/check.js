let listCart = [];

function checkCart (){
    let cookieValue = document.cookie
    .split ('; ')
    .find (row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookeValue.split(' ')[1]);
    }
}
checkCart();
addCartToHTML();

function addCartToHTML(){
    let listCartHTML = document.querySelector('.checkout-list');
    listCartHTML = '';
    let totalPriceHTML = document.querySelector('.total-checkout-number');
    let totalPrice = 0;

    if (listCart){
        listCart.forEach(product => {
         if(product){
            let newP = document.createElement ('div');
            newP.classList.add('item');
            newP.innerHTML = `
               <img src="${product.img}" alt="">
               <div class="item-info">
               <div class="name">${product.nombre}</div>
               <div class="price">${product.precio}</div>
               </div>
               <div class="quantity">${product.quantity}</div>
               <div class="total-price">$${product.precio * product.quantity}</div>`;
            listCartHTML.appendChild(newP);
            totalQuantity = totalQuantity + product.quantity;
            totalPrice = totalPrice + (product.precio * product.quantity);
         }
        })
    }
totalPriceHTML.innerHTML = `$ ${totalPrice}`;
}
