document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  const username = urlParams.get("username");
  const email = urlParams.get("email");

  document.getElementById("username").value = username;
  document.getElementById("email").value = email;

  // Fetch the user's role
  fetch(`http://localhost:3000/api/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.role) {
        document.getElementById("role").value = data.role;
      }
    })
    .catch((error) => {
      console.error("Error fetching user role:", error);
    });

  const form = document.getElementById("edit-user-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    console.log("Request URL:", `http://localhost:3000/api/users/${userId}`);
    console.log("Request Body:", JSON.stringify(userData));

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, authorization denied");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/put/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const result = await response.json();
      alert(result.msg);

      // Redirect to manage users page after update
      window.location.href = "admin-create.html";
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating user");
    }
  });
});
