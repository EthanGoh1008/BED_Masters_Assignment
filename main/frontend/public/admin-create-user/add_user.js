document.addEventListener("DOMContentLoaded", function () {
  // Handle form submission
  const form = document.getElementById("add-user-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      alert(result.msg);

      // Optionally redirect to another page or clear the form
      form.reset();
      // window.location.href = 'manage_users.html';
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating user");
    }
  });
});
