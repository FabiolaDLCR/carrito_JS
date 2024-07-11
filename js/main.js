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

let cartProducts = []

let productsContainer = document.getElementById("products-container")
function renderProductos (productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<img class= "product-img" src="${producto.img}" alt="">
                          <h3>${producto.nombre}</h3>
                          <p>$${producto.precio}.00</p>
                          <button class="add-btn" id="${producto.id}"> Agregar </button>
                        `
        productsContainer.appendChild(card)
    })
    addToCartButton()
}
renderProductos(productos)
