import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// =======================
// VARIABLES
// =======================
const formContainer = document.getElementById("menu-form-container");
const form = document.getElementById("add-menu-form");
const formTitle = document.getElementById("form-title");
const showAddFormBtn = document.getElementById("show-add-form-btn");
const menuList = document.getElementById("menu-list");
const reservationContainer = document.getElementById("reservations");

let currentEditId = null; // track editing

// =======================
// SHOW ADD FORM
// =======================
showAddFormBtn.addEventListener("click", () => {
  if (formContainer.style.display === "block") {
    // Form is visible → hide it
    formContainer.style.display = "none";
    currentEditId = null; // reset editing
  } else {
    // Form is hidden → show it for adding new item
    formContainer.style.display = "block";
    formTitle.textContent = "Add Menu Item";
    form.querySelector("button").textContent = "Add Item";
    form.reset();
    currentEditId = null;
  }
});
// =======================
// FORM SUBMIT (ADD/EDIT)
// =======================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: Number(document.getElementById("price").value),
    category: document.getElementById("category").value,
    image: document.getElementById("image").value,
  };

  try {
    if (currentEditId) {
      await updateDoc(doc(db, "menu", currentEditId), data);
      alert("Menu Item Updated Successfully");
    } else {
      await addDoc(collection(db, "menu"), { ...data, createdAt: new Date() });
      alert("Menu Item Added Successfully");
    }
    form.reset();
    formContainer.style.display = "none";
    currentEditId = null;
    loadMenuItems();
  } catch (err) {
    console.error(err);
  }
});

// =======================
// CREATE MENU CARD
// =======================
function createMenuCard(item, id) {
  const col = document.createElement("div");
  col.className = "col-md-3";

  const card = document.createElement("div");
  card.className = "card shadow-sm border-0";

  const img = document.createElement("img");
  img.src = item.image;
  img.className = "card-img-top";
  img.style.height = "180px";
  img.style.objectFit = "cover";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h5");
  title.textContent = item.title;

  const category = document.createElement("p");
  category.className = "text-muted mb-1";
  category.textContent = item.category;

  const desc = document.createElement("p");
  desc.textContent = item.description;

  const price = document.createElement("strong");
  price.textContent = `$${item.price}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm me-2";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteMenuItem(id);

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning btn-sm";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editMenuItem(id, item);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "mt-3";
  buttonContainer.append(deleteBtn, editBtn);

  body.append(title, category, desc, price, buttonContainer);
  card.append(img, body);
  col.append(card);

  return col;
}

// =======================
// LOAD MENU
// =======================
async function loadMenuItems() {
  if (!menuList) return;
  menuList.innerHTML = "";
  const snapshot = await getDocs(collection(db, "menu"));
  snapshot.forEach((docItem) => {
    const item = docItem.data();
    const card = createMenuCard(item, docItem.id);
    menuList.appendChild(card);
  });
}

// =======================
// EDIT MENU ITEM
// =======================
function editMenuItem(id, item) {
  formContainer.style.display = "block";
  formTitle.textContent = "Edit Menu Item";
  form.querySelector("button").textContent = "Update Item";

  document.getElementById("title").value = item.title;
  document.getElementById("description").value = item.description;
  document.getElementById("price").value = item.price;
  document.getElementById("category").value = item.category;
  document.getElementById("image").value = item.image;

  currentEditId = id;
}

// =======================
// DELETE MENU ITEM
// =======================
async function deleteMenuItem(id) {
  await deleteDoc(doc(db, "menu", id));
  loadMenuItems();
}
window.deleteMenuItem = deleteMenuItem;

// =======================
// LOAD RESERVATIONS
// =======================
function createReservationCard(data) {
  const col = document.createElement("div");
  col.className = "col-lg-3 col-md-6"; // 4 cards in a row on large screens

  const card = document.createElement("div");
  card.className = "card reservation-card h-100";

  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title text-success">${data.name}</h5>
      <hr>
      <p class="mb-1"><strong>Email:</strong> ${data.email}</p>
      <p class="mb-1"><strong>Phone:</strong> ${data.phone}</p>
      <p class="mb-1"><strong>Date:</strong> ${data.date}</p>
      <p class="mb-1"><strong>Time:</strong> ${data.time}</p>
      <p class="mb-2"><strong>People:</strong> ${data.people}</p>
    </div>
  `;

  col.appendChild(card);
  return col;
}

async function loadReservations() {
  if (!reservationContainer) return;
  reservationContainer.innerHTML = "";
  const snapshot = await getDocs(collection(db, "reservations"));
  snapshot.forEach((docItem) => {
    reservationContainer.appendChild(createReservationCard(docItem.data()));
  });
}

// =======================
// INIT
// =======================
loadMenuItems();
loadReservations();

document.getElementById("logout-btn").addEventListener("click", () => {
  alert("You have been logged out!");
  window.location.href = "login.html";
});
