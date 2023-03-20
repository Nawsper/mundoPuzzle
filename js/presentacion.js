// Alertas

const botonEnviar = document.querySelector("#alertFormulario");

botonEnviar.addEventListener("click", () => {
  Swal.fire({
    title: "Tu información fue enviada",
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

// numero carrito

let productosCarrito = localStorage.getItem("productos-carrito");
productosCarrito = JSON.parse(productosCarrito);
function numeroEnCarrito() {
  let numero = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  document.getElementById("carrito__numero--index").innerHTML = numero;
}
numeroEnCarrito();
