document.addEventListener("DOMContentLoaded", function () {
  fetchUsers();

  document.querySelector(".logout").addEventListener("click", function () {
    alert("Logging out...");
    localStorage.clear();
    window.location.href = "../login/loggingopt.html";
  });
});

async function fetchUsers() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found, authorization denied");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    console.log("Users:", users);

    populateTable(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("Error fetching users");
  }
}

function populateTable(users) {
  const userTable = document.getElementById("user-table-body");
  userTable.innerHTML = ""; // Clear the table first

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    const cellNo = document.createElement("td");
    cellNo.textContent = index + 1;
    row.appendChild(cellNo);

    const cellName = document.createElement("td");
    cellName.textContent = user.username;
    row.appendChild(cellName);

    const cellAction = document.createElement("td");

    // Add edit and delete buttons here if needed
    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.addEventListener("click", () => {
      window.location.href = `edit_user.html?id=${user.id}&username=${user.username}&email=${user.email}`;
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
      deleteUser(user.id);
    });

    cellAction.appendChild(editButton);
    cellAction.appendChild(deleteButton);
    row.appendChild(cellAction);

    userTable.appendChild(row);
  });
}

async function deleteUser(userId) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found, authorization denied");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    alert("User deleted successfully");
    fetchUsers(); // Refresh the user list
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Error deleting user");
  }
}
