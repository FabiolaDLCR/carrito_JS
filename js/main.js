const productos = [
    {
        id: 1, 
        nombre: "Frasco de vidrio hermético",
        precio: 120, 
    },
    {
        id: 2,
        nombre: "popote de acero inoxidable",
        precio: 35
    },
    {
        id: 3,
        nombre: "infusor de acero inoxidable",
        precio: 45
    },
    {
        id: 4,
        nombre: "Bolsa de tela",
        precio: 345
    },
    {
        id: 5,
        nombre: "Termo 450ml",
        precio: 360
    }
] 

let cartProducts = []

let productsContainer = document.getElementById("products-container")
function renderProductos (productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <p>${producto.precio}</p>
                          <img class="boton-menos" src= "https://img.icons8.com/ios/50/minus.png" alt="quitar" </img>
                          <input class="cantidad" type="text" value="0">
                          <img class="boton-mas"  src= "https://img.icons8.com/ios/50/add--v1.png" alt="agregar" </img>
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
let userInput = document.querySelector ('.cantidad');

let userProducts = 0;
 
botonMas.addEventListener('click', ()=>{
    userProducts++;
    userInput.value = userProducts;
});

botonMenos.addEventListener('click', ()=>{
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



