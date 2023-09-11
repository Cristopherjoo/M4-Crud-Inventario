const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const nombre = document.querySelector('#nombre');
const descripcion = document.querySelector('#descripcion');
const precio = document.querySelector('#precio');
const btnGuardar = document.querySelector('#btnGuardar');

let items;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    nombre.value = items[index].nombre;
    descripcion.value = items[index].descripcion;
    precio.value = items[index].precio;
    id = index;
  } else {
    nombre.value = '';
    descripcion.value = '';
    precio.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  items.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.nombre}</td>
    <td>${item.descripcion}</td>
    <td>$${item.precio}</td>
    <td class="accion">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="accion">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnGuardar.onclick = e => {
  if (nombre.value == '' || descripcion.value == '' || precio.value == '') {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    items[id].nombre = nombre.value;
    items[id].descripcion = descripcion.value;
    items[id].precio = precio.value;
  } else {
    items.push({'nombre': nombre.value, 'descripcion': descripcion.value, 'precio': precio.value});
  }

  setItensBD();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

function loadItens() {
  items = getItensBD();
  tbody.innerHTML = '';
  items.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(items));

loadItens();
