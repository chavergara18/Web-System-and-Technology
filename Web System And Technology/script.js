document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expense-form");
  const table = document.getElementById("expense-table");
  const expenses = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    expenses.push({ description, amount, date });
    renderExpenses();
    form.reset();
  });

  function renderExpenses() {
    table.innerHTML = "";
    expenses.forEach((exp) => {
      const row = `<tr>
        <td>${exp.description}</td>
        <td>₱${exp.amount}</td>
        <td>${exp.date}</td>
      </tr>`;
      table.innerHTML += row;
    });
  }

  // Scroll-based fade-in effect
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeEls.forEach((el) => observer.observe(el));

  // Contact form
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully! Thank you for reaching out.");
    contactForm.reset();
  });
});




