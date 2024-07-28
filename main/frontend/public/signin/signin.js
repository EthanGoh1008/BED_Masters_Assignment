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
            localStorage.setItem("userId", data.user.id); // Save userId to local storage
            alert("Login successful");
            window.location.href = "../main-page/main-page.html"; // Redirect to main menu
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
    .getElementById("sign-up-button")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const username = document.getElementById("sign-up-user").value;
      const email = document.getElementById("sign-up-email").value;
      const password = document.getElementById("sign-up-pass").value;
      const repeatPassword = document.getElementById(
        "sign-up-repeat-pass"
      ).value;

      if (!username || !email || !password || !repeatPassword) {
        alert("Please fill in all fields.");
        return;
      }

      if (password !== repeatPassword) {
        alert("Passwords do not match.");
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
            body: JSON.stringify({ username, email, password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Registration successful");
          // Optionally log the user in automatically after registration
          const loginResponse = await fetch(
            "http://localhost:3000/api/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          const loginData = await loginResponse.json();
          if (loginResponse.ok) {
            localStorage.setItem("token", loginData.token);
            window.location.href = "signin.html"; 
          } else {
            alert(loginData.msg || "Login failed after registration");
          }
        } else {
          alert(data.msg || "Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Registration failed");
      }
    });
});
