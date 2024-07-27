document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".logout").addEventListener("click", function (event) {
    event.preventDefault();
    // Clear all stored user information
    localStorage.removeItem("token"); // Clear the token from localStorage
    localStorage.removeItem("username"); // Clear the username from localStorage
    localStorage.removeItem("email"); // Clear the email from localStorage
    // Redirect to the login page
    window.location.href = "../signin/signin.html";
  });
});
