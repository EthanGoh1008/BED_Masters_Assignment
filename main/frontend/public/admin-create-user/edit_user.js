document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  const username = urlParams.get("username");
  const email = urlParams.get("email");

  document.getElementById("username").value = username;
  document.getElementById("email").value = email;

  const form = document.getElementById("edit-user-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"), // This can be empty if the user doesn't want to change the password
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
      window.location.href = "manage_users.html";
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating user");
    }
  });
});
