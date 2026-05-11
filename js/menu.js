import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

async function loadMenu() {
  try {
    const querySnapshot = await getDocs(collection(db, "menu"));

    // clear all containers
    document.querySelectorAll(".menu-container").forEach((c) => {
      c.innerHTML = "";
    });

    querySnapshot.forEach((doc) => {
      const item = doc.data();

      const itemCategory = item.category?.trim().toLowerCase();

      document.querySelectorAll(".menu-container").forEach((container) => {
        const htmlCategory = container.dataset.category?.trim().toLowerCase();

        if (htmlCategory === itemCategory) {
          container.innerHTML += `
            <div class="col-lg-4 menu-item">
              <img src="${item.image}" class="menu-img img-fluid" alt="${item.title}">
              <h4>${item.title}</h4>
              <p class="ingredients">${item.description}</p>
              <p class="price">$${item.price}</p>
            </div>
          `;
        }
      });
    });
  } catch (error) {
    console.log("Menu load error:", error);
  }
}

loadMenu();
