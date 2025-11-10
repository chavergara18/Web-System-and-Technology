// === BudgetFlow Expense Tracker ===
let transactions = JSON.parse(localStorage.getItem("bf_transactions")) || [];

const form = document.getElementById("transactionForm");
const tableBody = document.querySelector("#transactionTable tbody");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expensesEl = document.getElementById("expenses");
const clearAllBtn = document.getElementById("clearAll");
const exportBtn = document.getElementById("exportData");

function renderTransactions() {
  tableBody.innerHTML = "";
  transactions.forEach((t, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.description}</td>
      <td>₱${t.amount}</td>
      <td>${t.category}</td>
      <td><button class="delete-btn" data-index="${index}">🗑️</button></td>
    `;
    tableBody.appendChild(row);
  });
  updateSummary();
  updateChart(transactions);
}

function updateSummary() {
  const income = transactions.filter(t => t.category === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.category !== "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  balanceEl.textContent = (income - expenses).toFixed(2);
  incomeEl.textContent = income.toFixed(2);
  expensesEl.textContent = expenses.toFixed(2);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  transactions.push({ description: desc, amount, category });
  localStorage.setItem("bf_transactions", JSON.stringify(transactions));
  form.reset();
  renderTransactions();
});

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    transactions.splice(index, 1);
    localStorage.setItem("bf_transactions", JSON.stringify(transactions));
    renderTransactions();
  }
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all transactions?")) {
    transactions = [];
    localStorage.removeItem("bf_transactions");
    renderTransactions();
  }
});

exportBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "budgetflow_data.json";
  a.click();
});

// === Scroll Button ===
document.getElementById("scrollToTracker").addEventListener("click", () => {
  document.getElementById("tracker").scrollIntoView({ behavior: "smooth" });
});

// === Chart.js Integration ===
let ctx = document.getElementById("expenseChart").getContext("2d");
let expenseChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Income", "Food", "Bills", "Transport", "Entertainment"],
    datasets: [{
      data: [0, 0, 0, 0, 0],
      backgroundColor: ["#22c55e", "#ef4444", "#3b82f6", "#f97316", "#a855f7"],
      borderWidth: 2,
      borderColor: "#fff"
    }]
  },
  options: {
    responsive: true,
    animation: { animateScale: true, animateRotate: true },
    plugins: { legend: { position: "bottom" } }
  }
});

function updateChart(transactions) {
  const categories = ["Income", "Food", "Bills", "Transport", "Entertainment"];
  const totals = categories.map(cat =>
    transactions.filter(t => t.category === cat).reduce((sum, t) => sum + t.amount, 0)
  );
  expenseChart.data.datasets[0].data = totals;
  expenseChart.update();
}

// === Initialize ===
renderTransactions();



