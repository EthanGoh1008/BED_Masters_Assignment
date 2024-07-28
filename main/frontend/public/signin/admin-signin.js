document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signin-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/admin-login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          const data = await response.json();
          console.log("Login response data:", data);

          if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username); // Store the username
            console.log("Stored username:", data.user.username);
            localStorage.setItem("userId", data.user.id); // Store the user ID
            console.log("Stored userId:", data.user.id);
            alert("Login successful");
            window.location.href = "../admin-dashboard/index.html"; // Redirect to admin dashboard page
          } else {
            alert(data.msg || "Login failed");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Login failed");
        }
      } else {
        alert("Please fill in all fields.");
      }
    });
});
