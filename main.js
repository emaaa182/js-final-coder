
let talles = document.querySelector('#talles')
talles.addEventListener("input", mostrarProd)


let contenedorProductos = document.querySelector('#contenedor-productos')
let contenedorCarrito = document.querySelector('#contenedor-carrito')
let contadorCarrito = document.querySelector('#contadorCarrito')

let cantidad = document.querySelector('#cantidad')
let precioTotal = document.querySelector('#precioTotal')
let cantidadTotal = document.querySelector('#cantidadTotal')

let carrito = []



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actCarrito()
    }
})
mostrarProd()

async function mostrarProd(){
    contenedorProductos.innerHTML= ''
    fetch('./datos.json')
    .then((res)=> res.json())
    .then((data)=>{
        data.forEach((prod) => {
            if(prod.talle.includes(talles.value) || (prod.tipo.includes(talles.value))) {
                let div = document.createElement('div')
                div.classList.add('producto')
                div.innerHTML = `
                <img src=${prod.img}>
                <h3>${prod.nombre}</h3>
                <p><b>Descripcion: </b><br>${prod.desc}</br></p>
                <p><b>Talle: ${prod.talle}</b></p>
                <p class="precioProducto">Precio:$ ${prod.precio}</p>
                <button id="agregar${prod.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
            
                `
                contenedorProductos.appendChild(div)
                let boton = document.getElementById(`agregar${prod.id}`)
                boton.addEventListener('click', () => {
                    Toastify({
                        text: "Agregado al carrito!",
                        className: "info",
                        style: {
                          background: "linear-gradient(to right, #00g8fe, #4facfe)",
                        }
                      }).showToast();
                    agregarAlCarrito(prod.id)
                })  
            }     
        })
        
 }) 
}


const actCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p><b>${prod.nombre}</b></p>
        <p><b>Precio:</b> $${prod.precio}</p>
        <p><b>Talle: ${prod.talle}</b></p>
        <p><b>Cantidad:</b> ${prod.cantidad}</p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
   
    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
  

}
