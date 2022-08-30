let btnVaciar = document.querySelector('#vaciar-carrito')
let btnConfirm = document.querySelector("#confirmar-compra")
let btn_scrolltop = document.querySelector('#btn_scrolltop')


const agregarAlCarrito = (prodId) => {
    fetch('./datos.json')
    .then((res)=> res.json())
    .then((data)=>{
    const existe = carrito.some (prod => prod.id === prodId)
    if (existe){ 
        const prod = carrito.map (prod => {   
            prod.id === prodId && prod.cantidad++  
        })
    } else { 
        const item = data.find((prod) => prod.id === prodId)
       
        carrito.push(item)
    }
    actCarrito()
})
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prod.id - prodId)

    const indice = carrito.indexOf(item) 
    swal.fire({
        title: "Eliminar producto/s del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText:"Si",
        cancelButtonText: "No"
      }).then((result)=>{
        if(result.isConfirmed){
            swal.fire({
                title: "Producto/s eliminados!",
                icon: "success",
                timer: 1500
            })
            carrito.splice(indice, 1) 
            actCarrito() 
        }
      })   
}


btnVaciar.addEventListener('click', () => {
    if(carrito.length >= 1){
        swal.fire({
            title: "Esta seguro desea eliminar todos sus productos?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText:"Si, estoy seguro",
            cancelButtonText: "Volver"
          }).then((result)=>{
            if(result.isConfirmed){
                swal.fire({
                    title: "Productos eliminados correctamente!",
                    icon: "success",
                    timer: 1500
                })
            carrito.length = 0
            actCarrito()
            }
          })   
    }  
 
})

btnConfirm.addEventListener("click",()=>{
    if(carrito.length >= 1){
        swal.fire({
            title: "Esta seguro desea confirmar su compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText:"Si, estoy seguro",
            cancelButtonText: "Volver"
          }).then((result)=>{
            if(result.isConfirmed){
                swal.fire({
                    title: "Compra exitosa!",
                    icon: "success",
                    text: "Gracias por su compra!",
                    timer: 1500
                })
                carrito.length = 0
            actCarrito()
            }
          })   
    }  
})


btn_scrolltop.addEventListener('click',()=>{
    window.scrollTo(0,0)
})
window.onscroll = ()=>{
    btnScrollTop()
}

const btnScrollTop = ()=>{
    if(window.scrollY < 300){
        btn_scrolltop.classList.remove('btn-scrolltop-on')
    }else{
        btn_scrolltop.classList.add('btn-scrolltop-on')
    } 
}

