const socket = io();

socket.on("connect", () => {
  console.log("quede conectado!");
  //socket.emit("msg", "hola server!");
});

socket.on("msg", (data) => {
  console.log("msg", data);
});


socket.on("cargaProd", (data) => {
  console.log("cargaProd", data);
});


socket.on("msg-list", (data) => {
  console.log("msg-list", data);
  let html = "";
  data.forEach((obj) => {
    html += `
    <div>
    <p class="parrafo"><b class="email">${obj.email}</b><small class="fecha">${obj.fecha}</small><i class="mensaje"> dijo: ${obj.mensaje}</i></p>
    </div>
    `;
  });
  document.getElementById("div-list-msgs").innerHTML = html;
});
socket.on("cargaProds", (data) => {
  console.log("cargaProds", data);
  let html2 = "";
  data.forEach((obj) => {
    html2 += `
    <div class="contP">
      <h3>Producto:${obj.nombre}</h3>
      <h3>Precio:$${obj.precio}</h3>
      <h2>Descripcion: ${obj.descripcion}</h2>
      <p>Stock: ${obj.stock}</p>
      <img src="${obj.img}">
    </div>
    `;
  });
  document.getElementById("div-list-products").innerHTML = html2;
});

function enviarMsg() {
  const msgParaEnvio = document.getElementById("input-msg").value;
  const email = document.getElementById("input-email").value;
  socket.emit("msg", { email: email, mensaje: msgParaEnvio});
}

function cargarProducto() {
  const nombre = document.getElementById("input-nombre").value;
  const precio = document.getElementById("input-precio").value;
  const descripcion = document.getElementById("input-descripcion").value;
  const img = document.getElementById("input-img").value;
  const stock = document.getElementById("input-stock").value;
  const codigo = document.getElementById("input-codigo").value;
  socket.emit("cargaProd", { nombre: nombre, precio: precio, descripcion: descripcion, img: img, stock: stock, codigo: codigo });
}
