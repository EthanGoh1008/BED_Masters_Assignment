document.addEventListener("DOMContentLoaded", function () {
  fetchUsers();

  document.querySelector(".logout").addEventListener("click", function () {
    alert("Logging out...");
    // Add actual logout functionality here
  });

  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert("Edit functionality not implemented yet.");
      // Add actual edit functionality here
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.remove();
      // Add actual delete functionality here
    });
  });
});

async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3000/api/users");
    const users = await response.json();
    populateTable(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function populateTable(users) {
  const userTableBody = document.getElementById("user-table-body");
  userTableBody.innerHTML = ""; // Clear existing rows

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    const numberCell = document.createElement("td");
    numberCell.textContent = index + 1;

    const nameCell = document.createElement("td");
    nameCell.textContent = user.username;

    const actionCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "✏️";
    editButton.addEventListener("click", function () {
      alert("Edit functionality not implemented yet.");
      // Add actual edit functionality here
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", function () {
      deleteUser(user.id, row);
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(numberCell);
    row.appendChild(nameCell);
    row.appendChild(actionCell);

    userTableBody.appendChild(row);
  });

  async function deleteUser(id, row) {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        const result = await response.json();
        alert(result.msg);
        row.remove();
      } catch (error) {
        console.error("Error:", error);
        alert("Error deleting user");
      }
    }
  }
}
