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
    <div>
      ${obj.nombre}${obj.precio}
    </div>
    `;
  });
  document.getElementById("div-list-products").innerHTML = html2;
});


//CUANDO SE PUBLICA UN PRODUCTO NUEVO EL SERVER ME REENVIA EL ARRAY CON TODOS LOS PRODUCTOS
/* socket.on("msg-list-productos", (data) => {
  console.log("msg-list", data);
  let html = "";
  data.forEach((obj) => {
    html += `
    <div>
      (${obj.socketid}) ${obj.email} dijo: ${obj.mensaje}
    </div>
    `;
  });
  document.getElementById("div-list-productos").innerHTML = html;
}); */

function enviarMsg() {
  const msgParaEnvio = document.getElementById("input-msg").value;
  const email = document.getElementById("input-email").value;
  socket.emit("msg", { email: email, mensaje: msgParaEnvio });
}

function cargarProducto() {
  const nombre = document.getElementById("input-nombre").value;
  const precio = document.getElementById("input-precio").value;
  socket.emit("cargaProd", { nombre: nombre, precio: precio });
}
