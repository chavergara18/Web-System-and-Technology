let totalValue = 0;

document.getElementById("addBtn").addEventListener("click", function() {
    const name = document.getElementById("assetName").value;
    const value = Number(document.getElementById("assetValue").value);

    if (name.trim() === "" || value <= 0) {
        alert("Please enter valid data.");
        return;
    }

    // Add row to table
    const table = document.getElementById("portfolioTable");
    const row = `<tr><td>${name}</td><td>₱${value.toLocaleString()}</td></tr>`;
    table.innerHTML += row;

    // Update total
    totalValue += value;
    document.getElementById("total").innerText = `₱${totalValue.toLocaleString()}`;

    // Clear fields
    document.getElementById("assetName").value = "";
    document.getElementById("assetValue").value = "";
});

