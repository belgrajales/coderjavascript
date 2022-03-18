let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
        search.classList.toggle('active');
        navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
        navbar.classList.toggle('active');
        search.classList.remove('active');
}

window.onscroll = () => {
        navbar.classList.remove('active');
        search.classList.remove('active');
}


let header = document.querySelector('header');

window.addEventListener('scroll' , () => {
        header.classList.toggle('shadow', window.scrollY > 0);
});

//  Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Abrir Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// Cerrar cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart ready pa la party

// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   ready();
// }

// Transformo a ternaria
document.readyState == "loading" ? document.addEventListener("DOMContentLoaded", ready) : ready();

// Funciones para que funcione (?

function ready() {
  // Remover items del cart
  var reomveCartButtons = document.getElementsByClassName("cart-remove");
  console.log(reomveCartButtons);
  for (var i = 0; i < reomveCartButtons.length; i++) {
    var button = reomveCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Cuando la cantidad cambia
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Anadir al carrito
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // Boton de comprar - Funcional
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
// Boton Comprar
function buyButtonClicked() {
  swal("Tu orden sera procesada");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

// Remover items del cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}
// Cantidad de items cambia
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
// Array
let carritoCompra = []
// Añadir al carrito
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  let product = {titulo: title, precio: price, imagen: productImg};
  carritoCompra.push(product)
  localStorage.setItem("cart", JSON.stringify(carritoCompra))
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
     if (cartItemsNames[i].innerText == title) {
        swal("Ya tienes este producto en tu carrito!");
        return;
      }
  // Ternaria que tengo que pulir
  // cartItemsNames[i].innerText == title ? swal("Ya tienes este producto en tu carrito!") : swal("Producto Agregado!!");
  
  }
  var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <p class= "cart-qnt">Cantidad</p>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remover del carrito -->
                        <i class='bx bxs-trash-alt cart-remove' ></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

function newFunction() {
  return;
}

// Update del total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // Redondeo de precio
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// Formulario 1 / Sin fetch / Me sirve mas con proposito de entendimiendo del mensaje de usuario

// function sendMail(params){
//   var tempParams = {
//     from_name : document.getElementById("fromName").value,
//     mail : document.getElementById("mail").value,
//     subject : document.getElementById("subject").value,
//     message : document.getElementById("message").value,
//   };
//   emailjs.send("service_y3js3yg","template_7hdrkwo", tempParams) 
//   .then(function(res){
//     // Esto para ver que funcione ok
//     console.log("Success", res.status);
//   })
// }
// Esto es lo que puse en el mail de EmailJS

// Nuevo mensaje desde tu pagina de SweetFeel!

// {{from_name}} se ha contactado contigo! Aqui su mensaje:


// Asunto: {{subject}}

// Mensaje: {{message}}

// Su mail: {{mail}}


// Formulario 2 con Fetch para la consigna

function sendData () {
  // Data para el formulario
  var data = new FormData();
  data.append("Nombre", document.getElementById("name").value);
  data.append("Email", document.getElementById("email").value);
  data.append("Asunto", document.getElementById("subject").value);
  data.append("Mensaje", document.getElementById("message").value);
 
  // Inicio Fetch
  fetch("https://formsubmit.co/ajax/belengrajales2014@gmail.com", {
    method: "POST",
    body: data
  })
 
  // Retorno respuesta del server como texto
  .then((result) => {
    if (result.status != 200) { throw new Error("Bad Server Response"); }
    return result.text();
  })
 
  // Respuesta del server
  .then((response) => {
    console.log(response);
    swal("Tu mensaje fue enviado correctamente!");
  })
 
  //  Errores
  .catch((error) => { console.log(error); });
 
  // previene el submit del form
  return false;
}

// Ejercicio con JSON

  // Tarjeta de rese;a 1
  let image1 = reviews[0].image;
  $(".image1").attr("src", image1);

  let content1 = reviews[0].content;
  $(".content1").text(content1);

  let name1 = reviews[0].name;
  $(".name1").text(name1);

  // Tarjeta de rese;a 2
  let image2 = reviews[1].image;
  $(".image2").attr("src", image2);

  let content2 = reviews[1].content;
  $(".content2").text(content2);

  let name2 = reviews[1].name;
  $(".name2").text(name2);

  // Tarjeta de rese;a 3
  let image3 = reviews[2].image;
  $(".image3").attr("src", image1);

  let content3 = reviews[2].content;
  $(".content3").text(content3);

  let name3 = reviews[2].name;
  $(".name3").text(name3);
