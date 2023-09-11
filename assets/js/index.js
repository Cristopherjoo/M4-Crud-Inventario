let productosCarro = [];

if (localStorage.getItem("productos")) {
  productosCarro = JSON.parse(localStorage.getItem("productos"));
  console.log(productosCarro);
  actualizarCarro(productosCarro);
}

cargarProductos(productos);

//FUNCION ENCARGADA DE CARGAR PRODUCTOS
function cargarProductos(listadoProductos) {
  let acumulador = "";
  
  listadoProductos.forEach((producto) => {
    let template = `<div class="col-12 col-md-6 col-lg-4">
                    <div class="card m-auto my-3" style="width: 17rem;">
                      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                      <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>                      
                      <p class="card-text">Precio Normal: $ ${
                        producto.precio
                      }</p>
                      <a class="btn btn-outline-danger mx-3" data-sku="${
                        producto.sku
                      }" onclick="addToCart('${producto.sku}')">Comprar</a>

                      <a class="btn btn-outline-dark" data-sku="${
                        producto.sku
                      }" onclick="mostrarModal('${producto.id}')">Descripcion</a>
                      </div>
                  </div>
              </div>
          `;
    acumulador += template;
  });

  document.querySelector("#productos .row").innerHTML = acumulador;
}


function mostrarModal(id) {
  // Buscar el producto correspondiente al id
  let producto = productos.find((p) => p.id == id);

  // Crear el contenido del modal con la información del producto
  let modalContent = `
    <div class="modal-header">
      <h1 class="modal-title fs-2" id="exampleModalLabel">${producto.nombre}</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid mb-3">
      <p>Precio Normal: $${producto.precio}</p>
      <p class="text-danger">Descuento: -$${producto.descuento}</p>
      <p class="text-secondary-emphasis">Precio final: $${producto.precio - producto.descuento}</p>
      <p>Descripción:</p>
      <p>${producto.descripcion}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    </div>
  `;

  // Actualizar el contenido del modal con el contenido creado dinámicamente
  let modal = document.querySelector("#exampleModal");
  modal.querySelector(".modal-content").innerHTML = modalContent;

  // Mostrar el modal
  let modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}

function addToCart(sku) {
  let objProducto = {
    sku,
    cantidad: 1,
  };

  let productoEncontrado = productosCarro.find(
    (producto) => producto.sku == sku
  );
  if (productoEncontrado) {
    productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
  } else {
    productosCarro.push(objProducto);
  }

  actualizarCarro(productosCarro);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto agregado correctamente.",
    showConfirmButton: false,
    timer: 1500,
  });
}

function actualizarCarro(listadoProductos) {
  localStorage.setItem("productos", JSON.stringify(listadoProductos));

  const valorInicial = 0;
  const sumaProductos = listadoProductos.reduce(
    (acumulador, producto) => acumulador + producto.cantidad,
    valorInicial
  );

  document.querySelector("#cantidad-productos").innerText = sumaProductos;
}


