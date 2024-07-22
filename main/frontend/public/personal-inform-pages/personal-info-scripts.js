document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in.");
    window.location.href = "signin.html"; // Redirect to sign-in page
    return;
  }

  // Fetch current profile information
  fetch("http://localhost:3000/api/users/me", {
    headers: {
      "x-auth-token": token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.username) {
        document.getElementById("name").value = data.username;
        document.getElementById("email").value = data.email;
        document.getElementById("aboutMyself").value = data.aboutMyself;
        document.getElementById("preferredEvent").value = data.preferredEvent;
      } else {
        alert("Failed to fetch profile information.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to fetch profile information.");
    });

  // Handle form submission
  document
    .getElementById("profile-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const aboutMyself = document.getElementById("aboutMyself").value;
      const preferredEvent = document.getElementById("preferredEvent").value;

      fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ aboutMyself, preferredEvent }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.msg);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to update profile.");
        });
    });
});
