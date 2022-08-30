let contModal = document.getElementsByClassName('modal-contenedor')[0]
let btnAbrir = document.getElementById('boton-carrito')
let btnCerrar = document.getElementById('carritoCerrar')
let modalCarrito = document.getElementsByClassName('modal-carrito')[0]


btnAbrir.addEventListener('click', ()=>{
    contModal.classList.toggle('modal-active')
})
btnCerrar.addEventListener('click', ()=>{
    contModal.classList.toggle('modal-active')
})

contModal.addEventListener('click', (event) =>{
    contModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})