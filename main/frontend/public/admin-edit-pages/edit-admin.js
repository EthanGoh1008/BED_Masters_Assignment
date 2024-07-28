document.addEventListener("DOMContentLoaded", function () {
  displayAdminDetails();

  const form = document.getElementById("edit-admin-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    await updateAdminDetails();
  });
});

async function displayAdminDetails() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID is not available in local storage.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/admin-details/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching admin details: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Admin details fetched:", data);

    document.getElementById("edit-username").value = data.username;
    document.getElementById("edit-email").value = data.email;
    document.getElementById("edit-age").value = data.age;
    document.getElementById("edit-about").value = data.about;
    document.getElementById("edit-experience").value = data.yearsOfExperience;
  } catch (error) {
    console.error("Error fetching admin details:", error);
  }
}

async function updateAdminDetails() {
  const userId = localStorage.getItem("userId");
  const age = document.getElementById("edit-age").value;
  const about = document.getElementById("edit-about").value;
  const yearsOfExperience = document.getElementById("edit-experience").value;

  const updatedDetails = { age, about, yearsOfExperience };

  try {
    const response = await fetch(
      `http://localhost:3000/api/users/admin-details/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedDetails),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update admin details");
    }

    const result = await response.json();
    alert(result.msg);

    // Optionally, redirect back to the admin dashboard
    window.location.href = "../admin-dashboard/index.html";
  } catch (error) {
    console.error("Error updating admin details:", error);
    alert("Error updating admin details");
  }
}
