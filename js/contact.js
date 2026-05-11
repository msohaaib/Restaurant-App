document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (!form) {
    console.error("Contact form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: form.name.value,
      from_email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      await emailjs.send("service_y3iimul", "template_hkjlav8", templateParams);

      alert("Message Sent Successfully!");
      form.reset();
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  });
});
