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
        nombre: "popote de acero inoxidable",
        precio: 35,
        cantidad:0,
        img: "./images/straw.jpg"
    },
    {
        id: 3,
        nombre: "infusor de acero inoxidable",
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

let cartProducts = []

let productsContainer = document.getElementById("products-container")
function renderProductos (productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<img src="${producto.img}" alt="">
                          <h3>${producto.nombre}</h3>
                          <p>$${producto.precio}.00</p>
                          <div class="boton-agregar">
                          <button class="productoAgregar" id="${producto.id}">Agregar </button>
                          </div>`
        productsContainer.appendChild(card)
    })
    addToCartButton()
}
renderProductos(productos)

let botonMenos = document.querySelector('.boton-menos');
let botonMas = document.querySelector('.boton-mas');
let userInput = document.querySelector('.cantidad');

let userProducts = 0;
 
botonMas.addEventListener('click', (e)=>{
      userProducts++;
      userInput.value = userProducts;
});

botonMenos.addEventListener('click', (e)=>{
  userProducts--;
    if(userProducts <= 0){
    userProducts = 0;
    }
    userInput.value = userProducts
});

function addToCartButton () {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)
  
            cartProducts.push(selectedProduct)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
}
addToCartButton()


// function restarSumar () {
//    let userProducts=0;

//    addButton = document.querySelector(".boton-menos")
//    addButton.forEach(button =>{
//     button.addEventListener('click', () => {
//         userProducts--;
//         if(userProducts <= 0){
//          userProducts = 0;
//         }
//         userInput.value = userProducts;
//      });
//    })
//    addButton = document.querySelector(".boton-mas")
//    addButton.forEach(button =>{
//     button.addEventListener('click', () => {
//         userProducts++;
//         userInput.value = userProducts;
//      });
//    })
//    }
// restarSumar()






