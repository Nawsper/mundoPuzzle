//variables

let productosCarrito = localStorage.getItem("productos-carrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector("#carrito__p--vacio");
const carritoProductos = document.querySelector("#main__carrito--productos");
const carritoAcciones = document.querySelector("#carrito__acciones");
const carritoComprado = document.querySelector("#carrito__comprado");
let carritoEliminar = document.querySelectorAll(".carrito__prod--eliminar");
const botonVaciarCarrito = document.querySelector(".carrito__acciones--vaciar");
const carritoTotal = document.querySelector(".total");
const botonComprar = document.querySelector(".carrito__acciones--comprar");
const numeroCarrito = document.querySelector("#carrito__numero");
const cantidadUno = document.querySelector("#cantidad__uno");
const conversorOff = document.querySelector(".conversor");

// Crear productos en carrito

function cargarCarrito() {
  if (productosCarrito && productosCarrito.length > 0) {
    carritoVacio.classList.add("disable");
    carritoProductos.classList.remove("disable");
    carritoAcciones.classList.remove("disable");
    carritoComprado.classList.add("disable");
    conversorOff.classList.remove("disable");
    numeroCarrito.classList.remove("disable");

    carritoProductos.innerHTML = "";

    productosCarrito.forEach((producto) => {
      const divCarrito = document.createElement("div");
      divCarrito.classList.add("main__carrito--prod");
      divCarrito.innerHTML = `
      <img
      class="carrito__prod--img"
      src="${producto.imagen}"
      alt="${producto.titulo}"
      />
      <div class="carrito__prod--titulo">
      <small>Título</small>
      <h3>${producto.titulo}</h3>
      </div>
      <div class="carrito__prod--cant">
      <small>Cantidad</small>
      <p>${producto.cantidad}</p>
      </div>
      <div class="carrito__prod--precio">
      <small>Precio</small>
      <p>$${producto.precio}</p>
      </div>
      <div class="carrito__prod--subtotal">
      <small>Subtotal</small>
      <p>$${producto.precio * producto.cantidad}</p>
      </div>
      <button class="carrito__prod--eliminar" id="${producto.id}">
      <i class="bi bi-trash3"></i>
      </button>
    `;
      carritoProductos.append(divCarrito);
    });
  } else {
    carritoVacio.classList.remove("disable");
    carritoProductos.classList.add("disable");
    carritoAcciones.classList.add("disable");
    carritoComprado.classList.add("disable");
    conversorOff.classList.add("disable");
    numeroCarrito.classList.add("disable");
  }

  carritoBotonesEliminar();
  valorTotal();
  numeroEnCarrito();
}

cargarCarrito();

// Botones eliminar

function carritoBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito__prod--eliminar");
  botonesEliminar.forEach((botonEliminar) => {
    botonEliminar.addEventListener("click", eliminarProdCarrito);
  });
}

function eliminarProdCarrito(evento) {
  const idBotonEliminar = evento.currentTarget.id;
  const index = productosCarrito.findIndex(
    (producto) => producto.id === idBotonEliminar
  );
  productosCarrito.splice(index, 1);
  cargarCarrito();
  localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

// Vaciar carrito

function vaciarCarrito() {
  productosCarrito.length = 0;
  localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
  cargarCarrito();
}

// Valor total compra

function valorTotal() {
  const totalCarrito = productosCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  carritoTotal.innerText = `$${totalCarrito}`;
  cantidadUno.innerText = `${totalCarrito}`;
}

// Finalizar compra

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
  productosCarrito.length = 0;
  localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
  carritoVacio.classList.add("disable");
  carritoProductos.classList.add("disable");
  carritoAcciones.classList.add("disable");
  carritoComprado.classList.remove("disable");
  conversorOff.classList.add("disable");
  numeroCarrito.classList.add("disable");
}

// Numero en carrito

function numeroEnCarrito() {
  let numero = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroCarrito.innerText = numero;
}

// Alertas

botonVaciarCarrito.addEventListener("click", () => {
  Swal.fire({
    title: "¿Estas seguro que quieres vaciar el carrito?",
    text: "No podras revertir esto.",
    icon: "warning",
    iconColor: "red",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Si, vaciar!",
    customClass: {
      popup: "popup",
      title: "popup-title",
      text: "popup-text",
      content: "popup-content",
      confirmButton: "popup-confirm-button",
      cancelButton: "popup-cancel-button-class",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarCarrito();
      Swal.fire({
        title: "Tu carrito ha sido vaciado",
        iconHtml: '<i class="bi bi-puzzle"></i>',
        iconColor: "#a08fff",
        customClass: {
          popup: "popup",
          title: "popup-title",
          text: "popup-text",
          content: "popup-content",
          confirmButton: "popup-confirm-button",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  });
});

botonComprar.addEventListener("click", () => {
  Swal.fire({
    title: "Recibiras tus productos muy pronto",
    iconHtml: '<i class="bi bi-puzzle-fill"></i>',
    iconColor: "#a08fff",
    customClass: {
      popup: "popup",
      title: "popup-title",
      text: "popup-text",
      content: "popup-content",
      confirmButton: "popup-confirm-button",
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
});

//Api

//variables api
const monedaDos = document.querySelector("#moneda__dos");
const cantidadDos = document.querySelector("#cantidad__dos");
const cambioDiv = document.querySelector("#cambio");
const cantidadUnoValor = parseInt(cantidadUno.innerText);

// funcion conversion

function conversion() {
  const moneda2 = monedaDos.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/cf2b7c006b63e8a072807097/latest/ARS`
  )
    .then((res) => res.json())
    .then((data) => {
      const taza = data.conversion_rates[moneda2];
      cambioDiv.innerText = `1 ARS = ${taza} ${moneda2}`;
      cantidadDos.value = (cantidadUnoValor * taza).toFixed(2);
    });
}

monedaDos.addEventListener("change", conversion);

conversion();
