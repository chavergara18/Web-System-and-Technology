document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expense-form");
  const table = document.getElementById("expense-table");
  const expenses = [];

  // ----- CHART SETUP -----
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  const barCtx = document.getElementById("barChart").getContext("2d");

  let pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ["#0d6efd", "#198754", "#dc3545", "#ffc107", "#6610f2"]
      }]
    }
  });

  let barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        label: "Total ₱",
        data: [],
        backgroundColor: "#0d6efd"
      }]
    }
  });

  // ----- FORM SUBMIT -----
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    expenses.push({ description, amount, date });

    renderExpenses();
    updateCharts();
    form.reset();
  });

  // ----- RENDER TABLE -----
  function renderExpenses() {
    table.innerHTML = "";

    expenses.forEach((exp) => {
      table.innerHTML += `
        <tr>
          <td>${exp.description}</td>
          <td>₱${exp.amount.toFixed(2)}</td>
          <td>${exp.date}</td>
        </tr>
      `;
    });
  }

  // ----- UPDATE CHARTS -----
  function updateCharts() {
    const totals = {};

    expenses.forEach((e) => {
      if (!totals[e.date]) totals[e.date] = 0;
      totals[e.date] += e.amount;
    });

    const labels = Object.keys(totals);
    const values = Object.values(totals);

    // Update pie chart
    pieChart.data.labels = labels;
    pieChart.data.datasets[0].data = values;
    pieChart.update();

    // Update bar chart
    barChart.data.labels = labels;
    barChart.data.datasets[0].data = values;
    barChart.update();
  }

  // Fade animations
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );

  fadeEls.forEach((el) => observer.observe(el));
});








