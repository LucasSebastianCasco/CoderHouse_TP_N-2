const productos = [
  { nombre: "Remera manga larga", precio: 3500, talle: 'XL' },
  { nombre: "Bermuda", precio: 4000, talle: 42 },
  { nombre: "Boxer", precio: 1800, talle: 10 },
  { nombre: "Remera manga corta", precio: 2750, talle: 'XL' },
  { nombre: "Campera frizada", precio: 9800, talle: 'M' }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

function agregarProducto(nombre, precio) {
  let nuevoProducto = {
    nombre: nombre,
    precio: precio
  };
  carrito.push(nuevoProducto);
  total += precio;

  // Actualizar la lista de productos en el carrito
  const carritoList = document.getElementById("carrito-list");
  const listItem = document.createElement("li");
  listItem.textContent = `${nombre} - $${precio.toFixed(2)}`;
  carritoList.appendChild(listItem);

  // Actualizar el total a pagar
  const totalPagar = document.getElementById("total-pagar");
  totalPagar.textContent =  total.toFixed(2);

  // Guardar el carrito y el total en el localStorage
  const carritoJSON = JSON.stringify(carrito);
  const totalJSON = JSON.stringify(total);
  localStorage.setItem("carrito", carritoJSON);
  localStorage.setItem("total", totalJSON);
}

function mostrarCarrito() {
  console.log("Carrito de compras:");
  console.log("-------------------");

  carrito.forEach((producto) => {
    console.log(producto.nombre + " - $" + producto.precio.toFixed(2));
  });

  console.log("-------------------");
  console.log("Total a pagar: $" + total.toFixed(2));
}

document.addEventListener("DOMContentLoaded", function () {
  const productosList = document.getElementById("productos-list");

  // Mostrar cada producto en la lista de productos disponibles
  for (const producto of productos) {
    const listItem = document.createElement("li");
    listItem.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
    const addButton = document.createElement("button");
    addButton.textContent = "Agregar al carrito";
    addButton.addEventListener("click", () => {
      agregarProducto(producto.nombre, producto.precio, producto.talle);
    });
    listItem.appendChild(addButton);
    productosList.appendChild(listItem);
  }

  // Mostrar el carrito al cargar la página
  mostrarCarrito();
});