let agregarContenidoCarrito = document.querySelector(".products")
//variable del model
let containerCart = document.querySelector(".card-items")
//selector de preciototal
let totalPrecio = document.querySelector(".price-total")
//contador de carrito
let totalCarritoCard = document.querySelector(".count-product")

//pintar en el carrito
let produ = [];
// total card
let totalCard = 0;
//contador carritoCard
let countCarrito = 0

//Funcion para agrupar todos los listener
function loadListener() {
  //añadir los listener a los selectore
  agregarContenidoCarrito.addEventListener("click", agregarProducto);
  containerCart.addEventListener('click', eliminarProducto);
}

loadListener();

//funcion agregar producto
function agregarProducto(e) {
  //a esta funcion le llegara el evento
  e.preventDefault();

  if (e.target.classList.contains("btn-add-cart")) {
    const selecionarProducto = e.target.parentElement;
    leerContenidoProducto(selecionarProducto);
    console.log(e.target.parentElement);
  }
}

//funcion eliminar producto
function eliminarProducto(e){
    //condicion para preguntar si existe ese elemto
    if(e.target.classList.contains("delete-product")) {
        //recorremos el arreglo
        const eliminarId = e.target.getAttribute('data-id')

        produ.forEach(value => {
            if(value.id == eliminarId){
                let precioReducir = parseFloat(value.price) * parseFloat(value.amount) 
                totalCard = totalCard - precioReducir
                totalCard = totalCard.toFixed(2)
            }
        });
        //filtrado los prodcutos
        produ = produ.filter(product => product.id !== eliminarId);
        totalCarritoCard--;
    }

    loadHtml()
}



//funcion para obtener los productos
function leerContenidoProducto(product) {
  const infoProducto = {
    image: product.querySelector("div img").src,
    title: product.querySelector(".title").textContent,
    price: product.querySelector("div p span").textContent,
    id: product.querySelector("a").getAttribute("data-id"),
    amount: 1,
  };

  totalCard = parseFloat(totalCard) + parseFloat(infoProducto.price);
  totalCard = totalCard.toFixed(2);

  const existeId = produ.some(product => product.id === infoProducto.id)
  //si ya esta el nuevo item
  if(existeId){
      //recorrer los productos
    const prod = produ.map(product => {
        if(product.id === infoProducto.id){
            product.amount++;
            return product;
        }else{
            //si no encuentra el producto
            return product
        }
    });

    produ = [...prod]
  }else{
    produ = [...produ, infoProducto]
    countCarrito++
  }

    //produ = [...produ, infoProducto];
  loadHtml();
  console.log(infoProducto);
}

//funcion para recorrer el array
function loadHtml() {
  //limpiar el cart
  limpiarHtml();
  produ.forEach((productA) => {
    //destructuramos el objeto
    const { image, title, price, amount, id } = productA;
    const row = document.createElement("div");
    row.classList.add("item");
    row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        //añadir un hijo a ese selector
        containerCart.appendChild(row);
        //cambiamos el valor del selector
        totalPrecio.innerHTML = totalCard

        totalCarritoCard.innerHTML = countCarrito
  });
}

//funcion para limpiar el carrito
function limpiarHtml(){
    
    containerCart.innerHTML = '';
}

//eliminar producto


