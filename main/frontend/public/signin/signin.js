document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("sign-in-button")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const email = document.getElementById("sign-in-user").value;
      const password = document.getElementById("sign-in-pass").value;

      if (email && password) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful");
            window.location.href = "main.html"; // Redirect to main page
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
