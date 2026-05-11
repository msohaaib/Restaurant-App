import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const form = document.querySelector("#book-a-table form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "reservations"), {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      date: form.date.value,
      time: form.time.value,
      people: form.people.value,
      message: form.message.value,
      createdAt: new Date(),
    });

    alert("Reservation Submitted!");

    form.reset();
  } catch (error) {
    console.log(error);
    alert("Error submitting reservation");
  }
});
