// objetos
const productos = [
  //ravensburger
  {
    id: "r1",
    titulo: "Puzzle Ravensburger Ciervo en Primavera de 1000 Piezas",
    imagen: "../images/ravensburger/ravensburger-ciervo-1000.webp",
    marca: "Ravensburger",
    piezas: "1000",
    precio: 10000,
  },
  {
    id: "r2",
    titulo: "Puzzle Ravensburger Jardín Japonés de 1000 Piezas",
    imagen: "../images/ravensburger/ravensburger-jardin-japones-1000.webp",
    marca: "Ravensburger",
    piezas: "1000",
    precio: 10000,
  },
  {
    id: "r3",
    titulo: "Puzzle Ravensburger Alrededor del Mundo de 2000 Piezas",
    imagen: "../images/ravensburger/ravensburger-planisferio-2000.webp",
    marca: "Ravensburger",
    piezas: "2000",
    precio: 15000,
  },
  {
    id: "r4",
    titulo: "Puzzle Ravensburger Edificio Flatiron de 3000 Piezas",
    imagen: "../images/ravensburger/ravensburger-edificio-3000.webp",
    marca: "Ravensburger",
    piezas: "3000",
    precio: 20000,
  },
  //educa
  {
    id: "e1",
    titulo: "Puzzle Educa Amanecer en el Rio Katsura, Japón 1000 Piezas",
    imagen: "../images/educa/educa-katsura-japon-1000.webp",
    marca: "Educa",
    piezas: "1000",
    precio: 8000,
  },
  {
    id: "e2",
    titulo: "Puzzle Educa Maravillas del Mundo de 1000 Piezas",
    imagen: "../images/educa/educa-mundo-1000.webp",
    marca: "Educa",
    piezas: "1000",
    precio: 8000,
  },
  {
    id: "e3",
    titulo: "Puzzle Educa Londres al Atardecer de 2000 Piezas",
    imagen: "../images/educa/educa-londres-atardecer-2000.webp",
    marca: "Educa",
    piezas: "2000",
    precio: 12000,
  },
  {
    id: "e4",
    titulo: "Puzzle Educa Jardín Japones de 3000 Piezas",
    imagen: "../images/educa/educa-jardin-japones-3000.webp",
    marca: "Educa",
    piezas: "3000",
    precio: 16000,
  },
  //clementoni
  {
    id: "c1",
    titulo: "Puzzle Clementoni Campo de Lavandas de 1000 Piezas",
    imagen: "../images/clementoni/clementoni-campo-lavandas-1000.webp",
    marca: "Clementoni",
    piezas: "1000",
    precio: 7000,
  },
  {
    id: "c2",
    titulo: "Puzzle Clementoni Colorboom Canicas de 1000 Piezas",
    imagen: "../images/clementoni/clementoni-colorboom-1000.webp",
    marca: "Clementoni",
    piezas: "1000",
    precio: 7000,
  },
  {
    id: "c3",
    titulo: "Puzzle Clementoni Molino en Glade Creek de 2000 Piezas",
    imagen: "../images/clementoni/clementoni-molino-2000.webp",
    marca: "Clementoni",
    piezas: "2000",
    precio: 10000,
  },
  {
    id: "c4",
    titulo: "Puzzle Clementoni Amanecer en el Coliseo de 3000 Piezas",
    imagen: "../images/clementoni/clementoni-amancer-coliseo-3000-.webp",
    marca: "Clementoni",
    piezas: "3000",
    precio: 13000,
  },
  //puzzle madera
  {
    id: "m1",
    titulo: "Puzzle de madera Sweet Cat de 1000 Piezas",
    imagen: "../images/madera/puzzle-madera-1000-gato.jpg",
    marca: "Wooden",
    piezas: "1000",
    precio: 15000,
  },
  {
    id: "m2",
    titulo: "Puzzle de madera Fiery fox de 1000 Piezas",
    imagen: "../images/madera/puzzle-madera-1000-zorro.webp",
    marca: "Wooden",
    piezas: "1000",
    precio: 15000,
  },
  {
    id: "m3",
    titulo: "Puzzle de madera Guarding Dragon de 2000 Piezas",
    imagen: "../images/madera/puzzle-madera-2000-dragon.webp",
    marca: "Wooden",
    piezas: "2000",
    precio: 20000,
  },
  {
    id: "m4",
    titulo: "Puzzle de madera Fairy Bird de 3000 Piezas",
    imagen: "../images/madera/puzzle-madera-3000-pajaro.webp",
    marca: "Wooden",
    piezas: "3000",
    precio: 25000,
  },
];

//variables

const contenedorProductos = document.querySelector("#main__contenedor");
const botonesMenu = document.querySelectorAll(".menu__button");
const tituloPrincipal = document.querySelector("#main__titulo");
const numeroCarrito = document.querySelector("#carrito__numero");
let botonesAgregar = document.querySelectorAll(".producto__detalles--boton");

//funciones
//carga de productos en galeria

function cargarProductos(productosMarca) {
  contenedorProductos.innerHTML = "";
  productosMarca.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("main__contenedor--producto");
    div.innerHTML = `
    <img class="producto__imagen" src="${producto.imagen}" alt="${producto.titulo}"/>
    <div class="producto__detalles">
      <h3 class="producto__detalles--titulo">${producto.titulo}</h3>
      <p class="producto__detalles--precio">$${producto.precio}</p>
      <button id = "${producto.id}" class="producto__detalles--boton">Agregar</button>
    </div>
    `;
    contenedorProductos.append(div);
  });
  actualizarBotones();
}

cargarProductos(productos);

//botones activos por marcas

botonesMenu.forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    botonesMenu.forEach((boton) => boton.classList.remove("active"));
    evento.currentTarget.classList.add("active");

    if (evento.currentTarget.id != "todos") {
      const productoMarca = productos.find(
        (producto) => producto.marca === evento.currentTarget.id
      );
      tituloPrincipal.innerText = productoMarca.marca;

      const productosXmarca = productos.filter(
        (producto) => producto.marca === evento.currentTarget.id
      );
      cargarProductos(productosXmarca);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

// Actualizar los botones en cada pestaña de productos

function actualizarBotones() {
  botonesAgregar = document.querySelectorAll(".producto__detalles--boton");
  botonesAgregar.forEach((botonAgregar) => {
    botonAgregar.addEventListener("click", agregarBotonClickeado);
  });
}

// Cargar productos al carrito
// Numero carrito

let productosCarrito;

let productosCarritoLS = localStorage.getItem("productos-carrito");

if (productosCarritoLS) {
  productosCarrito = JSON.parse(productosCarritoLS);
  numeroEnCarrito();
} else {
  productosCarrito = [];
}

function agregarBotonClickeado(event) {
  const botonId = event.target.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === botonId
  );
  Swal.fire({
    position: "top-end",
    iconHtml: '<i class="bi bi-puzzle-fill"></i>',
    iconColor: "#a08fff",
    title: "Se agrego un producto al carrito",
    showConfirmButton: false,
    timer: 1800,
    customClass: {
      popup: "popup",
      title: "popup-title",
    },
  });
  if (productosCarrito.some((producto) => producto.id === botonId)) {
    const index = productosCarrito.findIndex(
      (producto) => producto.id === botonId
    );
    productosCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }
  numeroEnCarrito();
  localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

function numeroEnCarrito() {
  let numero = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroCarrito.innerText = numero;
}
