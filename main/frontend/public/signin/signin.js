document.addEventListener("DOMContentLoaded", function () {
  // Handle sign-in form submission
  document
    .querySelector(".sign-in .button")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const username = document.getElementById("sign-in-user").value;
      const password = document.getElementById("sign-in-pass").value;

      if (username && password) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: username, password: password }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful");
            // Redirect to a protected page or dashboard
            window.location.href = "dashboard.html";
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

  // Handle sign-up form submission
  document
    .querySelector(".sign-up .button")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const username = document.getElementById("sign-up-user").value;
      const password = document.getElementById("sign-up-pass").value;
      const repeatPassword = document.getElementById(
        "sign-up-repeat-pass"
      ).value;
      const email = document.getElementById("sign-up-email").value;

      if (username && password && repeatPassword && email) {
        if (password !== repeatPassword) {
          alert("Passwords do not match");
          return;
        }

        try {
          const response = await fetch(
            "http://localhost:3000/api/users/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                email: email,
                password: password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            alert("Registration successful");
            document.getElementById("tab-1").checked = true; // Switch to sign-in tab
          } else {
            alert(data.msg || "Registration failed");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Registration failed");
        }
      } else {
        alert("Please fill in all fields.");
      }
    });
});
